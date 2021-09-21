import React from "react";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const AccessAdmin = (props) => {
  const { getStateData } = props;
  const [typedCodeError, setTypedCodeError] = useState("");
  const [typedCode, setTypedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const allowAccessToAdmin = (e) => {
    e.preventDefault();
    if (typedCode === "t$st@dminN0w") {
      setLoading(true);
      setTimeout(() => {
        getStateData(true);
        localStorage.setItem("isTemporaryAdmin", JSON.stringify(true));
      }, 3000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setTypedCodeError("Code didn't match");
        setLoading(false);
      }, 3000);
    }
  };

  const checkAccessCode = (e) => {
    setTypedCode(e.target.value);
  };
  return (
    <section className="p-10 flex items-center justify-center w-screen h-screen">
      <div className="p-5 text-center border rounded shadow-2xl">
        <h3 className="roboto text-2xl text-green-400">
          Access To Admin Panel
        </h3>
        <p className="condensed text-gray-500">
          To get access to the admin panel for testing, use this code-
          <span className="border shadow p-1 text-blue-400 font-medium">
            t$st@dminN0w
          </span>
        </p>
        <form className="flex flex-col" onSubmit={allowAccessToAdmin}>
          <label className="mt-4 flex flex-col">
            <span className="font-bold text-xl montserrat text-gray-600">
              Code
            </span>
            <input
              required
              name="code"
              onChange={checkAccessCode}
              type="text"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent p-3 sm:p-1"
              placeholder="The code"
            />
            <p className="text-red-300 text-left">{typedCodeError}</p>
          </label>
          {loading ? (
            <CircularProgress className="m-auto mt-2" />
          ) : (
            <input
              type="submit"
              className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              value="Go to Admin Panel"
            />
          )}
        </form>
      </div>
    </section>
  );
};

export default AccessAdmin;
