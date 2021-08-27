import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import EditingField from "./EditingField";
import DescriptionField from "./DescriptionField";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

const EditProduct = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [featureError, setFeatureError] = useState("");
  const [showNameField, setShowNameField] = useState(false);
  const [showCategoryField, setShowCategoryField] = useState(false);
  const [showSubCategoryField, setShowSubCategoryField] = useState(false);
  const [showPriceField, setShowPriceField] = useState(false);
  const [showDescriptionField, setShowDescriptionField] = useState(false);
  const [product, setProduct] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [allProductsByCategory, setAllProductsByCategory] = useState([]);

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/productDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data[0]);
        setProduct(data[0]);
      });
  }, [id]);

  const loadProductDetails = () => {
    fetch(`http://localhost:5000/productDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data[0]);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setAllProductsByCategory(result);
        }
      });

    return () => {
      isMounted = false;
    };
  });

  const loadAllProductsByCategory = () => {
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setAllProductsByCategory(result);
        }
      });
  };

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const handleDataChange = (e) => {
    const updateProduct = { ...productDetails };
    updateProduct[e.target.name] = e.target.value;
    setProductDetails(updateProduct);
  };

  const uploadProductImage = (e) => {
    setIsImageUploaded(false);
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setIsImageUploaded(true);
        const updateProduct = { ...productDetails };
        updateProduct.productImage = response.data.data.display_url;
        setProductDetails(updateProduct);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addFeature = () => {
    const addedFeature = document.getElementById("features").value;
    const findFeature = productDetails.features.filter(
      (feature) => addedFeature === feature
    );
    const addFeatureValue = document.getElementById("features");
    if (findFeature.length === 0 && addedFeature !== "") {
      setFeatureError("");
      addFeatureValue.value = "";
      const updateProduct = { ...productDetails };
      if (updateProduct.features !== undefined) {
        updateProduct.features.push(addedFeature);
        setProductDetails(updateProduct);
      }
    } else if (addedFeature === "") {
      setFeatureError("Please add a feature First");
    } else {
      setFeatureError("Feature already been added");
    }
  };

  const saveChanges = () => {
    setIsImageUploaded("");
    const matchedProduct = allProductsByCategory.filter(
      (products) => products.category === productDetails.category
    );

    const productToUpdate = {
      parentId: matchedProduct[0]._id,
      _id: productDetails._id,
      category: productDetails.category,
      subCategory: productDetails.subCategory,
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
      description: productDetails.description,
      features: productDetails.features,
      productImage: productDetails.productImage,
    };

    axios
      .patch(`http://localhost:5000/updateProduct`, productDetails)
      .then(function (response) {
        alert("Changes saved");
        loadProductDetails();
        setShowNameField(false);
        setShowCategoryField(false);
        setShowSubCategoryField(false);
        setShowPriceField(false);
        setShowDescriptionField(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .patch(`http://localhost:5000/updateProduct2`, productToUpdate)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancelChange = (isCanceled, fieldName) => {
    if (isCanceled) {
      const updateProduct = { ...productDetails };
      updateProduct[fieldName] = product[fieldName];
      setProductDetails(updateProduct);
    }
  };

  const removeFeature = (clickedFeature) => {
    const features = productDetails.features.filter(
      (existedFeature) => existedFeature !== clickedFeature
    );
    const updateProduct = { ...productDetails };
    updateProduct.features = features;
    setProductDetails(updateProduct);
  };

  return (
    <section className="p-3">
      <div className="flex justify-between md:w-3/4 m-auto items-center lg:w-1/2">
        <h1 className="montserrat text-blue-400 text-xl font-bold">
          Edit Product
        </h1>
        <button
          onClick={goToAdminPage}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Admin
        </button>
      </div>
      {productDetails.productImage ? (
        <div className="border mt-4 rounded p-2 md:w-4/5 md:m-auto md:mt-4 lg:w-1/2">
          <div className="flex justify-center">
            <div className="w-1/2 shadow-md rounded">
              <img
                className="w-full rounded"
                src={productDetails.productImage}
                alt={productDetails.productName}
              />
            </div>
            <div>
              <label className="text-blue-300 cursor-pointer" htmlFor="files">
                <EditIcon className="ml-2 shadow text-white rounded bg-red-400 cursor-pointer hover:bg-blue-400" />
              </label>
              <input
                name="photoUrl"
                onChange={uploadProductImage}
                style={{ display: "none" }}
                type="file"
                id="files"
              />
            </div>
          </div>
          {isImageUploaded !== "" && (
            <div className="text-center">
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
          <div className="p-2 shadow-md rounded mt-3">
            <EditingField
              name="Name"
              fieldName={showNameField}
              inputName="productName"
              handleDataChange={handleDataChange}
              data={productDetails.productName}
              setFieldName={setShowNameField}
              cancelChange={cancelChange}
            />
            <EditingField
              name="Category"
              fieldName={showCategoryField}
              inputName="category"
              handleDataChange={handleDataChange}
              data={productDetails.category}
              setFieldName={setShowCategoryField}
              cancelChange={cancelChange}
            />
            <EditingField
              name="Sub-Category"
              fieldName={showSubCategoryField}
              inputName="subCategory"
              handleDataChange={handleDataChange}
              data={productDetails.subCategory}
              cancelChange={cancelChange}
              setFieldName={setShowSubCategoryField}
            />
            <EditingField
              name="Price"
              fieldName={showPriceField}
              inputName="productPrice"
              handleDataChange={handleDataChange}
              data={productDetails.productPrice}
              setFieldName={setShowPriceField}
              cancelChange={cancelChange}
            />
            <DescriptionField
              name="Description"
              fieldName={showDescriptionField}
              inputName="description"
              handleDataChange={handleDataChange}
              data={productDetails.description}
              setFieldName={setShowDescriptionField}
              cancelChange={cancelChange}
            />
            <div>
              <span className="text-gray-400 montserrat font-bold">
                Features:{" "}
              </span>
              <div className="flex justify-center items-between shadow p-2 rounded border gap-2">
                <input
                  id="features"
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
              <p className="text-red-400">{featureError}</p>
              {productDetails.features.map((feature) => (
                <div
                  className="flex justify-between items-center"
                  key={feature}
                >
                  <p className="mt-2 text-gray-500 montserrat font-bold">
                    <span className="text-red-400">#</span>
                    {feature}
                  </p>
                  <DeleteIcon
                    onClick={() => removeFeature(feature)}
                    className="shadow-md cursor-pointer text-red-500 hover:text-red-600"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={saveChanges}
              className="p-2 bg-green-400 hover:bg-green-500 rounded condensed text-white shadow-md mt-3 float-right mb-10"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default EditProduct;
