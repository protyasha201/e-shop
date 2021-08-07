import React from "react";
import { createRef } from "react";
import { useState } from "react";

const AddProduct = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureError, setFeatureError] = useState("");
  let textFeature = createRef();

  const addFeature = () => {
    const addedFeature = textFeature.current.value;
    const findFeature = features.filter((feature) => addedFeature === feature);
    const addFeatureValue = document.getElementById("addFeature");

    if (findFeature.length === 0 && addedFeature !== "") {
      setFeatureError("");
      addFeatureValue.value = "";
      setFeatures((feature) => [...feature, addedFeature]);
    } else if (addedFeature === "") {
      setFeatureError("Please add a feature First");
    } else {
      setFeatureError("Already added feature");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    alert("product added");
  };
  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl roboto text-left">
        Add New Product
      </h1>
      <form
        onSubmit={handleAddProduct}
        className="sm:grid grid-flow-row grid-cols-2 gap-4 lg:justify-items-center"
      >
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Select Category
          </span>
          <select required className="p-2 shadow border cursor-pointer">
            <option>Electronics</option>
            <option>Groceries</option>
            <option>Clothing</option>
            <option>Sports</option>
            <option>Cars and Bikes</option>
            <option></option>
          </select>
          <p
            onClick={() => setAddCategory(!addCategory)}
            className="text-center shadow p-1 hover:bg-green-300 hover:text-white mt-2 text-blue-400 cursor-pointer"
          >
            Add New Category?
          </p>
          {addCategory && (
            <div className="flex flex-col shadow p-3 rounded border">
              <input
                required
                name="category"
                type="text"
                className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
                placeholder="category name..."
              />
              <input
                type="submit"
                className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value="Add Category"
              />
            </div>
          )}
        </label>

        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Select Sub-category
          </span>
          <select required className="p-2 shadow border cursor-pointer">
            <option>watch</option>
            <option>mobiles</option>
            <option>laptop</option>
            <option>tv</option>
            <option>monitor</option>
            <option>T-shirts</option>
          </select>
          <p
            onClick={() => setAddSubCategory(!addSubCategory)}
            className="text-center shadow p-1 hover:bg-green-300 hover:text-white mt-2 text-blue-400 cursor-pointer"
          >
            Add New Sub-category?
          </p>
          {addSubCategory && (
            <div className="flex flex-col shadow p-3 rounded border">
              <input
                required
                name="category"
                type="text"
                className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
                placeholder="sub-category name..."
              />
              <input
                type="submit"
                className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value="Add sub-category"
              />
            </div>
          )}
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Product Name
          </span>
          <input
            required
            name="productName"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
            placeholder="1kg china rice..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Price
          </span>
          <input
            required
            name="productPrice"
            type="number"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
            placeholder="340..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Description
          </span>
          <textarea
            required
            name="description"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1 h-40"
            placeholder="give a short description of the product..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Add Features
          </span>
          <div className="flex justify-center items-between shadow p-2 rounded border gap-2">
            <input
              required
              id="addFeature"
              ref={textFeature}
              name="features"
              type="text"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-2 w-4/5"
              placeholder="features..."
            />
            <input
              onClick={addFeature}
              type="submit"
              className="bg-blue-400 rounded cursor-pointer text-white font-bold montserrat focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent p-1"
              value="Add Feature"
            />
          </div>
          <p className="text-red-300">{featureError}</p>
          <div className="flex flex-col">
            {features.map((feat) => (
              <p key={feat}>*{feat}</p>
            ))}
          </div>
        </label>
        <label className="cursor-pointer mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Upload Image
          </span>
          <input
            required
            name="productImage"
            type="file"
            className="shadow-md border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1 cursor-pointer hover:bg-blue-300"
          />
        </label>
        <input
          type="submit"
          className="md:w-2/3 text-white font-bold text-lg roboto mt-4 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent p-3 sm:p-1 cursor-pointer bg-green-400 clear-both float-right"
          value="Add Product"
        />
      </form>
    </section>
  );
};

export default AddProduct;
