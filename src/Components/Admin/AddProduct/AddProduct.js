import axios from "axios";
import React from "react";
import { useState } from "react";
import { createRef } from "react";

const AddProduct = () => {
  const [features, setFeatures] = useState([]);
  const [featureError, setFeatureError] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [allProductsByCategory, setAllProductsByCategory] = useState([]);

  let textFeature = createRef();
  let productExist;

  const [product, setProduct] = useState({
    category: "",
    subCategory: "",
    productName: "",
    productPrice: "",
    description: "",
    features: [],
    productImage: "",
  });

  const [productsByCategory, setProductsByCategory] = useState({
    category: "",
    allProducts: [],
  });

  if (allProductsByCategory.length > 0) {
    productExist = allProductsByCategory.filter(
      (products) =>
        products.category.toUpperCase() ===
        productsByCategory.category.toUpperCase()
    );
  }

  const postProductByCategory = (value) => {
    const updateProductByCategory = { ...productsByCategory };
    updateProductByCategory.allProducts.push(value);
    setProductsByCategory(updateProductByCategory);

    if (productExist === undefined || productExist.length === 0) {
      axios
        .post(
          "http://localhost:5000/addProductWithCategory",
          productsByCategory
        )
        .then(function (response) {
          setProductsByCategory({
            category: "",
            allProducts: [],
          });
        })
        .catch(function (err) {});
    } else if (productExist.length > 0) {
      axios
        .patch(`http://localhost:5000/updateProductsByCategory`, value)
        .then(function (response) {
          setProductsByCategory({
            category: "",
            allProducts: [],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const loadAllProductsData = () => {
    fetch(`http://localhost:5000/allProducts`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          postProductByCategory(result[result.length - 1]);
        }
      });
  };

  const loadAllProductsByCategory = () => {
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setAllProductsByCategory(result);
        }
      });
  };

  const addFeature = () => {
    const addedFeature = textFeature.current.value;
    const findFeature = features.filter((feature) => addedFeature === feature);
    const addFeatureValue = document.getElementById("features");
    if (findFeature.length === 0 && addedFeature !== "") {
      setFeatureError("");
      addFeatureValue.value = "";
      const updateProduct = { ...product };
      setFeatures((feature) => [...feature, addedFeature]);
      if (updateProduct.features !== undefined) {
        updateProduct.features.push(addedFeature);
        setProduct(updateProduct);
      }
    } else if (addedFeature === "") {
      setFeatureError("Please add a feature First");
    } else {
      setFeatureError("Already added feature");
    }
  };

  const handleUploadProductImage = (e) => {
    setIsImageUploaded(false);
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setIsImageUploaded(true);
        const updateProduct = { ...product };
        updateProduct.productImage = response.data.data.display_url;
        setProduct(updateProduct);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleProduct = (e) => {
    const updateProduct = { ...product };
    const updateProductByCategory = { ...productsByCategory };

    if (e.target.name === "category") {
      loadAllProductsByCategory();
      updateProductByCategory.category = e.target.value;
      setProductsByCategory(updateProductByCategory);
    }
    updateProduct[e.target.name] = e.target.value;
    setProduct(updateProduct);
    setProductsByCategory(updateProductByCategory);
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addProduct", product)
      .then(function (response) {
        loadAllProductsData();
        alert("Product added successfully");

        setProduct({
          category: "",
          subCategory: "",
          productName: "",
          productPrice: "",
          description: "",
          features: [],
          productImage: "",
        });

        setFeatures([]);
        setIsImageUploaded("");

        document.getElementById("category").value = "";
        document.getElementById("subCategory").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("description").value = "";
        document.getElementById("features").value = "";
        document.getElementById("productImage").value = "";
      })
      .catch(function (err) {
        alert("Try again, product was not added");
      });
  };

  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl roboto text-left">
        Add New Product
      </h1>
      <form
        onSubmit={addProduct}
        className="sm:grid grid-flow-row grid-cols-2 gap-4 lg:justify-items-center"
      >
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Category
          </span>
          <input
            id="category"
            onBlur={handleProduct}
            name="category"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-2"
            placeholder="category name..."
          />
        </label>

        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Sub-category
          </span>
          <input
            onBlur={handleProduct}
            required
            id="subCategory"
            name="subCategory"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-2"
            placeholder="sub-category name..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Product Name
          </span>
          <input
            onBlur={handleProduct}
            required
            id="productName"
            name="productName"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-2"
            placeholder="1kg china rice..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Price
          </span>
          <input
            onBlur={handleProduct}
            required
            id="productPrice"
            name="productPrice"
            type="text"
            className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-2"
            placeholder="340..."
          />
        </label>
        <label className="mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Description
          </span>
          <textarea
            onBlur={handleProduct}
            required
            id="description"
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
              id="features"
              ref={textFeature}
              name="features"
              type="text"
              className="border-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-2 w-4/5"
              placeholder="features..."
            />
            <input
              onClick={addFeature}
              type="submit"
              className="bg-blue-400 rounded cursor-pointer text-white font-bold montserrat focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent p-1"
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
            onChange={handleUploadProductImage}
            required
            id="productImage"
            name="productImage"
            type="file"
            className="shadow-md border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1 cursor-pointer hover:bg-blue-300"
          />
          {isImageUploaded !== "" && (
            <div>
              {isImageUploaded ? (
                <p className="mt-3 text-gray-500">
                  Image Uploaded Successfully
                </p>
              ) : (
                <p className="mt-3 text-gray-500">
                  Let the image upload before adding the product
                </p>
              )}
            </div>
          )}
        </label>
        <input
          type="submit"
          className="md:w-2/3 text-white font-bold text-lg roboto mt-4 border-2 rounded focus:outline-none focus:ring-2 focus:border-transparent p-3 sm:p-1 cursor-pointer bg-green-400 clear-both float-right focus:ring-gray-700"
          value="Add Product"
        />
      </form>
    </section>
  );
};

export default AddProduct;
