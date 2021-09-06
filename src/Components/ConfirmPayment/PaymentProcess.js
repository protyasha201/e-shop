import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51Ie3qfGyONO5UB1HkQCTkx4nNpRtdEitPLUY5tN5wTLZwPFSShmOfGMp7vtMvw3MBWYoohqmddeo340OBQCkGClR009BlA7eHY"
);

const PaymentProcess = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentProcess;
