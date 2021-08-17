import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/productDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data[0]);
      });
  }, [id]);

  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto">
        <h1 className="montserrat text-blue-400 text-xl font-bold">
          Product Details
        </h1>
        <button
          onClick={goToHomePage}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Home
        </button>
      </div>
      {productDetails.features ? (
        <div className="mt-5 flex flex-col lg:flex-row lg:items-center p-3 justify-center">
          <div className="lg:w-1/2 m-auto">
            <img
              className="m-auto"
              src={productDetails.productImage}
              alt={productDetails.productName}
            />
          </div>
          <div className="mt-5 p-2 shadow-lg border rounded lg:w-1/2">
            <div className="overflow-scroll h-80 m-auto">
              <h1 className="text-gray-500 condensed">
                <span className="text-red-500">Name: </span>
                {productDetails.productName}
              </h1>
              <p className="text-gray-500 condensed">
                <span className="text-red-500">Price: </span>$
                {productDetails.productPrice}
              </p>
              <p className="text-gray-500 condensed ">
                <span className="text-red-500">About: </span>
                {productDetails.description}
              </p>
              <div>
                <span className="text-red-500 condensed">Features:</span>
                {productDetails.features.map((productFeature) => (
                  <p
                    className="condensed text-gray-600 mt-2"
                    key={productFeature}
                  >
                    <span className="text-red-500 text-xl">*</span>
                    {productFeature}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button className="bg-blue-400 p-2 rounded text-white condensed hover:bg-blue-500 sm:w-3/5 sm:m-auto">
                Add To Cart
              </button>
              <button className="bg-green-400 p-2 rounded text-white condensed hover:bg-green-500 sm:w-3/5 sm:m-auto">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-xl text-red-400">Loading...</h1>
      )}
    </section>
  );
};

export default ProductDetails;
