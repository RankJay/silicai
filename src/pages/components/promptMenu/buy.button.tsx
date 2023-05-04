import store from "@/store";
import styles from "@/styles/buy.module.css";
import { useSnapshot } from "valtio";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
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
    <div className={styles.checkoutModal} id="id01">
      <div className={styles.modalContainer}>
        <div className={styles.modalHeading}>Choose Your General Size</div>
        <form id={styles.checkoutForm}>
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
          <select id="size" className={styles.size} name="size">
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
          <select id="style" className={styles.size} name="style">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="UNISEX">UNISEX</option>
          </select>
        </form>
        <div
          className={styles.sizeChart}
          style={{ backgroundSize: "cover", backgroundImage: `url('${store.imageURI}')` }}
        >
        </div>
        <div
          id="checkoutstripe"
          className={styles.checkoutToStripeButton}
          onClick={createCheckOutSession}
        >
          Checkout
        </div>
        <div className={styles.modalFooter}>
          Silic Garments are meant to fit eveybody. We will check back later on
          you for your sizing before shipping.
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <button className={styles.buyButton} onClick={handleDropdownToggle}>
        Buy
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g id="surface1">
            <path
              fill="#fff"
              d="M 0.753906 1.03125 C 0.355469 1.125 0.0507812 1.492188 0.0078125 1.925781 C -0.0195312 2.234375 0.160156 2.605469 0.429688 2.792969 C 0.617188 2.925781 0.640625 2.929688 1.355469 2.953125 L 2.085938 2.976562 L 2.101562 3.09375 C 2.105469 3.160156 2.363281 6.039062 2.671875 9.492188 C 3.078125 14.023438 3.261719 15.875 3.328125 16.140625 C 3.496094 16.820312 3.933594 17.554688 4.421875 17.980469 L 4.632812 18.164062 L 4.445312 18.46875 C 4.164062 18.941406 4.027344 19.429688 4.027344 19.992188 C 4.027344 20.859375 4.289062 21.492188 4.898438 22.101562 C 5.59375 22.796875 6.441406 23.09375 7.367188 22.96875 C 8.546875 22.808594 9.5 22 9.851562 20.859375 C 9.984375 20.421875 10 19.679688 9.882812 19.257812 L 9.804688 18.984375 L 12.5 18.984375 C 15.042969 18.984375 15.191406 18.988281 15.167969 19.0625 C 14.996094 19.664062 14.984375 20.339844 15.140625 20.835938 C 15.308594 21.371094 15.507812 21.695312 15.914062 22.105469 C 16.21875 22.414062 16.375 22.523438 16.691406 22.679688 C 17.199219 22.917969 17.5 22.988281 18.023438 22.984375 C 19.335938 22.972656 20.476562 22.132812 20.859375 20.882812 C 21.28125 19.496094 20.632812 17.984375 19.335938 17.339844 C 18.695312 17.023438 19.15625 17.042969 12.539062 17.015625 L 6.539062 16.992188 L 6.265625 16.867188 C 5.96875 16.726562 5.546875 16.351562 5.414062 16.101562 C 5.363281 16.011719 5.335938 15.933594 5.34375 15.921875 C 5.359375 15.914062 8.902344 15.703125 13.21875 15.449219 C 17.535156 15.195312 21.160156 14.972656 21.261719 14.945312 C 21.488281 14.890625 21.769531 14.675781 21.867188 14.484375 C 21.957031 14.3125 24 6.136719 24 5.953125 C 24 5.625 23.746094 5.257812 23.414062 5.105469 C 23.230469 5.019531 22.875 5.015625 13.75 5.015625 C 8.53125 5.015625 4.265625 5.011719 4.261719 5 C 4.261719 4.996094 4.1875 4.25 4.101562 3.34375 C 3.964844 1.878906 3.9375 1.671875 3.839844 1.503906 C 3.71875 1.28125 3.453125 1.085938 3.203125 1.027344 C 2.980469 0.976562 0.976562 0.980469 0.753906 1.03125 Z M 0.753906 1.03125 "
            />
          </g>
        </svg> */}
      </button>
      {isCheckoutModalOpen && checkoutModalContent}
    </div>
  );
};

export default BuyButton;
