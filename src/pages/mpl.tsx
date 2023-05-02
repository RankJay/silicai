import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "@/styles/gallery.module.css";
import store, { supabaseStore } from "@/store";
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Loader from "@/pages/components/common/Loader";
import BetterShirtModel from "./components/model/BetterShirtModel";

interface InventoryObjects {
  image_id: string;
  created_at: string;
  user_id: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/`
  );
  const data: InventoryObjects[] = await res.json();

  return {
    props: {
      data: data,
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
  };

  useEffect(() => {
    const fetchImageData = async (imageId: string) => {
      const response = await supabaseStore.storage
        .from("silicai-bucket")
        .download(`production/${imageId}.png`);
      const blob = response.data as Blob;
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
  
      setImageData((prevState) => ({ ...prevState, [imageId]: dataUrl }));
    };
    const fetchAllImageData = async () => {
      Promise.all(data.map((image) => fetchImageData(image.image_id)));
      setIsLoading(false);
    };

    fetchAllImageData();
  }, [data]);

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
              <div className={styles.backButton} onClick={toggleModal}></div>
              <div className={styles.buyButton}>Buy Now</div>
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
                      {imageData[image.image_id] ? (
                        <Image
                          src={imageData[image.image_id]}
                          width={50}
                          height={50}
                          alt={image.image_id}
                        />
                      ) : (
                        <div
                          className={styles.card}
                          style={{
                            backgroundColor: "#aaa",
                            width: "50px",
                            padding: "0.5rem",
                            height: "50px",
                          }}
                        ></div>
                      )}
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
