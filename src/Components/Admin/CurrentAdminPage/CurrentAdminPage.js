import React from "react";
import ManageProducts from "../ManageProducts/ManageProducts";
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageAds from "../ManageAds/ManageAds";
import ManageOffers from "../ManageOffers/ManageOffers";
import Orders from "../Orders/Orders";
import AddProduct from "../AddProduct/AddProduct";
import AddAdmin from "../AddAdmin/AddAdmin";
import Reports from "../Reports/Reports";
import Statistics from "../Statistics/Statistics";

const CurrentAdminPage = (props) => {
  const currentPage = props.currentPage;

  if (currentPage === 0) {
    return <ManageProducts />;
  } else if (currentPage === 1) {
    return <ManageUsers />;
  } else if (currentPage === 2) {
    return <ManageAds />;
  } else if (currentPage === 3) {
    return <ManageOffers />;
  } else if (currentPage === 4) {
    return <Orders />;
  } else if (currentPage === 5) {
    return <AddProduct />;
  } else if (currentPage === 6) {
    return <AddAdmin />;
  } else if (currentPage === 7) {
    return <Reports />;
  } else if (currentPage === 8) {
    return <Statistics />;
  }
};

export default CurrentAdminPage;
