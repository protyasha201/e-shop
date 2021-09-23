import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [user] = useContext(UserContext);
  let history = useHistory();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/categoryProducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const goToProductDetails = (productId) => {
    history.push(`/productDetails/${productId}`);
  };

  const goToCheckoutPage = (product) => {
    history.push("/checkout");
    localStorage.setItem("productsToCheckout", JSON.stringify([product]));
  };

  const addToCart = (product) => {
    const randomNumber = Math.random() * 100000000000000;
    const key = Math.round(randomNumber);

    const addToCartProduct = {
      key: key,
      product: product,
      userName: user.userName,
      email: user.email,
      photoUrl: user.photoUrl,
      password: user.password,
      confirmPassword: user.confirmPassword,
      isAdmin: user.isAdmin,
      mobileNumber: user.mobileNumber,
      country: user.country,
      countryCode: user.countryCode,
      state: user.state,
      city: user.city,
      postal: user.postal,
      house: user.house,
      ipAddress: user.ipAddress,
      longitude: user.longitude,
      latitude: user.latitude,
    };

    axios
      .post("http://localhost:5000/addToCart", addToCartProduct)
      .then(function (response) {
        setModalText("Added To Cart");
        handleOpenModal();
      })
      .catch(function (err) {
        setModalText("Error! Product was not added");
      });
  };

  return (
    <section>
      <Header />
      {products ? (
        products.map((productsByCategory) => (
          <div
            className="p-2 lg:w-9/12 md:w-11/12 sm:m-auto"
            key={productsByCategory.category}
          >
            <h1 className="text-2xl font-bold condensed text-gray-600">
              {productsByCategory.category.toUpperCase()}
            </h1>
            <div className="grid gap-3 grid-cols-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsByCategory.allProducts.map((product) => (
                <div
                  className="border rounded p-2 m-auto h-full md:w-full flex flex-col justify-between hover:shadow-lg"
                  key={product.productName}
                >
                  <div className="w-1/2 m-auto">
                    <img
                      className="h-full w-full"
                      src={product.productImage}
                      alt={product.productName}
                    />
                  </div>
                  <p
                    onClick={() => goToProductDetails(product._id)}
                    className="text-sm font-thin text-gray-600 condensed mt-2 underline cursor-pointer hover:text-blue-400"
                  >
                    {product.productName.slice(0, 25)}...
                  </p>
                  <div className="mt-3 justify-between flex flex-col">
                    <p className="text-gray-600 montserrat font-bold text-right">
                      <span className="text-red-500">Price: </span>$
                      {product.productPrice}
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-400 p-1 rounded text-white condensed hover:bg-blue-500"
                      >
                        Add To Cart
                      </button>
                      <button
                        onClick={() => goToCheckoutPage(product)}
                        className="bg-green-400 p-1 rounded text-white condensed hover:bg-green-500 text-center"
                      >
                        Buy Now
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

export default CategoryProducts;
