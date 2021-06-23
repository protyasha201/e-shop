import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  const uploadProfileImage = () => {};
  return (
    <section>
      <Header />
      <div className="p-10 flex justify-center items-center flex-col">
        <div className="shadow w-full flex flex-col items-center justify-center border p-5">
          <div className="flex">
            <div className="h-20 w-20 flex justify-center items-center shadow border rounded-full">
              <FontAwesomeIcon
                className="w-full h-full text-5xl font-bold text-blue-300"
                icon={faUserAlt}
              />
            </div>
            <div>
              <label className="text-blue-300 cursor-pointer" htmlFor="files">
                <FontAwesomeIcon icon={faEdit} />
              </label>
              <input
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
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            <input
              className="w-full hidden shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={user.userName}
              type="text"
            />
          </div>
        </div>

        <div className="shadow w-full border p-5">
          <h1 className="text-2xl text-gray-400 roboto">
            Your Profile Information
          </h1>
          <hr></hr>

          <div className="mt-2">
            <div className="flex">
              <p className="text-red-300 montserrat font-bold">
                Email: <span className="text-gray-400">{user.email}</span>
              </p>
              <FontAwesomeIcon
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            <input
              name="email"
              className="w-full hidden shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={user.email}
              type="email"
            />
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
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            <input
              name="mobileNumber"
              className="w-full hidden shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={user.mobileNumber}
              type="text"
            />
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
                className="cursor-pointer text-blue-300"
                icon={faEdit}
              />
            </div>
            <input
              name="password"
              className="w-full hidden shadow p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={user.password}
              type="password"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
