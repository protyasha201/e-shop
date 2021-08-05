import React, { useContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";

const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <div>
      <Header />
      <h1 className="text-red-400">This is {user.userName}</h1>
    </div>
  );
};

export default Home;
