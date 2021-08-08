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

  console.log(userData);

  return (
    <section className="p-5">
      <div className="p-2 flex justify-between items-center md:w-2/3 md:m-auto lg:w-1/2">
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
        <div className="p-3 flex justify-between items-center md:w-2/3 md:m-auto lg:w-1/2 border">
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
            <h1 className="text-gray-500 font-bold text-md montserrat shadow-md p-1 mt-2 rounded">
              {userData.userName}
            </h1>
          </div>
          <div className="text-left text-gray-500 w-4/5">
            <p>email: {userData.email}</p>
            <p>country: {userData.country}</p>
            <p>District: {userData.district}</p>
            <p>House: {userData.email}</p>
            <p>Contact Number: {userData.district}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewUser;
