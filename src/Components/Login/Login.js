import React from "react";
import "./Login.css";
import formBg from "../../images/others/formbg2.jpg";
import logo from "../../images/others/e-shop-logo.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import getUserToken from "../Functions/getUserToken";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [errors, setErrors] = useState({
    userNameError: "",
    emailError: "",
    passError: "",
    confirmPassError: "",
    loginError: "",
  });
  const [newUser, setNewUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  let history = useHistory();
  let location = useLocation();
  let isFieldValid = true;
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPassValid, setIsPassValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isConfirmPassValid, setIsConfirmPassValid] = useState(false);
  let currentUser;

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((result) => setAllUsers(result));
  }, []);

  if (allUsers.length > 0) {
    currentUser = allUsers.filter(
      (registeredUser) => user.email === registeredUser.email
    );
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  let { from } = location.state || { from: { pathname: "/" } };

  const handleFormData = (e) => {
    if (e.target.name === "userName") {
      isFieldValid = e.target.value.length > 3;
      let updateErrors = { ...errors };

      if (newUser) {
        if (isFieldValid) {
          setIsNameValid(true);
          updateErrors.userNameError = "Name is valid";
        }
        if (!isFieldValid) {
          setIsNameValid(false);
          updateErrors.userNameError = "Name must be more than 3 letters";
        }
        setErrors(updateErrors);
      }
    }

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      let updateErrors = { ...errors };

      if (!newUser) {
        const updateUser = { ...user };
        updateUser[e.target.name] = e.target.value;
        setUser(updateUser);
      }
      if (newUser) {
        if (isFieldValid) {
          setIsEmailValid(true);
          updateErrors.emailError = "Email is valid";
        }
        if (!isFieldValid && e.target.value !== "") {
          setIsEmailValid(false);
          updateErrors.emailError = "Email is invalid!";
        }
        setErrors(updateErrors);
      }
    }

    if (e.target.name === "password") {
      const passwordLength = e.target.value.length > 6;
      const passwordNumberContains = /\d{1}/.test(e.target.value);
      isFieldValid = passwordLength && passwordNumberContains;
      let updateErrors = { ...errors };

      if (!newUser) {
        const updateUser = { ...user };
        updateUser[e.target.name] = e.target.value;
        setUser(updateUser);
      }
      if (newUser) {
        if (isFieldValid) {
          setIsPassValid(true);
          updateErrors.passError = "Password is valid";
        }
        if (!isFieldValid && e.target.value !== "") {
          setIsPassValid(false);
          updateErrors.passError =
            "Password should have more than 6 letters including numbers";
        }
        setErrors(updateErrors);
      }
    }

    if (e.target.name === "confirmPassword") {
      let updateErrors = { ...errors };
      if (e.target.value === user.password) {
        isFieldValid = true;
        setIsConfirmPassValid(true);
        updateErrors.confirmPassError = "Password Matched";
      }
      if (e.target.value !== user.password) {
        setIsConfirmPassValid(false);
        updateErrors.confirmPassError = "Password didn't match";
      }
      setErrors(updateErrors);
    }

    if (isFieldValid) {
      const updateUser = { ...user };
      updateUser[e.target.name] = e.target.value;
      setUser(updateUser);
    }
  };

  const handleLoginForm = () => {
    setNewUser(!newUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      newUser &&
      user.userName &&
      user.email &&
      user.password &&
      user.confirmPassword
    ) {
      if (currentUser === undefined || currentUser.length === 0) {
        axios
          .post("http://localhost:5000/createUser", user)
          .then(function (response) {
            setLoading(true);
            setAdminPages();
          })
          .catch(function (error) {
            console.log(error);
          });

        setTimeout(() => {
          getUserToken();
          history.push(from);
        }, 3000);
      } else if (currentUser.length > 0) {
        setIsEmailValid(false);
        const updateErrors = { ...errors };
        updateErrors.emailError = "This email is already registered";
        setErrors(updateErrors);
      }
    }
    if (!newUser && user.email && user.password) {
      let updateErrors = { ...errors };
      if (currentUser === undefined || currentUser.length === 0) {
        updateErrors.emailError =
          "Not a registered user, please create an account first";
        setErrors(updateErrors);
      } else if (
        currentUser.length > 0 &&
        currentUser[0].password === user.password
      ) {
        localStorage.setItem("user", JSON.stringify(currentUser[0]));
        setAdminPages();
        setLoading(true);
        setUser(currentUser[0]);
        setTimeout(() => {
          getUserToken();
          history.push(from);
        }, 3000);
      } else if (
        currentUser.length > 0 &&
        currentUser.password !== user.password
      ) {
        updateErrors.passError = "Invalid password";
        setErrors(updateErrors);
      }
    }
  };

  const setAdminPages = () => {
    localStorage.setItem("currentPage", JSON.stringify(0));
    localStorage.setItem("currentPageTitle", JSON.stringify("Manage Products"));
  };

  const handleForgotPassword = () => {
    alert("Email was sent to your email");
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center sm:flex-row p-5">
      <div className="hidden sm:inline-block sm:w-1/2 lg:w-3/4">
        <img alt="form side" src={formBg} />
      </div>
      <div className="bg-white border bg-bl p-5 shadow-2xl rounded w-4/5 flex justify-center flex-col items-center sm:w-1/2 sm:relative right-40 lg:w-96">
        <img alt="logo" src={logo} className="h-20 w-2/3 sm:w-60" />
        <form onSubmit={handleLogin} className="flex flex-col w-full">
          <p className={"text-red-400"}>{errors.loginError}</p>
          {newUser && (
            <label className="mt-4 flex flex-col">
              <span className="font-bold text-xl montserrat text-gray-600">
                Name
              </span>
              <input
                required
                name="userName"
                onChange={handleFormData}
                type="text"
                className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
                placeholder="John Doe"
              />
              <p className={isNameValid ? "text-green-400" : "text-red-300"}>
                {errors.userNameError}
              </p>
            </label>
          )}
          <label className="mt-4 flex flex-col">
            <span className="font-bold text-xl montserrat text-gray-600">
              Your E-mail
            </span>
            <input
              required
              name="email"
              onChange={handleFormData}
              type="email"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
              placeholder="john@gmail.com"
            />
            <p className={isEmailValid ? "text-green-400" : "text-red-300"}>
              {errors.emailError}
            </p>
          </label>
          <label className="mt-4 flex flex-col">
            <span className="font-bold text-xl montserrat text-gray-600">
              Password
            </span>
            <input
              required
              name="password"
              onChange={handleFormData}
              type="password"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
              placeholder="password..."
            />
            <p className={isPassValid ? "text-green-400" : "text-red-300"}>
              {errors.passError}
            </p>
          </label>
          {newUser && (
            <label className="mt-4 flex flex-col">
              <span className="font-bold text-xl montserrat text-gray-600">
                Confirm Password
              </span>
              <input
                required
                name="confirmPassword"
                onChange={handleFormData}
                type="password"
                className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent p-3 sm:p-1"
                placeholder="confirm password..."
              />
              <p
                className={
                  isConfirmPassValid ? "text-green-400" : "text-red-300"
                }
              >
                {errors.confirmPassError}
              </p>
            </label>
          )}
          {!newUser && (
            <p
              onClick={handleForgotPassword}
              className="text-blue-400 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}
          {loading ? (
            <CircularProgress className="m-auto mt-3" />
          ) : (
            <input
              type="submit"
              className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              value={newUser ? "Create an Account" : "Login"}
            />
          )}
          {!loading && (
            <p className="text-center text-gray-500 mt-2">
              {newUser
                ? `Already have an account?${" "}`
                : `Don't have an account?${" "}`}
              <span
                onClick={handleLoginForm}
                className="text-blue-400 cursor-pointer"
              >
                {newUser ? "Login" : "Create an account"}
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
