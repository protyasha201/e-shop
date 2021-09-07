import React from "react";
import { useEffect, useState } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const orderedProducts = [];

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

  orders.forEach((eachOrder) => {
    eachOrder.orderedProducts.forEach((order) => {
      if (order.userName) {
        orderedProducts.push(order.product);
      } else {
        orderedProducts.push(order);
      }
    });
  });

  console.log(orderedProducts, orders);

  // console.log(orders);
  return (
    <div>
      <h1>Orders</h1>
      {orders.map((eachOrder) => (
        <div key={eachOrder._id}>
          <h1 className="bg-green-300 text-green-400 p-2 rounded shadow mt-2 inline-block">
            {eachOrder.deliveryDetails.userName}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
