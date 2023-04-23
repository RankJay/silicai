import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
const stripePromise = loadStripe(
  "pk_test_51MyTmmJr18hT8NbDYGfsuabekj4ZonCii93aKw3leWi7LuUJeYhtcNXAWK0mD9IqVfTSou2BPlNHGfYY4i2Vj6Rn006N3oBuzj"
);
// recreating the `Stripe` object on every render.

export default function Checkout() {
  const [item, setItem] = useState({
    name: "Apple AirPods",
    description: "Latest Apple AirPods.",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 1,
    price: 999,
  });

  const createCheckOutSession = async () => {
    const stripe = (await stripePromise) as Stripe;
    const checkoutSession = await axios.post("/api/session", {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div style={{
        display: "flex",
        backgroundColor: "black",
        width: "100vw",
        height: "100vh"
    }}>
    <button
      onClick={createCheckOutSession}
      style={{
        height: "100px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"
      }}
    >
      Buy
    </button>
    </div>
  );
}
