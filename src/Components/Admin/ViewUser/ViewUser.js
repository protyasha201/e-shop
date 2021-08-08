import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let isUnmounted = false;

    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmounted) {
          setUserData(data[0]);
        }
      });

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  const goToAdmin = () => {
    history.push("/admin");
  };

  const deleteUser = () => {
    fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {});
    alert("Deleted successfully");
    history.push("/admin");
  };

  return (
    <section className="p-5">
      <div className="p-2 flex justify-between items-center md:w-4/5 md:m-auto lg:w-3/5">
        <h1 className="text-green-400 text-xl text-left">User Details</h1>
        <button
          onClick={goToAdmin}
          className="shadow-md p-2 bg-green-400 rounded condensed text-white"
        >
          Back To Admin
        </button>
      </div>
      {userData.length === 0 ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="p-3 flex flex-col sm:flex-row justify-between items-center md:w-4/5 md:m-auto border lg:w-3/5">
          <div className="w-1/2 flex flex-col items-center">
            <div className="rounded-full p-5 border">
              {userData.photoUrl ? (
                <img alt={userData.userName} src={userData.photoUrl} />
              ) : (
                <FontAwesomeIcon
                  className="w-full h-full text-5xl font-bold text-blue-300"
                  icon={faUserAlt}
                />
              )}
            </div>
            <h1 className="text-gray-500 font-bold text-md montserrat shadow-xl p-1 mt-2 rounded border">
              {userData.userName}
            </h1>
          </div>
          <div className="text-left text-gray-500 w-full p-5 shadow-xl border rounded mt-2">
            <p>
              <span className="text-red-400">email</span>: {userData.email}
            </p>
            <p>
              <span className="text-red-400">Country</span>: {userData.country}
            </p>
            <p>
              <span className="text-red-400">Country-Code</span>:{" "}
              {userData.countryCode}
            </p>
            <p>
              <span className="text-red-400">State</span>: {userData.state}
            </p>
            <p>
              <span className="text-red-400">City</span>: {userData.city}
            </p>
            <p>
              <span className="text-red-400">House</span>:{" "}
              {userData.house || "Not set yet"}
            </p>
            <p>
              <span className="text-red-400">Contact Number</span>:{" "}
              {userData.mobileNumber || "Not set yet"}
            </p>
            <p>
              <span className="text-red-400">Postal</span>: {userData.postal}
            </p>
            <div className="flex justify-between sm:w-4/5 md:full">
              <p>
                <span className="text-red-400">Longitude</span>:{" "}
                {userData.longitude}
              </p>
              <p>
                <span className="text-red-400">Latitude</span>:{" "}
                {userData.latitude}
              </p>
            </div>
            <button
              onClick={deleteUser}
              className="mt-3 clear-both float-right border p-2 rounded text-white bg-red-500 condensed"
            >
              Delete User
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewUser;
