import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { UserContext } from "../../../App";

const AddAdmin = () => {
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminsError, setAdminsError] = useState("");
  const [isFieldValid, setIsFiledValid] = useState(false);
  const adminEmailInputField = document.getElementById("adminEmail");
  let adminMatched;
  let [isEmailAdded, setIsEmailAdded] = useState(false);

  const loadAdmins = () => {
    fetch(`http://localhost:5000/admins`)
      .then((res) => res.json())
      .then((result) => setAdmins(result));
  };

  useEffect(() => {
    let isMounted = false;
    setInterval(() => {
      if (!isMounted) {
        loadAdmins();
      }
    }, 3000);
    return () => {
      isMounted = true;
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
          adminEmailInputField.value = "";
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            alert("Admin added successfully");
          }, 3000);
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
      .then((result) => {});
    alert("Deleted successfully");
  };

  const showWarning = () => {
    alert(
      "You are given access as a visitor admin. So,you can't perform any change in actions"
    );
  };

  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">
        Admins<span className="text-black">/</span>Add Admin
      </h1>
      <form
        onSubmit={handleAddAdmin}
        className="border rounded flex flex-col w-full mt-3 sm:w-2/4 shadow-md p-5 md:w-2/5"
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
      <div className="p-5 shadow-md border m-auto sm:w-3/4">
        {admins.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <table className="w-full border">
            <thead className="text-left">
              <tr className="border">
                <th className="w-11/12 border p-2">Email</th>
                <th className="text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.adminEmail} className="">
                  <td className="montserrat font-bold border p-2">
                    {admin.adminEmail}
                  </td>
                  <td className="flex justify-center gap-4 items-center border p-2">
                    <DeleteIcon
                      onClick={
                        user.isAdmin
                          ? () => deleteAdmin(admin._id)
                          : () => showWarning()
                      }
                      className="text-red-500 cursor-pointer hover:text-green-400"
                    />

                    <EditIcon className="text-blue-500 cursor-pointer hover:text-green-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AddAdmin;
