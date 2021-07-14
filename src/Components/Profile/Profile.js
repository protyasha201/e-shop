import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [showUserNameField, setShowUserNameField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showMobileNumberField, setShowMobileNumberField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showCountryField, setShowCountryField] = useState(false);
  const [showDistrictField, setShowDistrictField] = useState(false);
  const [showHouseField, setShowHouseField] = useState(false);

  const showEditingSpace = (e) => {
    if (e === "userName") {
      setShowUserNameField(!showUserNameField);
    }
    if (e === "email") {
      setShowEmailField(!showEmailField);
    }
    if (e === "mobileNumber") {
      setShowMobileNumberField(!showMobileNumberField);
    }
    if (e === "password") {
      setShowPasswordField(!showPasswordField);
    }
    if (e === "country") {
      setShowCountryField(!showCountryField);
    }
    if (e === "district") {
      setShowDistrictField(!showDistrictField);
    }
    if (e === "house") {
      setShowHouseField(!showHouseField);
    }
  };

  const handleUpdate = (e) => {};

  const uploadProfileImage = (e) => {
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        const updateUser = { ...user };
        updateUser.photoUrl = response.data.data.display_url;
        setUser(updateUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section>
      <Header />
      <div className="p-10 flex justify-center items-center flex-col">
        <div className="shadow w-full flex flex-col items-center justify-center border p-5 rounded">
          <div className="flex">
            <div className="h-20 w-20 flex justify-center items-center shadow border rounded-full">
              {user.photoUrl ? (
                <img
                  className="w-full h-full text-5xl font-bold text-blue-300 rounded-full"
                  src={user.photoUrl}
                  alt="protyasha"
                />
              ) : (
                <FontAwesomeIcon
                  className="w-full h-full text-5xl font-bold text-blue-300"
                  icon={faUserAlt}
                />
              )}
            </div>
            <div>
              <label className="text-blue-300 cursor-pointer" htmlFor="files">
                <FontAwesomeIcon icon={faEdit} />
              </label>
              <input
                name="photoUrl"
                onChange={uploadProfileImage}
                style={{ display: "none" }}
                type="file"
                id="files"
              />
            </div>
          </div>
          <div>
            <div className="flex">
              <p className="font-bold montserrat text-xl text-gray-500">
                {user.userName}
              </p>
              <FontAwesomeIcon
                onClick={() => showEditingSpace("userName")}
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            {showUserNameField && (
              <input
                name="userName"
                onChange={handleUpdate}
                className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                defaultValue={user.userName}
                type="text"
              />
            )}
          </div>
        </div>

        <div className="shadow w-full border p-5">
          <h1 className="text-2xl text-gray-400 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-roboto">
            Your Profile Information
          </h1>
          <hr></hr>

          <div className="mt-2">
            <div className="flex">
              <p className="text-red-300 montserrat font-bold">
                Email: <span className="text-gray-400">{user.email}</span>
              </p>
              <FontAwesomeIcon
                onClick={() => showEditingSpace("email")}
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            {showEmailField && (
              <input
                onChange={handleUpdate}
                name="email"
                className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                defaultValue={user.email}
                type="email"
              />
            )}
          </div>

          <div className="mt-2">
            <div className="flex">
              <p className="text-red-300 montserrat font-bold">
                Contact Number:{" "}
                <span className="text-gray-400">
                  {user.mobileNumber || "Set Contact Number"}
                </span>
              </p>
              <FontAwesomeIcon
                onClick={() => showEditingSpace("mobileNumber")}
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            {showMobileNumberField && (
              <input
                onChange={handleUpdate}
                name="mobileNumber"
                className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                defaultValue={user.mobileNumber}
                type="text"
              />
            )}
          </div>

          <div className="mt-2">
            <div className="flex">
              <p className="text-red-300 montserrat font-bold">
                Password:{" "}
                <span className="text-gray-400">
                  {user.password || "Change Current Password"}
                </span>
              </p>
              <FontAwesomeIcon
                onClick={() => showEditingSpace("password")}
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            {showPasswordField && (
              <input
                onChange={handleUpdate}
                name="password"
                className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                defaultValue={user.password}
                type="password"
              />
            )}
          </div>

          <div className="mt-3">
            <h1 className="condensed text-gray-500 font-bold text-xl">
              Set Address
            </h1>
            <hr></hr>
            <div className="mt-2">
              <div className="flex">
                <p className="text-red-300 montserrat font-bold">
                  Country:{" "}
                  <span className="text-gray-400">
                    {user.country || "Set Current Country"}
                  </span>
                </p>
                <FontAwesomeIcon
                  onClick={() => showEditingSpace("country")}
                  className="cursor-pointer text-blue-300"
                  icon={faEdit}
                />
              </div>
              {showCountryField && (
                <input
                  onChange={handleUpdate}
                  name="country"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={user.country}
                  type="text"
                />
              )}
            </div>

            <div className="mt-2">
              <div className="flex">
                <p className="text-red-300 montserrat font-bold">
                  District:{" "}
                  <span className="text-gray-400">
                    {user.district || "Set Current District"}
                  </span>
                </p>
                <FontAwesomeIcon
                  onClick={() => showEditingSpace("district")}
                  className="cursor-pointer text-blue-300"
                  icon={faEdit}
                />
              </div>
              {showDistrictField && (
                <input
                  onChange={handleUpdate}
                  name="district"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={user.district}
                  type="text"
                />
              )}
            </div>

            <div className="mt-2">
              <div className="flex">
                <p className="text-red-300 montserrat font-bold">
                  House:{" "}
                  <span className="text-gray-400">
                    {user.house || "Set Current House"}
                  </span>
                </p>
                <FontAwesomeIcon
                  onClick={() => showEditingSpace("house")}
                  className="cursor-pointer text-blue-300"
                  icon={faEdit}
                />
              </div>
              {showHouseField && (
                <input
                  onChange={handleUpdate}
                  name="house"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={user.house}
                  type="text"
                />
              )}
            </div>
          </div>
          <button className="bg-green-300 text-white montserrat p-2 font-bold rounded  mt-2 float-right">
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
