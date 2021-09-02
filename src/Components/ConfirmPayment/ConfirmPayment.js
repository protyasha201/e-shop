import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ConfirmPayment = () => {
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setDeliveryDetails(JSON.parse(localStorage.getItem("deliveryDetails")));
  }, []);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

  console.log(deliveryDetails, products);
  return (
    <div>
      <h1>Good one</h1>
    </div>
  );
};

export default ConfirmPayment;
