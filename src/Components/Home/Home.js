import React, { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";

const Home = () => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div>
      <Header />
      <h1 className="text-red-400">This is {user.userName}</h1>
    </div>
  );
};

export default Home;
