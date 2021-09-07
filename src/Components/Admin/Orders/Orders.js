import React from "react";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setOrders(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(orders);
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
