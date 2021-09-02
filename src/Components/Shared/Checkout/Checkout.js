import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [user] = useContext(UserContext);
  let history = useHistory();
  const [showHouseField, setShowHouseField] = useState(false);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

  const updateCheckoutProducts = () => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  };

  console.log(products);

  let prices = products.map(
    (eachProduct) =>
      eachProduct.productPrice || eachProduct.product.productPrice
  );
  let subTotalPrice = 0;
  let shippingFee = 50;
  let total;

  prices.forEach((price) => {
    const productPrice = parseFloat(price);
    subTotalPrice = subTotalPrice + productPrice;
  });

  total = subTotalPrice + shippingFee;

  const goToHomePage = () => {
    history.push("/");
  };

  const goToProductDetailsPage = (id) => {
    history.push(`/productDetails/${id}`);
  };

  const removeFromCheckout = (key) => {
    const updateProducts = products.filter(
      (eachProduct) => eachProduct.key !== key
    );
    localStorage.setItem("productsToCheckout", JSON.stringify(updateProducts));

    updateCheckoutProducts();
  };

  const setDeliveryDetails = (e) => {
    e.preventDefault();
    console.log("cole");
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
      <div className="w-full md:w-1/2 p-4 mb-3">
        <div className="p-3">
          <div className="border p-2 rounded">
            <h2 className="text-gray-600 condensed">Products</h2>
            {products.map((eachProduct) => (
              <div
                className="border mt-2 rounded flex p-2 items-center"
                key={eachProduct.key || eachProduct._id}
              >
                <div className="w-20">
                  <img
                    className="w-full"
                    src={
                      eachProduct.productImage ||
                      eachProduct.product.productImage
                    }
                    alt={eachProduct.key || eachProduct.productName}
                  />
                </div>
                <div className="w-full p-2">
                  <h3 className="montserrat font-bold text-gray-600">
                    {eachProduct.productName || eachProduct.product.productName}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h3 className="montserrat text-gray-500 font-bold text-lg">
                      <span className="text-red-400">Price: </span>
                      {eachProduct.productPrice ||
                        eachProduct.product.productPrice}
                    </h3>
                    <button
                      onClick={() => removeFromCheckout(eachProduct.key)}
                      className="bg-red-400 rounded hover:bg-red-500 text-white condensed p-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border mt-5 rounded p-2">
            <h1 className="text-gray-600 text-xl condensed">
              Delivery Details
            </h1>
            <form className="flex flex-col" onSubmit={setDeliveryDetails}>
              <label>
                <div className="flex">
                  <p className="text-md montserrat font-bold text-gray-600">
                    Set House
                  </p>
                  {showHouseField ? (
                    <CancelIcon
                      onClick={() => setShowHouseField(!showHouseField)}
                      className="ml-5 shadow text-blue-400 cursor-pointer"
                    />
                  ) : (
                    <EditIcon
                      onClick={() => setShowHouseField(!showHouseField)}
                      className="ml-5 shadow text-blue-400 cursor-pointer"
                    />
                  )}
                </div>
                {showHouseField ? (
                  <input
                    className="mt-2 w-full p-2 rounded shadow"
                    defaultValue={user.house}
                  />
                ) : (
                  <p className="text-gray-500 montserrat font-bold">
                    {user.house ? user.house : "set your house"}
                  </p>
                )}
              </label>
            </form>
          </div>

          <div className="w-full md:w-1/2 mb-3 mt-5">
            <div className="border sticky top-2 sm:w-4/5 lg:w-3/5 md:w-full m-auto p-3 rounded">
              <h1 className="text-xl text-green-400 condensed">
                Order Summary
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-red-400 montserrat font-bold">Subtotal</p>
                <p className="text-gray-600 montserrat font-bold">
                  ${subTotalPrice.toFixed(4)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-red-400 montserrat font-bold">
                  Shipping Fee
                </p>
                <p className="text-gray-600 montserrat font-bold">
                  ${shippingFee}
                </p>
              </div>
              <hr></hr>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 condensed text-lg">Total</p>
                  <p className="text-gray-600 condensed text-lg">
                    ${total.toFixed(4)}
                  </p>
                </div>
                <button className="p-2 rounded bg-green-400 text-white condensed w-full text-center hover:bg-green-500">
                  Proceed To Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
