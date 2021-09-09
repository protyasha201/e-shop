import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const OrderDetails = () => {
  const { parentKey, childKey } = useParams();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  let currentProduct;
  let history = useHistory();

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/orderDetails/${parentKey}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result.length > 0) {
          setOrders(result[0]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [parentKey]);

  if (orders !== undefined) {
    const allProducts = orders.orderedProducts;
    if (allProducts !== undefined) {
      currentProduct = allProducts.filter(
        (eachProduct) => eachProduct.key2 === parseInt(childKey)
      );
    }
  }

  console.log(orders, currentProduct);

  const goToAdmin = () => {
    history.push("/admin");
  };
  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto items-center">
        <h1 className="montserrat text-blue-400 text-xl font-bold">
          Order Details
        </h1>
        <button
          onClick={goToAdmin}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Admin
        </button>
      </div>
      <div className="mt-3">
        <div className="p-2 border rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 condensed text-xl">Ordered Product</h2>
            <h3 className="light-blue-bg text-blue-300 rounded p-1 montserrat font-bold shadow">
              {currentProduct[0].status}
            </h3>
          </div>
          <div className="m-auto w-80 shadow p-1 rounded mt-2">
            <img
              className="w-full h-full"
              src={currentProduct[0].productImage}
              alt={currentProduct[0].productName}
            />
          </div>
          <h3 className="text-gray-500 montserrat mt-2 font-bold">
            <span className="text-red-300">Product: </span>{" "}
            {currentProduct[0].productName}.
          </h3>
          <h3 className="text-gray-500 montserrat font-bold">
            <span className="text-red-300">Price: </span>{" "}
            {currentProduct[0].productPrice}.
          </h3>
          <h3 className="text-gray-500 montserrat font-bold">
            <span className="text-red-300">Category: </span>{" "}
            {currentProduct[0].category}.
          </h3>
          <h3 className="text-gray-500 montserrat font-bold">
            <span className="text-red-300">Sub-Category: </span>{" "}
            {currentProduct[0].subCategory}.
          </h3>
          <h3 className="text-gray-500 montserrat font-bold">
            <span className="text-red-300">Description: </span>{" "}
            {currentProduct[0].description}.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
