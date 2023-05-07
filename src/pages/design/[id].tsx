import BetterShirtModel from "@/pages/components/model/BetterShirtModel";
import styles from "@/styles/design.module.css";
import { GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import store from "@/store";
import BuyButton from "../components/promptMenu/buy.button";
import LikeButton from "../components/promptMenu/like.button";
import ShareButton from "../components/promptMenu/share.button";
import Head from "next/head";

interface InventoryObjects {
  image_id: string;
  created_at: Date;
  prompt: string;
  clerk_id: string;
  replicate_url: string;
}

interface Designs {
  [key: string]: Blob;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/`
  );
  const data: InventoryObjects[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((imageData) => ({
    params: { id: imageData.image_id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const res = await axios.post(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/image`, {
      image_id: params.id,
    }
  );
  const data: InventoryObjects[] = await res.data;
  return { props: { image_data: data[0] } };
};

export default function Generated({ image_data }: { image_data: InventoryObjects }) {
  const [needData, setNeedData] = useState<boolean>(true);
  const [isValidImage, setValidImage] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      const render = await axios.post(`/api/design`, { image_id: image_data.image_id });
      const response = render.data;
      if (!response.image) {
        setValidImage(false);
        setNeedData(false);
        return;
      }
      store.checkoutURL = image_data.replicate_url;
      store.imageURI = `data:image/png;base64,${response.image}`;
      setNeedData(false);
    };
    if (needData) {
      fetchImage();
    }
  }, [image_data, needData]);

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

        <title>Silic AI : Design</title>
        <meta
          name="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta
          itemProp="name"
          content="Silic.AI: Generative Fashion For Real Clothing : Design"
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
          content="Silic.AI: Generative Fashion For Real Clothing : Design"
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
          content="Silic.AI: Generative Fashion For Real Clothing : Design"
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
      {needData && (
        <div className={styles.designPageLandingSection}>
          <div className={styles.notFoundBanner}>Loading...</div>
        </div>
      )}
      {!isValidImage && (
        <div className={styles.designPageLandingSection}>
          <div className={styles.notFoundBanner}>Image Not Found!</div>
        </div>
      )}
      {!needData && isValidImage && (
        <div className={styles.designPageLandingSection}>
          <BuyButton />
          <ShareButton />
          <LikeButton />
          <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        </div>
      )}
    </>
  );
}
