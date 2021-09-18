import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Orders from "./Components/Orders/Orders";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin/Admin";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import ViewUser from "./Components/Admin/ViewUser/ViewUser";
import ProductDetails from "./Components/Shared/ProductDetails/ProductDetails";
import OfferDetails from "./Components/Admin/ManageOffers/OfferDetails";
import ViewProduct from "./Components/Admin/ManageProducts/ViewProduct";
import EditProduct from "./Components/Admin/ManageProducts/EditProduct";
import EditAdmin from "./Components/Admin/AddAdmin/EditAdmin";
import Checkout from "./Components/Shared/Checkout/Checkout";
import ConfirmPayment from "./Components/ConfirmPayment/ConfirmPayment";
import OrderDetails from "./Components/Admin/ManageOrders/OrderDetails";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";

export const UserContext = createContext([]);

function App() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    photoUrl: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    mobileNumber: null,
    country: "",
    countryCode: "",
    state: "",
    city: "",
    postal: "",
    house: "",
    ipAddress: "",
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/cart">
            <Cart />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/user/:id">
            <ViewUser />
          </Route>
          <Route path="/productDetails/:id">
            <ProductDetails />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/confirmPayment">
            <ConfirmPayment />
          </Route>
          <Route path="/offerDetails/:id">
            <OfferDetails />
          </Route>
          <Route path="/orderDetails/:parentKey/:childKey">
            <OrderDetails />
          </Route>
          <Route path="/viewProduct/:id">
            <ViewProduct />
          </Route>
          <Route path="/categoryProducts/:id">
            <CategoryProducts />
          </Route>
          <Route path="/editProduct/:id">
            <EditProduct />
          </Route>
          <Route path="/editAdmin/:id">
            <EditAdmin />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
