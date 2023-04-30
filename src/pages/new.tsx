import BetterShirtModel from "./components/model/BetterShirtModel";
import PromptBar from "./components/promptMenu/PromptBar";
import styles from "@/styles/new.module.css";
import PromptTab from "./components/promptMenu/PromptTab";
import LikeButton from "./components/promptMenu/like.button";
import Head from "next/head";
import BuyButton from "./components/promptMenu/buy.button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShareButton from "./components/promptMenu/share.button";

export default function New() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  useEffect(() => {
    const { status } = router.query;
    if (status === "success") {
      setShowSuccessModal(true);
      setTransactionStatus("success");
    }
    setTimeout(() => {
      setShowSuccessModal(false);
      setTransactionStatus(null);
    }, 2500);
  }, [router.query]);

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

        <title>Silic AI : Designer</title>
        <meta
          name="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Silic AI : Designer" />
        <meta
          itemProp="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Silic AI : Designer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rankjay.vercel.app/" />
        <meta
          property="og:description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="Silic AI : Designer" />
        <meta
          name="twitter:description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />
        <meta name="twitter:creator" content="@RankJay1" />

        <meta name="robots" content="index,follow" />

        <link rel="shortcut icon" href="../f2.ico" />
        {/* <link rel="icon" href="" type="image/svg+xml" /> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="" />
        <link rel="apple-touch-icon" href="" />
      </Head>
      <div className={styles.newPageLandingSection}>
        {/* <UserButton /> */}
        <ShareButton />
        <BuyButton />
        <LikeButton />
        <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        <PromptBar />
      </div>
      {/* <Suggestions /> */}
      <PromptTab />
      {showSuccessModal && (
        <div className={styles.successModal}>
          <div className={styles.successModalContent}>
            <div
              className={styles.close}
              onClick={() => setShowSuccessModal(false)}
            >
              &times;
            </div>
            <div>
              {transactionStatus === "success"
                ? "Thank you for your pre-order! Please check your email for confirmation."
                : "Transaction unsuccessful."}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
