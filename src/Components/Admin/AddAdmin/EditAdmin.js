import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { Modal } from "@material-ui/core";

const EditAdmin = () => {
  const { id } = useParams();
  const [adminDetails, setAdminDetails] = useState([]);
  const [showEditingField, setShowEditingField] = useState(false);
  const [duplicateAdmin, setDuplicateAdmin] = useState([]);
  const [errors, setErrors] = useState({ emailError: "" });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  let isFieldValid;
  let adminMatched;
  let history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/adminDetails/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setAdminDetails(result[0]);
          setDuplicateAdmin(result[0]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const loadAdminDetails = () => {
    fetch(`http://localhost:5000/adminDetails/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setAdminDetails(result[0]);
        setDuplicateAdmin(result[0]);
      });
  };

  const handleChange = (e) => {
    const adminEmailValue = e.target.value;
    adminMatched = admins.filter(
      (eachAdmin) => adminEmailValue === eachAdmin.adminEmail
    );

    let updateErrors = { ...errors };
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    if (isFieldValid) {
      setIsEmailValid(true);
      updateErrors.emailError = "email is valid";
      setErrors(updateErrors);
      const updateAdminDetails = { ...adminDetails };
      updateAdminDetails.adminEmail = e.target.value;
      setAdminDetails(updateAdminDetails);
    }
    if (!isFieldValid) {
      setIsEmailValid(false);
      updateErrors.emailError = "email is not valid.";
      setErrors(updateErrors);
    }
    if (adminMatched.length > 0) {
      setIsEmailValid(false);
      setIsEmailTaken(true);
      updateErrors.emailError = "email is already added";
      setErrors(updateErrors);
    }
  };

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const cancelEdit = () => {
    const updateErrors = { ...errors };
    updateErrors.emailError = "";
    setErrors(updateErrors);
    setShowEditingField(!showEditingField);
    const updateAdminDetails = { ...adminDetails };
    updateAdminDetails.adminEmail = duplicateAdmin.adminEmail;
    setAdminDetails(updateAdminDetails);
  };

  const saveChanges = () => {
    if (isEmailValid || duplicateAdmin.adminEmail === adminDetails.adminEmail) {
      axios
        .patch("http://localhost:5000/updateAdmin", adminDetails)
        .then(function (response) {
          loadAdminDetails();
          const updateErrors = { ...errors };
          updateErrors.emailError = "";
          setErrors(updateErrors);
          setShowEditingField(false);
          setModalText("Changes saved successfully");
          handleOpenModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto items-center lg:w-1/2">
        <h1 className="montserrat text-blue-400 text-xl font-bold">
          Edit Admin
        </h1>
        <button
          onClick={goToAdminPage}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Admin
        </button>
      </div>
      {adminDetails.adminEmail ? (
        <div className="p-3 border mt-5 rounded w-full sm:w-3/5 md:w-2/5 m-auto">
          <div className="flex justify-between">
            <p className="text-gray-600 montserrat font-bold">
              <span className="text-red-400">Email: </span>
              {showEditingField ? (
                <input
                  onChange={handleChange}
                  name="email"
                  className="p-1 shadow border rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-bold"
                  type="email"
                  defaultValue={adminDetails.adminEmail}
                  id="inputField"
                />
              ) : (
                adminDetails.adminEmail.slice(0, 20)
              )}
              ...
            </p>
            {showEditingField ? (
              <CancelIcon
                onClick={cancelEdit}
                className="shadow text-red-500 rounded cursor-pointer ml-2"
              />
            ) : (
              <EditIcon
                onClick={() => setShowEditingField(!showEditingField)}
                className="shadow text-white rounded bg-red-400 cursor-pointer hover:bg-blue-400 ml-2"
              />
            )}
          </div>
          <p
            className={
              !isEmailValid || isEmailTaken ? "text-red-400" : "text-green-400"
            }
          >
            {errors.emailError}
          </p>
          <button
            onClick={saveChanges}
            className="bg-green-400 text-white p-2 condensed rounded mt-10 float-right"
          >
            Save Changes
          </button>
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
        </div>
      ) : (
        <h1 className="text-center mt-10">Loading...</h1>
      )}
    </section>
  );
};

export default EditAdmin;
