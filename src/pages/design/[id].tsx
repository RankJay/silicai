import BetterShirtModel from "@/pages/components/model/BetterShirtModel";
import styles from "@/styles/design.module.css";
import { GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import store from "@/store";
import BuyButton from "../components/promptMenu/buy.button";
import LikeButton from "../components/promptMenu/like.button";

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
          <LikeButton />
          <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        </div>
      )}
    </>
  );
}
