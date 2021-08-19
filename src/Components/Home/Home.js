import React, { useContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import Products from "./Products/Products";
import Offers from "./Offers/Offers";
const Home = () => {
  const [user] = useContext(UserContext);

  return (
    <div>
      <Header />
      <Offers />
      <Products />
    </div>
  );
};

export default Home;
