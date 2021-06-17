import React from "react";
import "./Login.css";
import formBg from "../../images/others/formbg2.jpg";
import logo from "../../images/others/e-shop-logo.png";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(true);
  const handleLoginForm = () => {
    setUser(!user);
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center sm:flex-row p-5">
      <h1 className="sm:hidden text-xl condensed font-bold text-blue-400 relative bottom-10">
        Create an Account and Enjoy{" "}
        <span className="text-red-400 montserrat">E-SHOP</span>
      </h1>
      <div className="hidden sm:inline-block sm:w-1/2 lg:w-3/4">
        <img alt="form side" src={formBg} />
      </div>
      <div className="bg-white border bg-bl p-5 shadow-2xl rounded w-4/5 flex justify-center flex-col items-center sm:w-1/2 sm:relative right-20 lg:w-80">
        <img alt="logo" src={logo} className="h-20 w-2/3 sm:w-60" />
        <form className="flex flex-col w-full">
          {user || (
            <label className="mt-4 flex flex-col">
              <span className="font-bold text-xl montserrat text-gray-600">
                Your Name
              </span>
              <input
                type="text"
                className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
                placeholder="name..."
              />
            </label>
          )}
          <label className="mt-4 flex flex-col">
            <span className="font-bold text-xl montserrat text-gray-600">
              Your E-mail
            </span>
            <input
              type="email"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
              placeholder="email..."
            />
          </label>
          <label className="mt-4 flex flex-col">
            <span className="font-bold text-xl montserrat text-gray-600">
              Password
            </span>
            <input
              type="password"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
              placeholder="password..."
            />
          </label>
          <input
            type="submit"
            className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={user ? "Login" : "Create an Account"}
          />
          <p className="text-center text-gray-500 mt-2">
            {user
              ? `Don't have an account?${" "}`
              : `Already have an account?${" "}`}
            <span
              onClick={handleLoginForm}
              className="text-blue-400 cursor-pointer"
            >
              {user ? "Create an account" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
