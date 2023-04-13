import { GetServerSideProps } from "next";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import styles from "@/styles/gallery.module.css";
import { supabaseStore } from "@/store";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Loader from "./components/Loader";

export default function Home() {
  const [data, setData] = useState<{
    isLoading: boolean;
    items:
      | {
          [x: string]: any;
        }[]
      | null;
  }>({
    isLoading: true,
    items: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabaseStore.from("inventory").select("*");

    if (error || !data) {
      console.error("Error fetching data:", error);
    }
    setData({
      isLoading: false,
      items: data,
    });
  };
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
          {data.isLoading ? <Loader /> : (
            <>
              {data.items?.map((image) => (
                <div key={image.id} className={styles.card}>
                  <Link href={`/design/${image.id}`}>
                    <Image
                      src={image.image}
                      width={50}
                      height={50}
                      alt={image.id}
                    />
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
