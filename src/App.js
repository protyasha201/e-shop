import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Orders from "./Components/Orders/Orders";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin/Admin";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
export const UserContext = createContext([]);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    userName: "",
    email: "",
    photoUrl: "",
    password: "",
    confirmPassword: "",
    mobileNumber: null,
    country: "",
    district: "",
    house: "",
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
          <PrivateRoute path="/products">
            <Products />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
