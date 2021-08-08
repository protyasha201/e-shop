import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmounted) {
          setUserData(data[0]);
        }
      });

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  return (
    <section>
      <h1>{userData.userName}</h1>
    </section>
  );
};

export default ViewUser;
