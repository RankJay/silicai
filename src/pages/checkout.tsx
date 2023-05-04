import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51MyTmmJr18hT8NbDwyQ6XvlIOx7HHWjvh6rIQKLxNBEGTSCY2CFT06ntzkJvgma26i2JDIT9Rxytap396YiclEsW00IpxqY6HK"
);

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return null;
    }

    const {error} = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/new?success=true',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      // setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <LinkAuthenticationElement />
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US"] }}
      />
      <PaymentElement />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default function App() {
  const { query } = useRouter();
  const options = {
    clientSecret: query.client_secret as string,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
