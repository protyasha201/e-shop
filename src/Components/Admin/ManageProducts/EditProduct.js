import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import EditingField from "./EditingField";
import CancelIcon from "@material-ui/icons/Cancel";
import DescriptionField from "./DescriptionField";
import axios from "axios";

const EditProduct = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [showNameField, setShowNameField] = useState(false);
  const [showCategoryField, setShowCategoryField] = useState(false);
  const [showSubCategoryField, setShowSubCategoryField] = useState(false);
  const [showPriceField, setShowPriceField] = useState(false);
  const [showDescriptionField, setShowDescriptionField] = useState(false);

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/productDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data[0]);
      });
  }, [id]);

  console.log(productDetails);

  const goToAdminPage = () => {
    history.push("/admin");
  };

  const handleDataChange = (e) => {
    console.log(e.target.value);
  };

  const uploadProductImage = (e) => {
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
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
          <div className="p-2 shadow-md rounded mt-3">
            <EditingField
              name="Name"
              fieldName={showNameField}
              inputName="productName"
              handleDataChange={handleDataChange}
              data={productDetails.productName}
              setFieldName={setShowNameField}
            />
            <EditingField
              name="Category"
              fieldName={showCategoryField}
              inputName="category"
              handleDataChange={handleDataChange}
              data={productDetails.category}
              setFieldName={setShowCategoryField}
            />
            <EditingField
              name="Sub-Category"
              fieldName={showSubCategoryField}
              inputName="subCategory"
              handleDataChange={handleDataChange}
              data={productDetails.subCategory}
              setFieldName={setShowSubCategoryField}
            />
            <EditingField
              name="Price"
              fieldName={showPriceField}
              inputName="price"
              handleDataChange={handleDataChange}
              data={productDetails.productPrice}
              setFieldName={setShowPriceField}
            />
            <DescriptionField
              name="Description"
              fieldName={showDescriptionField}
              inputName="description"
              handleDataChange={handleDataChange}
              data={productDetails.description}
              setFieldName={setShowDescriptionField}
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
                  type="submit"
                  className="bg-blue-400 rounded cursor-pointer text-white font-bold montserrat focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent p-1"
                  value="Add Feature"
                />
              </div>
              {productDetails.features.map((feature) => (
                <p
                  className="mt-2 text-gray-500 montserrat font-bold"
                  key={feature}
                >
                  <span className="text-red-400">#</span>
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default EditProduct;
