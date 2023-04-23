import store from "@/store";
import styles from "@/styles/buy.module.css";
import { useSnapshot } from "valtio";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
const stripePromise = loadStripe(
  "pk_test_51MyTmmJr18hT8NbDYGfsuabekj4ZonCii93aKw3leWi7LuUJeYhtcNXAWK0mD9IqVfTSou2BPlNHGfYY4i2Vj6Rn006N3oBuzj"
);

const BuyButton = () => {
  const snap = useSnapshot(store);
  // const [item, setItem] = useState({
  //   name: "T-shirt Design",
  //   description: "AI-generated t-shirt texture",
  //   image: 'https://0.png',
  //   quantity: 1,
  //   price: 50,
  // });

  const createCheckOutSession = async () => {
    console.log(snap.checkoutURL, store.checkoutURL);
    const stripe = (await stripePromise) as Stripe;
    // setItem({
    //   name: "T-shirt Design",
    //   description: "AI-generated t-shirt texture",
    //   image: snap.checkoutURL,
    //   quantity: 1,
    //   price: 50,
    // });
    const checkoutSession = await axios.post("/api/session", {
      item: {
        name: "T-shirt Design",
        description: "AI-generated t-shirt texture",
        image: snap.checkoutURL,
        quantity: 1,
        price: 50,
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.buyButton} onClick={createCheckOutSession}>
        {" "}
        B
      </button>
    </div>
  );
};

export default BuyButton;
