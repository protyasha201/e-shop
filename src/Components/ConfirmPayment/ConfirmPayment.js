import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ConfirmPayment = () => {
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [products, setProducts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setDeliveryDetails(JSON.parse(localStorage.getItem("deliveryDetails")));
  }, []);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

  const backToCheckout = () => {
    history.push("/checkout");
  };

  console.log(deliveryDetails);
  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto items-center">
        <h1 className="montserrat text-blue-400 text-xl font-bold">
          Confirm Order
        </h1>
        <button
          onClick={backToCheckout}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Checkout
        </button>
      </div>
      <div className="p-2 border rounded mt-5">
        <div>
          <h3 className="text-gray-400 condensed">Products</h3>
          {products.map((eachProduct) => (
            <div
              className="shadow mt-2 rounded flex p-2 items-center"
              key={eachProduct.key || eachProduct._id}
            >
              <div className="w-20">
                <img
                  className="w-full"
                  src={
                    eachProduct.productImage || eachProduct.product.productImage
                  }
                  alt={eachProduct.key || eachProduct.productName}
                />
              </div>
              <div className="w-full p-2 flex justify-between">
                <h3 className="montserrat font-bold text-gray-600">
                  {eachProduct.productName || eachProduct.product.productName}
                </h3>
                <h3 className="montserrat text-gray-500 font-bold text-lg">
                  <span className="text-red-400">Price: </span>
                  {eachProduct.productPrice || eachProduct.product.productPrice}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-gray-400 condensed">Delivery Details</h3>
          <div>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">Receiver Name: </span>
              {deliveryDetails.userName}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">Contact Number : </span>
              {deliveryDetails.mobileNumber}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">Country: </span>
              {deliveryDetails.country}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">State: </span>
              {deliveryDetails.state}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">City: </span>
              {deliveryDetails.city}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">House: </span>
              {deliveryDetails.house}
            </h4>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmPayment;
