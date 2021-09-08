import { Modal } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const PaymentForm = (props) => {
  const { productsToBuy, deliveryDetails } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [cart, setCart] = useState([]);
  let allProducts = [];
  let history = useHistory();

  // console.log(deliveryDetails, productsToBuy);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (modalText === "Order successful.(We don't take real orders)") {
      history.push("/");
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/cart?email=${deliveryDetails.email}`)
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

  const readAlert = () => {
    handleCloseModal();
    if (modalText === "Order successful.(We don't take real orders)") {
      history.push("/");
    }
  };

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("productsToCheckout")));
  }, []);

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

  let matchedProducts = [];
  products.forEach((product) => {
    const matched = cart.filter(
      (eachProduct) => eachProduct.key === product.key
    );
    if (matched.length > 0) {
      matchedProducts.push(matched[0]);
    }
  });

  const removeCartProducts = () => {
    matchedProducts.forEach((eachProduct) => {
      fetch(`http://localhost:5000/removeFromCart/${eachProduct._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {});
    });
  };

  const handleConfirmPayment = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setModalText(error.message);
      handleOpenModal();
    } else {
      const randomNumber = Math.random() * 100000000000000;
      const key = Math.round(randomNumber);

      productsToBuy.forEach((eachProduct) => {
        if (eachProduct.userName) {
          allProducts.push(eachProduct.product);
        } else {
          allProducts.push(eachProduct);
        }
      });

      allProducts.forEach((eachProduct) => {
        eachProduct.key = key;
        const randomNumber2 = Math.random() * 100000000000000;
        const key2 = Math.round(randomNumber2);
        eachProduct.key2 = key2;
      });

      const confirmOrder = {
        key: key,
        email: deliveryDetails.email,
        deliveryDetails: deliveryDetails,
        paymentMethod: paymentMethod,
        orderedProducts: allProducts,
      };

      axios
        .post("http://localhost:5000/addOrder", confirmOrder)
        .then(function (response) {
          setModalText("Order successful.(We don't take real orders)");
          handleOpenModal();
          removeCartProducts();
          localStorage.setItem("productsToCheckout", JSON.stringify(""));
          localStorage.setItem("deliveryDetails", JSON.stringify(""));
        })
        .catch(function (error) {
          setModalText(error.message);
          handleOpenModal();
        });
    }
  };

  return (
    <form onSubmit={handleConfirmPayment} className="p-3 rounded border">
      <CardElement />
      <button
        className="w-full bg-blue-400 p-2 rounded text-white montserrat font-bold mt-5"
        type="submit"
        disabled={!stripe}
      >
        Pay ${total}
      </button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="bg-white w-96 rounded m-auto mt-60 p-5 flex flex-col justify-center items-center">
          <p className="text-gray-600 montserrat font-bold text-center">
            {modalText}
          </p>
          <button
            onClick={readAlert}
            className="mt-5 bg-green-400 hover:bg-green-500 p-2 w-20 text-white condensed text-lg rounded"
          >
            OK
          </button>
        </div>
      </Modal>
    </form>
  );
};

export default PaymentForm;
