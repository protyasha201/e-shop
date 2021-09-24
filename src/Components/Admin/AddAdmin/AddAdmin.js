import {
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { UserContext } from "../../../App";
import { useHistory } from "react-router-dom";

const AddAdmin = () => {
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminsError, setAdminsError] = useState("");
  const [isFieldValid, setIsFiledValid] = useState(false);
  const adminEmailInputField = document.getElementById("adminEmail");
  let adminMatched;
  let [isEmailAdded, setIsEmailAdded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  let history = useHistory();

  const loadAdmins = () => {
    fetch(`http://localhost:5000/admins`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/admins`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setAdmins(result);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();

    const adminEmailValue = adminEmailInputField.value;
    adminMatched = admins.filter(
      (eachAdmin) => adminEmailValue === eachAdmin.adminEmail
    );

    if (adminMatched.length > 0) {
      setIsEmailAdded(true);
      setAdminsError("This email is already added as admin");
    } else if (adminMatched.length === 0 && isFieldValid) {
      setIsEmailAdded(false);
      setAdminsError("");
      axios
        .post("http://localhost:5000/addAdmin", { adminEmail: adminEmailValue })
        .then(function (response) {
          setLoading(true);
          setTimeout(() => {
            adminEmailInputField.value = "";
            setLoading(false);
            loadAdmins();
            setModalText("Admin added successfully");
            handleOpenModal();
          }, 2000);
        })
        .catch(function (error) {
          setAdminsError(error.message);
        });
    }
  };

  const handleEmailChange = (e) => {
    setIsFiledValid(/\S+@\S+\.\S+/.test(e.target.value));

    if (isFieldValid) {
      setAdminsError("Email is Valid");
    } else {
      setAdminsError("Invalid Email");
    }
  };

  const deleteAdmin = (id) => {
    fetch(`http://localhost:5000/deleteAdmin/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        loadAdmins();
        setModalText("Admin deleted successfully");
        handleOpenModal();
      });
  };

  const showWarning = () => {
    alert(
      "You are given access as a visitor admin. So,you can't perform any change in actions"
    );
  };

  const editAdmin = (id) => {
    history.push(`/editAdmin/${id}`);
  };

  return (
    <section className="rounded md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">
        Admins<span className="text-black">/</span>Add Admin
      </h1>
      <form
        onSubmit={handleAddAdmin}
        className="border rounded flex flex-col w-full mt-3 sm:w-2/4 p-5 md:w-2/5"
      >
        <input
          onChange={handleEmailChange}
          id="adminEmail"
          required
          name="adminEmail"
          type="email"
          className="shadow border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
          placeholder="admin@gmail.com"
        />
        <p
          className={
            !isFieldValid || isEmailAdded
              ? "text-red-400 mt-3"
              : "text-green-400 mt-3"
          }
        >
          {adminsError}
        </p>
        {loading ? (
          <CircularProgress className="m-auto mt-3" />
        ) : (
          <input
            type="submit"
            className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:border-transparent"
            value="Add new Admin"
          />
        )}
      </form>
      <h3 className="font-bold text-lg mt-3 montserrat text-gray-500">
        All Admins({admins.length})
      </h3>
      <div className="m-auto sm:w-3/4">
        {admins.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Email
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Actions
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((eachAdmin) => (
                  <TableRow key={eachAdmin._id}>
                    <TableCell component="th" scope="row">
                      <p className="">{eachAdmin.adminEmail.slice(0, 20)}..</p>
                    </TableCell>
                    <TableCell align="center">
                      <div className="gap-4 flex justify-center gap-4 items-center">
                        <DeleteIcon
                          onClick={
                            user.isAdmin
                              ? () => deleteAdmin(eachAdmin._id)
                              : () => showWarning()
                          }
                          className="shadow text-red-500 cursor-pointer hover:text-green-400"
                        />
                        <Modal open={openModal} onClose={handleCloseModal}>
                          <div className="bg-white w-96 rounded m-auto mt-60 p-5 flex flex-col justify-center items-center">
                            <p className="text-gray-600 montserrat font-bold text-center">
                              {modalText}
                            </p>
                            <button
                              onClick={handleCloseModal}
                              className="mt-5 bg-green-400 hover:bg-green-500 p-2 w-20 text-white condensed text-lg rounded"
                            >
                              OK
                            </button>
                          </div>
                        </Modal>
                        <EditIcon
                          onClick={() => editAdmin(eachAdmin._id)}
                          className="shadow cursor-pointer hover:text-green-400"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </section>
  );
};

export default AddAdmin;
