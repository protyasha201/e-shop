import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const OrderDetails = () => {
  const { parentKey, childKey } = useParams();
  const [orders, setOrders] = useState([]);
  const receiverDetails = orders.deliveryDetails;
  const paymentDetails = orders.paymentMethod.card;
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

  console.log(orders);

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
      {currentProduct ? (
        <div className="mt-3">
          <div className="p-2 border rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-500">
                Added in:{" "}
                <span className="light-blue-bg text-green-600 condensed inline-block p-1 rounded shadow">
                  {orders.shippingDate}
                </span>
              </h3>
              <h3
                className={
                  currentProduct[0].status === "Pending"
                    ? "rounded shadow-md p-1 condensed text-gray-500 light-pink-bg text-pink-500"
                    : currentProduct[0].status === "Delivered"
                    ? "rounded shadow-md p-1 condensed text-green-600 light-green-bg"
                    : currentProduct[0].status === "Canceled"
                    ? "shadow-md rounded p-1 condensed text-red-600 light-red-bg"
                    : "shadow-md rounded p-1 condensed text-blue-500 light-blue-bg"
                }
              >
                {currentProduct[0].status}
              </h3>
            </div>
            <h2 className="text-gray-500 condensed text-xl">Ordered Product</h2>
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
            <div>
              <h3 className="text-red-300 montserrat font-bold">Features: </h3>
              {currentProduct[0].features.map((eachFeature) => (
                <p
                  className="montserrat font-bold text-gray-500"
                  key={eachFeature}
                >
                  <span className="text-blue-400">#</span>
                  {eachFeature}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-4 p-2 border rounded">
            <h2 className="text-gray-500 condensed text-xl">
              Receiver Details
            </h2>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Receiver's Name: </span>{" "}
              {receiverDetails.userName}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Email: </span>{" "}
              {receiverDetails.email}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Contact Number: </span>{" "}
              {receiverDetails.mobileNumber}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Country: </span>{" "}
              {receiverDetails.country}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">State: </span>{" "}
              {receiverDetails.state}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">City: </span>{" "}
              {receiverDetails.city}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Postal: </span>{" "}
              {receiverDetails.postal}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">House: </span>{" "}
              {receiverDetails.house}.
            </h3>
          </div>

          <div className="mt-4 p-2 border rounded">
            <h2 className="text-gray-500 condensed text-xl">Payment Details</h2>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Card Brand: </span>{" "}
              {paymentDetails.brand}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Expiry Month: </span>{" "}
              {paymentDetails.exp_month}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Expiry Year: </span>{" "}
              {paymentDetails.exp_year}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Funding: </span>{" "}
              {paymentDetails.funding}.
            </h3>
            <h3 className="text-gray-500 montserrat font-bold">
              <span className="text-red-300">Last Four: </span>{" "}
              {paymentDetails.last4}.
            </h3>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default OrderDetails;
