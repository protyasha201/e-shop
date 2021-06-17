import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideDrawers from "../SideDrawers/SideDrawers";
import ManageProducts from "../ManageProducts/ManageProducts";
import Statistics from "../Statistics/Statistics";
const Admin = () => {
  return (
    <Router>
      <SideDrawers />
      <Switch>
        <Route path="/admin/statistics">
          <Statistics />
        </Route>
        <Route path="/admin/manageProducts">
          <ManageProducts />
        </Route>
      </Switch>
    </Router>
  );
};

export default Admin;
