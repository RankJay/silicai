import store from "@/store";
import styles1 from "@/styles/marketplace.buy.module.css";
import { useSnapshot } from "valtio";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
const stripePromise = loadStripe(
  "pk_live_51MyTmmJr18hT8NbDwyQ6XvlIOx7HHWjvh6rIQKLxNBEGTSCY2CFT06ntzkJvgma26i2JDIT9Rxytap396YiclEsW00IpxqY6HK"
);

const BuyButton = () => {
  window.onclick = function (event) {
    var modal = document.getElementById("id01");
    if (event.target == modal) {
      setIsCheckoutModalOpen(false);
    }
  };
  const snap = useSnapshot(store);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  // const [item, setItem] = useState({
  //   name: "T-shirt Design",
  //   description: "AI-generated t-shirt texture",
  //   image: 'https://0.png',
  //   quantity: 1,
  //   price: 50,
  // });

  function getClientReferenceId (): string {
    return window.Rewardful && window.Rewardful.referral || ('checkout_'+(new Date).getTime());
  }

  const createCheckOutSession = async () => {
    const stripe = (await stripePromise) as Stripe;
    var event1 = document.getElementById("size") as HTMLSelectElement;
    var event2 = document.getElementById("style") as HTMLSelectElement;
    var butt = document.getElementById("checkoutstripe") as HTMLDivElement;
    butt.style.pointerEvents = 'none';
    butt.innerText = "Loading..."
    butt.style.color = "#888888"
    // setItem({
    //   name: "T-shirt Design",
    //   description: "AI-generated t-shirt texture",
    //   image: snap.checkoutURL,
    //   quantity: 1,
    //   price: 50,
    // });
    const checkoutSession = await axios.post("/api/session", {
      item: {
        name: "Silic T-Shirts",
        description: "AI-generated T-Shirt",
        image: snap.checkoutURL,
        imageId: "TBA",
        quantity: 1,
        price: 1,
        metadata: {
          size: event1.value,
          style: event2.value,
        },
        referral: getClientReferenceId(),
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      window.alert(result.error.message);
    }
    butt.style.pointerEvents = 'all';
    setIsCheckoutModalOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsCheckoutModalOpen((prevState) => !prevState);
  };

  const checkoutModalContent = (
    <div className={styles1.checkoutModal} id="id01">
      <div className={styles1.modalContainer}>
        <div className={styles1.modalHeading}>Choose Your General Size</div>
        <form id={styles1.checkoutForm}>
          <label
            htmlFor="size"
            style={{
              color: "black",
              fontFamily: "HelveticcaBold",
              margin: "0px",
              marginRight: "1rem",
            }}
          >
            Size:
          </label>
          <select id="size" className={styles1.size} name="size">
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <label
            htmlFor="style"
            style={{
              color: "black",
              fontFamily: "HelveticcaBold",
              margin: "0px",
              marginRight: "1rem",
            }}
          >
            Style:
          </label>
          <select id="style" className={styles1.size} name="style">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="UNISEX">UNISEX</option>
          </select>
        </form>
        <div
          className={styles1.sizeChart}
          style={{ backgroundSize: "cover", backgroundImage: `url('${store.imageURI}')` }}
        >
        </div>
        <div
          id="checkoutstripe"
          className={styles1.checkoutToStripeButton}
          onClick={createCheckOutSession}
        >
          Checkout
        </div>
        <div className={styles1.modalFooter}>
          Silic Garments are meant to fit eveybody. We will check back later on
          you for your sizing before shipping.
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles1.buyButton} onClick={handleDropdownToggle}>
        Buy Now
      </div>
      {isCheckoutModalOpen && checkoutModalContent}
    </>
  );
};

export default BuyButton;
