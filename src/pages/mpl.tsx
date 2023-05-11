import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "@/styles/gallery.module.css";
import store, { supabaseStore } from "@/store";
import { useState, useEffect } from "react";
import Head from "next/head";
import BetterShirtModel from "./components/model/BetterShirtModel";
import axios from "axios";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import styles1 from "@/styles/marketplace.buy.module.css";
import { useSnapshot } from "valtio";

interface InventoryObjects {
  image_id: string;
  created_at: string;
  user_id: string;
}

const stripePromise = loadStripe(
  "pk_live_51MyTmmJr18hT8NbDwyQ6XvlIOx7HHWjvh6rIQKLxNBEGTSCY2CFT06ntzkJvgma26i2JDIT9Rxytap396YiclEsW00IpxqY6HK"
);

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/`
  );
  const data: InventoryObjects[] = await res.json();

  const filteredObjects = data.filter(
    (obj: InventoryObjects) => obj.image_id.startsWith("08ec7af1-a391-4595-8b9f-b29d4482be")
  );

  return {
    props: {
      data: filteredObjects,
    },
  };
};

export default function Marketplace({ data }: { data: InventoryObjects[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const loadImage = (imageId: string) => {
    store.imageURI = imageData[imageId];
    store.imageId = imageId;
    store.checkoutURL = imageData[imageId];
  };

  useEffect(() => {
    const fetchImageData = async (imageId: string) => {
      const response = supabaseStore.storage
        .from("silicai-bucket")
        .getPublicUrl(`production/${imageId}.png`);
      const blob = response.data.publicUrl;
      setImageData((prevState) => ({ ...prevState, [imageId]: blob }));
    };
    const fetchAllImageData = () => {
      data.map((image) => fetchImageData(image.image_id));
      setIsLoading(false);
    };

    fetchAllImageData();
    window.onclick = function (event) {
      var modal = document.getElementById("id01");
      if (event.target == modal) {
        setIsCheckoutModalOpen(false);
      }
    };
  }, [data]);

  const snap = useSnapshot(store);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  // const [item, setItem] = useState({
  //   name: "T-shirt Design",
  //   description: "AI-generated t-shirt texture",
  //   image: 'https://0.png',
  //   quantity: 1,
  //   price: 50,
  // });

  function getClientReferenceId(): string {
    return (
      (window.Rewardful && window.Rewardful.referral) ||
      "checkout_" + new Date().getTime()
    );
  }

  const createCheckOutSession = async () => {
    const stripe = (await stripePromise) as Stripe;
    var event1 = document.getElementById("size") as HTMLSelectElement;
    var event2 = document.getElementById("style") as HTMLSelectElement;
    var butt = document.getElementById("checkoutstripe") as HTMLDivElement;
    butt.style.pointerEvents = "none";
    butt.innerText = "Loading...";
    butt.style.color = "#888888";
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
        description: "AI-generated T-Shirt. Currently 50% OFF",
        image: snap.checkoutURL,
        imageId: snap.imageId,
        quantity: 1,
        price: 35,
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
    butt.style.pointerEvents = "all";
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
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('${store.imageURI}')`,
          }}
        ></div>
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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="keywords"
          content="AI fashion, fashion trends, fashion technology, AI algorithms, innovative designs"
        />

        <title>Silic AI : Marketplace</title>
        <meta
          name="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta
          itemProp="name"
          content="Silic.AI: Generative Fashion For Real Clothing : Marketplace"
        />
        <meta
          itemProp="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/235449155-661c2a93-9486-46ce-ad27-e2498aae68a0.png"
        />

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="Silic.AI: Generative Fashion For Real Clothing : Marketplace"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://silic.ai/" />
        <meta
          property="og:description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/53647573/235449155-661c2a93-9486-46ce-ad27-e2498aae68a0.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta
          name="twitter:title"
          content="Silic.AI: Generative Fashion For Real Clothing : Marketplace"
        />
        <meta
          name="twitter:description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/53647573/235449155-661c2a93-9486-46ce-ad27-e2498aae68a0.png"
        />
        <meta name="twitter:creator" content="@RankJay1" />

        <meta name="robots" content="index,follow" />

        <link rel="shortcut icon" href="../f2.ico" />
        {/* <link rel="icon" href="" type="image/svg+xml" /> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="" />
        <link rel="apple-touch-icon" href="" />
      </Head>
      <div className={styles.container}>
        {isCheckoutModalOpen && checkoutModalContent}
        <div className={styles.ModalSpace}>
          <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        </div>
        {!isModalOpen && (
          <div className={styles.shopButton} onClick={toggleModal}>
            Shop Designs
          </div>
        )}
        {isModalOpen && (
          <div className={styles.grid}>
            <div className={styles.gridHeader}>
              <div className={styles.backButton} onClick={toggleModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g id="surface1" fill="white">
                    <path d="M 1.296875 5.207031 C 0.816406 5.320312 0.375 5.691406 0.15625 6.164062 C 0.046875 6.402344 0.0234375 6.507812 0.0273438 6.84375 C 0.0273438 7.59375 -0.421875 7.085938 5.617188 13.132812 C 9.257812 16.78125 11.054688 18.546875 11.199219 18.628906 C 11.539062 18.8125 11.9375 18.875 12.296875 18.800781 C 12.453125 18.769531 12.683594 18.6875 12.800781 18.628906 C 12.945312 18.546875 14.742188 16.78125 18.382812 13.132812 C 24.421875 7.085938 23.972656 7.59375 23.972656 6.84375 C 23.972656 6.507812 23.953125 6.402344 23.839844 6.15625 C 23.445312 5.292969 22.398438 4.925781 21.539062 5.351562 C 21.417969 5.414062 19.71875 7.078125 16.679688 10.117188 L 12 14.789062 L 7.320312 10.117188 C 4.265625 7.0625 2.582031 5.414062 2.460938 5.351562 C 2.105469 5.179688 1.664062 5.125 1.296875 5.207031 Z M 1.296875 5.207031 " />
                  </g>
                </svg>
              </div>
              {/* <div className={styles.buyButton}>Buy Now</div> */}
              <div className={styles1.buyButton} onClick={handleDropdownToggle}>
                Buy Now
              </div>
            </div>
            <div className={styles.gridCarousel}>
              {data?.map((image) => (
                <div
                  key={image.image_id}
                  className={styles.card}
                  onClick={() => {
                    loadImage(image.image_id);
                  }}
                >
                  {/* <Link href={`/design/${image.image_id}`}> */}
                  <Image
                    src={imageData[image.image_id]}
                    width={50}
                    height={50}
                    alt={image.image_id}
                  />
                  {/* </Link> */}
                  {/* <h3>{image.title}</h3> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
