import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

  console.log(products);

  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto items-center">
        <h1 className="montserrat text-blue-400 text-xl font-bold">Checkout</h1>
        <button
          onClick={goToHomePage}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Shopping
        </button>
      </div>
      <div>
        {products.map((eachProduct) => (
          <div key={eachProduct.key || eachProduct.productName}>
            <h1>
              {eachProduct.productName || eachProduct.product.productName}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Checkout;
