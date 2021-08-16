import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setProducts(result);
        }
      });
  }, []);

  return (
    <section>
      {products.length > 0 ? (
        products.map((productsByCategory) => (
          <div
            className="p-2 lg:w-9/12 md:w-11/12 sm:m-auto"
            key={productsByCategory.category}
          >
            <h1 className="text-2xl font-bold condensed text-gray-600">
              {productsByCategory.category.toUpperCase()}
            </h1>
            <div className="grid gap-3 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsByCategory.allProducts.map((product) => (
                <div
                  className="border rounded p-2 w-4/5 m-auto h-full sm:w-4/5 md:w-full flex flex-col justify-between"
                  key={product.productName}
                >
                  <h1 className="text-gray-500 montserrat font-bold mb-2">
                    {product.productName.toUpperCase()}
                  </h1>
                  <div className="w-1/2 m-auto">
                    <img
                      className="h-full w-full"
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </div>
                  <p className="text-sm font-thin text-gray-600 condensed mt-2 underline cursor-pointer hover:text-blue-400">
                    {product.description.slice(0, 90)}...
                  </p>
                  <div className="mt-3 justify-between flex flex-col">
                    <p className="text-xl text-gray-600 montserrat font-bold text-right">
                      <span className="text-red-500">Price: </span>$
                      {product.productPrice}
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <button className="bg-blue-400 p-2 rounded text-white condensed hover:bg-blue-500">
                        Add To Cart
                      </button>
                      <button className="bg-green-400 p-2 rounded text-white condensed hover:bg-green-500">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-gray-500 text-xl text-blue-400">
          Loading...
        </h1>
      )}
    </section>
  );
};

export default Products;
