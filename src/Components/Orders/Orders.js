import React from "react";
import Header from "../Header/Header.js";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import { useContext } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useContext(UserContext);
  let totalOrders = 0;
  let totalOrdersPrice = 0;

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/userOrders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setOrders(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [user.email]);

  orders.forEach((eachOrder) => {
    totalOrders = totalOrders + eachOrder.orderedProducts.length;
  });

  orders.forEach((eachOrder) => {
    eachOrder.orderedProducts.forEach((product) => {
      totalOrdersPrice = totalOrdersPrice + parseInt(product.productPrice);
    });
  });

  return (
    <section>
      <Header />
      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl condensed text-blue-400">
          Total Orders- <span className="text-gray-500">{totalOrders}</span>
        </h1>
        <h1 className="text-xl condensed text-blue-400">
          Total Expenses-{" "}
          <span className="text-gray-500">${totalOrdersPrice}</span>
        </h1>
      </div>
      <div className="p-3 rounded">
        <h1 className="montserrat text-lg text-gray-500 font-bold">Orders</h1>
        <div className="p-2 rounded">
          {orders.map((eachOrder) => (
            <div className="border p-2 rounded mt-5" key={eachOrder._id}>
              <div className="border rounded p-2">
                <h3 className="light-blue-bg text-green-600 condensed inline-block p-1 rounded shadow">
                  {eachOrder.shippingDate}
                </h3>
                <div className="mt-2 grid grid-cols-2">
                  <h3 className="text-red-300 condensed">
                    Receiving Email:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.email}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Name:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.userName}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Contact:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.mobileNumber}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    House:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.house}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    State:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.state}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    City:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.city}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    postal:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.postal}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Country:{" "}
                    <span className="text-gray-500">
                      {eachOrder.deliveryDetails.country}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Payment Card:{" "}
                    <span className="text-gray-500">
                      {eachOrder.paymentMethod.card.brand}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Card last 4:{" "}
                    <span className="text-gray-500">
                      {eachOrder.paymentMethod.card.last4}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Card Expiry Month:{" "}
                    <span className="text-gray-500">
                      {eachOrder.paymentMethod.card.exp_month}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Card Expiry Year:{" "}
                    <span className="text-gray-500">
                      {eachOrder.paymentMethod.card.exp_year}
                    </span>
                  </h3>
                  <h3 className="text-red-300 condensed">
                    Card Funding:{" "}
                    <span className="text-gray-500">
                      {eachOrder.paymentMethod.card.funding}
                    </span>
                  </h3>
                </div>
              </div>
              {eachOrder.orderedProducts.map((eachProduct) => (
                <div
                  className="shadow mt-2 rounded flex p-2 items-center"
                  key={eachProduct.key2}
                >
                  <div className="w-20">
                    <img
                      className="w-full"
                      src={eachProduct.productImage}
                      alt={eachProduct.key2}
                    />
                  </div>
                  <div className="w-full p-2">
                    <h3 className="montserrat font-bold text-gray-600">
                      {eachProduct.productName}
                    </h3>
                    <div className="flex justify-between items-center">
                      <h3 className="montserrat text-gray-500 font-bold text-lg">
                        <span className="text-red-400">Price: </span>$
                        {eachProduct.productPrice}
                      </h3>
                      <h3
                        className={
                          eachProduct.status === "Pending"
                            ? "rounded shadow-md p-1 condensed text-gray-500 light-pink-bg text-pink-500"
                            : eachProduct.status === "Delivered"
                            ? "rounded shadow-md p-1 condensed text-green-600 light-green-bg"
                            : eachProduct.status === "Canceled"
                            ? "shadow-md rounded p-1 condensed text-red-600 light-red-bg"
                            : "shadow-md rounded p-1 condensed text-blue-500 light-blue-bg"
                        }
                      >
                        {eachProduct.status}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
