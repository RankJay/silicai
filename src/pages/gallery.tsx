import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "@/styles/gallery.module.css";
import { supabaseStore } from "@/store";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Loader from "@/pages/components/common/Loader";

interface InventoryObjects {
  image_id: string;
  created_at: string;
  user_id: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://silicai-server-jrg2.zeet-silicai.zeet.app/api/inventory/`
  );
  const data: InventoryObjects[] = await res.json();

  return {
    props: {
      data: data,
    },
  };
};

export default function Gallery({ data }: { data: InventoryObjects[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchImageData = async (imageId: string) => {
      const response = await supabaseStore.storage
        .from("silicai-bucket")
        .download(`${process.env.NODE_ENV}/${imageId}.png`);
      console.log(imageId, response);
      const blob = response.data as Blob;
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      setImageData((prevState) => ({ ...prevState, [imageId]: dataUrl }));
    };

    const fetchAllImageData = async () => {
      for (const image of data) {
        fetchImageData(image.image_id);
      }
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

        <title>Silic AI : Gallery</title>
        <meta
          name="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Silic AI : Gallery" />
        <meta
          itemProp="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Silic AI : Gallery" />
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
        <meta name="twitter:title" content="Silic AI : Gallery" />
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

        <link rel="shortcut icon" href="../favicon.ico" />
        {/* <link rel="icon" href="" type="image/svg+xml" /> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="" />
        <link rel="apple-touch-icon" href="" />
      </Head>
      <div className={styles.container}>
        <div className={styles.galleryPageHeading}>Image Gallery</div>
        <div className={styles.galleryPageSubHeading}>
          Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite
          Creativity and Unique Patterns for Stunning Prints
        </div>
        <div className={styles.grid}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data?.map((image) => (
                <div key={image.image_id} className={styles.card}>
                  <Link href={`/design/${image.image_id}`}>
                    {imageData[image.image_id] ? (
                      <Image
                        src={imageData[image.image_id]}
                        width={50}
                        height={50}
                        alt={image.image_id}
                      />
                    ) : (
                      <div className={styles.card} style={{backgroundColor: "#aaa", width: "285px", padding: "0.5rem", height:"300px"}}></div>
                    )}
                  </Link>
                  {/* <h3>{image.title}</h3> */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
