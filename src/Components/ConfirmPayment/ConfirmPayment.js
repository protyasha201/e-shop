import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PaymentProcess from "./PaymentProcess";

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
      <div className="p-2 rounded border mt-5 sm:w-3/4 md:w-11/12 md:flex m-auto justify-between gap-5 lg:w-4/5">
        <div className="md:w-1/2">
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
                  <span className="text-red-400">Price: </span>$
                  {eachProduct.productPrice || eachProduct.product.productPrice}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2">
          <h3 className="text-gray-400 condensed">Delivery Details</h3>
          <div>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">Receiver Name: </span>
              {deliveryDetails.userName}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">Receiver email: </span>
              {deliveryDetails.email}
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
              <span className="text-gray-500">Postal: </span>
              {deliveryDetails.postal}
            </h4>
            <h4 className="text-gray-600 montserrat font-bold">
              <span className="text-gray-500">House: </span>
              {deliveryDetails.house}
            </h4>
          </div>
          <div className="mt-5">
            <h1 className="text-gray-400 condensed mb-4">Payment</h1>
            <PaymentProcess
              productsToBuy={products}
              deliveryDetails={deliveryDetails}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmPayment;
