import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";
import Header from "../Header/Header";

const Cart = () => {
  const [user] = useContext(UserContext);
  const [cart, setCart] = useState([]);

  const loadCartData = () => {
    let isMounted = true;
    fetch(`http://localhost:5000/cart?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setCart(data);
        }
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/cart?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setCart(data);
        }
      });
    return () => {
      isMounted = false;
    };
  });

  let prices = cart.map((carts) => carts.product.productPrice);
  let subTotalPrice = 0;
  let shippingFee = 50;
  let total;

  prices.forEach((price) => {
    const productPrice = parseFloat(price);
    subTotalPrice = subTotalPrice + productPrice;
  });

  total = subTotalPrice + shippingFee;

  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/removeFromCart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        loadCartData();
      });
    alert("Deleted successfully");
  };

  return (
    <section>
      <Header />
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/2">
          <h1 className="text-xl text-blue-500 condensed text-left">
            Cart({cart.length})
          </h1>
          {cart !== undefined && cart.length > 0 ? (
            cart.map((carts) => (
              <div
                className="flex p-2 border justify-between mt-3 w-11/12 m-auto rounded sm:w-4/5 md:w-11/12 items-center"
                key={carts._id}
              >
                <div className="w-1/4">
                  <img
                    className="w-full"
                    src={carts.product.productImage}
                    key={carts._id}
                    alt={carts.product.productName}
                  />
                </div>
                <div className="p-2 flex flex-col justify-center w-3/4">
                  <p className="text-sm text-gray-600 montserrat font-bold">
                    {carts.product.productName}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-500 montserrat font-bold">
                      <span className="text-red-400">Price: </span>$
                      {carts.product.productPrice}
                    </p>
                    <button
                      onClick={() => removeFromCart(carts._id)}
                      className="bg-red-400 text-white p-2 rounded hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-400 text-xl">
              Empty Cart...
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4 mb-3">
          <div className="border sticky top-2 sm:w-4/5 lg:w-4/5 md:w-full m-auto p-3 rounded">
            <h1 className="text-xl text-green-400 condensed">Order Summary</h1>
            <div className="flex justify-between items-center">
              <p className="text-red-400 montserrat font-bold">Subtotal</p>
              <p className="text-gray-600 montserrat font-bold">
                ${subTotalPrice.toFixed(4)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-red-400 montserrat font-bold">Shipping Fee</p>
              <p className="text-gray-600 montserrat font-bold">
                ${shippingFee}
              </p>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 condensed text-lg">Total</p>
              <p className="text-gray-600 condensed text-lg">
                ${total.toFixed(4)}
              </p>
            </div>
            <button className="p-2 rounded bg-green-400 text-white condensed w-full hover:bg-green-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
