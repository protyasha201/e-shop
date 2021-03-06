import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { Modal } from "@material-ui/core";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [showUserNameField, setShowUserNameField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showMobileNumberField, setShowMobileNumberField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showCountryField, setShowCountryField] = useState(false);
  const [showStateField, setShowStateField] = useState(false);
  const [showHouseField, setShowHouseField] = useState(false);
  const [showCityField, setCityField] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPassError: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
    if (e === "state") {
      setShowStateField(!showStateField);
    }
    if (e === "house") {
      setShowHouseField(!showHouseField);
    }
    if (e === "city") {
      setCityField(!showCityField);
    }
  };

  const handleUpdate = (e) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value === user.password) {
        const updateError = { ...errors };
        const updateUser = { ...user };

        updateUser[e.target.name] = e.target.value;
        updateError.confirmPassError = "Password matched";
        setUser(updateUser);
        setErrors(updateError);
        setIsPasswordValid(true);
      } else {
        const updateError = { ...errors };
        updateError.confirmPassError = "Password didn't match";
        setErrors(updateError);
        setIsPasswordValid(false);
      }
    }
    const updateUser = { ...user };
    updateUser[e.target.name] = e.target.value;
    setUser(updateUser);
  };

  const saveUpdate = () => {
    if (isPasswordValid || user.password === user.confirmPassword) {
      axios
        .patch(`http://localhost:5000/updateUser`, user)
        .then(function (response) {
          localStorage.setItem("user", JSON.stringify(user));
          setShowUserNameField(false);
          setShowEmailField(false);
          setShowMobileNumberField(false);
          setShowPasswordField(false);
          setShowCountryField(false);
          setShowStateField(false);
          setCityField(false);
          setShowHouseField(false);
          setModalText("Changes Saved Successfully");
          handleOpenModal();
        })
        .catch(function (error) {
          setModalText(error.message);
          handleOpenModal();
        });
    } else {
      const updateError = { ...errors };
      updateError.confirmPassError = "Password didn't match";
      setErrors(updateError);
      setIsPasswordValid(false);
    }
  };

  const uploadProfileImage = (e) => {
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        const updateUser = { ...user };
        updateUser.photoUrl = response.data.data.display_url;
        localStorage.setItem("user", JSON.stringify(updateUser));
        setUser(updateUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section>
      <Header />
      <div className="p-5 flex justify-center items-center flex-col md:w-2/3 md:m-auto lg:w-1/2">
        <div className="shadow w-full flex flex-col items-center justify-center border p-5 rounded">
          <div className="flex">
            <div className="h-20 w-20 flex justify-center items-center shadow border rounded-full">
              {user.photoUrl ? (
                <img
                  className="w-full h-full text-5xl font-bold text-blue-300 rounded-full"
                  src={user.photoUrl}
                  alt={user.userName}
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

        <div className="shadow-md w-full p-2">
          <h1 className="text-xl text-gray-400 roboto">
            Your Profile Information
          </h1>
          <hr></hr>
          <p className="text-red-300 montserrat font-bold text-sm">
            IP: <span className="text-gray-400">{user.ipAddress}</span>
          </p>
          <div className="mt-2">
            <div className="flex justify-between">
              <p className="text-red-300 montserrat font-bold text-sm">
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
            <div className="flex justify-between">
              <p className="text-red-300 montserrat font-bold text-sm">
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
            <div className="flex justify-between">
              <p className="text-red-300 montserrat font-bold text-sm">
                Password: <span className="text-gray-400">Change Password</span>
              </p>
              <FontAwesomeIcon
                onClick={() => showEditingSpace("password")}
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            {showPasswordField && (
              <div>
                <input
                  onChange={handleUpdate}
                  name="password"
                  placeholder="change password"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="password"
                />
                <p className="text-green-400 mt-2">Confirm Password</p>
                <input
                  onChange={handleUpdate}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="password"
                />
                <p
                  className={
                    isPasswordValid ? "text-green-400" : "text-red-400"
                  }
                >
                  {errors.confirmPassError}
                </p>
              </div>
            )}
          </div>

          <div className="mt-3">
            <h1 className="condensed text-gray-500 text-xl">Set Address</h1>
            <hr></hr>
            <div className="mt-2">
              <div className="flex justify-between">
                <p className="text-red-300 montserrat font-bold text-sm">
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
              <div className="flex justify-between">
                <p className="text-red-300 montserrat font-bold text-sm">
                  State:{" "}
                  <span className="text-gray-400">
                    {user.state || "Set Your State"}
                  </span>
                </p>
                <FontAwesomeIcon
                  onClick={() => showEditingSpace("state")}
                  className="cursor-pointer text-blue-300"
                  icon={faEdit}
                />
              </div>
              {showStateField && (
                <input
                  onChange={handleUpdate}
                  name="state"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={user.state}
                  type="text"
                />
              )}
            </div>

            <div className="mt-2">
              <div className="flex justify-between">
                <p className="text-red-300 montserrat font-bold text-sm">
                  City:{" "}
                  <span className="text-gray-400">
                    {user.city || "Set Your City"}
                  </span>
                </p>
                <FontAwesomeIcon
                  onClick={() => showEditingSpace("city")}
                  className="cursor-pointer text-blue-300"
                  icon={faEdit}
                />
              </div>
              {showCityField && (
                <input
                  onChange={handleUpdate}
                  name="city"
                  className="w-full shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={user.city}
                  type="text"
                />
              )}
            </div>

            <div className="mt-2">
              <div className="flex justify-between">
                <p className="text-red-300 montserrat font-bold text-sm">
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
          <button
            onClick={saveUpdate}
            className="bg-green-300 text-white montserrat p-2 font-bold rounded  mt-2 float-right"
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
      </div>
    </section>
  );
};

export default Profile;
