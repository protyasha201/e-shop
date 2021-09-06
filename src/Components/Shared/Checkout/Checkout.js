import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import EditingField from "../EditingField/EditingField";
import Modal from "@material-ui/core/Modal";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [user] = useContext(UserContext);
  let history = useHistory();
  const [showNameField, setShowNameField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showHouseField, setShowHouseField] = useState(false);
  const [showCityField, setShowCityField] = useState(false);
  const [showMobileNumberField, setShowMobileNumberField] = useState(false);
  const [showCountryField, setShowCountryField] = useState(false);
  const [showStateField, setShowStateField] = useState(false);
  const [userDelivery, setUserDelivery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

  useEffect(() => {
    setUserDelivery(JSON.parse(localStorage.getItem("user")));
  }, []);

  const updateCheckoutProducts = () => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  };

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

  const removeFromCheckout = (key) => {
    const updateProducts = products.filter(
      (eachProduct) => eachProduct.key !== key
    );
    localStorage.setItem("productsToCheckout", JSON.stringify(updateProducts));

    updateCheckoutProducts();
  };

  const proceedToPay = (e) => {
    if (
      userDelivery.userName &&
      userDelivery.email &&
      userDelivery.mobileNumber &&
      userDelivery.country &&
      userDelivery.state &&
      userDelivery.city &&
      userDelivery.house &&
      products.length > 0
    ) {
      history.push("/confirmPayment");
      localStorage.setItem("deliveryDetails", JSON.stringify(userDelivery));
    }
    if (products.length === 0) {
      setModalText("No Product added, Add a product first");
      handleOpenModal();
    } else {
      setModalText("Please set complete delivery details first.");
      handleOpenModal();
    }
  };

  const cancelChange = (isCanceled, fieldName) => {
    if (isCanceled) {
      const updateDeliveryDetail = { ...userDelivery };
      updateDeliveryDetail[fieldName] = user[fieldName];
      setUserDelivery(updateDeliveryDetail);
    }
  };

  const handleDetailsChange = (e) => {
    const updateDeliveryDetail = { ...userDelivery };
    updateDeliveryDetail[e.target.name] = e.target.value;
    setUserDelivery(updateDeliveryDetail);
  };

  return (
    <section className="p-3 sm:w-3/4 m-auto md:w-full">
      <div className="flex justify-between md:w-3/4 m-auto items-center">
        <h1 className="montserrat text-blue-400 text-xl font-bold">Checkout</h1>
        <button
          onClick={goToHomePage}
          className="shadow-md bg-green-400 text-white condensed p-2 rounded"
        >
          Back To Shopping
        </button>
      </div>

      <div className="p-3 md:flex justify-between gap-4 lg:w-4/5 m-auto border mt-4 rounded">
        <div className="p-2 rounded rounded md:w-1/2">
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
                    eachProduct.productImage || eachProduct.product.productImage
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

        <div className="md:w-1/2">
          <div className="mt-5 md:mt-0 rounded p-2">
            <h1 className="text-gray-600 text-xl condensed">
              Delivery Details
            </h1>
            <div>
              <EditingField
                name="Name"
                fieldName={showNameField}
                inputName="userName"
                handleDataChange={handleDetailsChange}
                data={user.userName}
                setFieldName={setShowNameField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="Email"
                fieldName={showEmailField}
                inputName="email"
                handleDataChange={handleDetailsChange}
                data={user.email}
                setFieldName={setShowEmailField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="Contact"
                fieldName={showMobileNumberField}
                inputName="mobileNumber"
                handleDataChange={handleDetailsChange}
                data={user.mobileNumber}
                setFieldName={setShowMobileNumberField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="Country"
                fieldName={showCountryField}
                inputName="country"
                handleDataChange={handleDetailsChange}
                data={user.country}
                setFieldName={setShowCountryField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="State"
                fieldName={showStateField}
                inputName="state"
                handleDataChange={handleDetailsChange}
                data={user.state}
                setFieldName={setShowStateField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="City"
                fieldName={showCityField}
                inputName="city"
                handleDataChange={handleDetailsChange}
                data={user.city}
                setFieldName={setShowCityField}
                cancelChange={cancelChange}
                required={true}
              />
              <EditingField
                name="House"
                fieldName={showHouseField}
                inputName="house"
                handleDataChange={handleDetailsChange}
                data={user.house}
                setFieldName={setShowHouseField}
                cancelChange={cancelChange}
                required={true}
              />
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <div className="p-2 rounded border">
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
                <button
                  onClick={proceedToPay}
                  className="p-2 rounded bg-green-400 text-white condensed w-full text-center hover:bg-green-500"
                >
                  Proceed To Pay
                </button>
                <Modal open={openModal} onClose={handleCloseModal}>
                  <div className="bg-white w-96 rounded m-auto mt-60 p-5 flex flex-col justify-center items-center">
                    <p className="text-gray-600 montserrat font-bold text-center">
                      {modalText}
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="mt-5 bg-green-400 hover:bg-green-500 p-2 w-20 text-white condensed text-lg rounded"
                    >
                      OK
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
