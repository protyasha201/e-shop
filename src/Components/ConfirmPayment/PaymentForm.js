import { Modal } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [clickedOk, setClickedOk] = useState(false);
  let history = useHistory();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const readAlert = () => {
    handleCloseModal();
    setClickedOk(true);
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
      setModalText("Order successful.(We don't take real orders)");
      handleOpenModal();
      // goToHomePage();
    }
  };

  // const goToHomePage = () => {
  //   if (
  //     clickedOk &&
  //     modalText === "Order successful.(We don't take real orders)"
  //   ) {
  //     history.push("/");
  //   }
  // };

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
