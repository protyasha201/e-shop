import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

const EditAdmin = () => {
  const { id } = useParams();
  const [adminDetails, setAdminDetails] = useState([]);
  const [showEditingField, setShowEditingField] = useState(false);
  const [duplicateAdmin, setDuplicateAdmin] = useState([]);
  let history = useHistory();

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
    const updateAdminDetails = { ...adminDetails };
    updateAdminDetails.adminEmail = e.target.value;
    setAdminDetails(updateAdminDetails);
  };

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const cancelEdit = () => {
    setShowEditingField(!showEditingField);
    const updateAdminDetails = { ...adminDetails };
    updateAdminDetails.adminEmail = duplicateAdmin.adminEmail;
    setAdminDetails(updateAdminDetails);
  };

  const saveChanges = () => {
    axios
      .patch("http://localhost:5000/updateAdmin", adminDetails)
      .then(function (response) {
        loadAdminDetails();
        setShowEditingField(false);
        alert("Changes saved");
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <div className="p-3 border mt-5 rounded w-96 m-auto">
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
                adminDetails.adminEmail
              )}
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
          <button
            onClick={saveChanges}
            className="bg-green-400 text-white p-2 condensed rounded mt-10 float-right"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <h1 className="text-center mt-10">Loading...</h1>
      )}
    </section>
  );
};

export default EditAdmin;
