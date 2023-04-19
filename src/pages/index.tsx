import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Banner from "./components/common/Banner";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const video = videoRef.current;
      if (!video) {
        return;
      }
      video.play();
    }, 5000);
  }, []);
  const handleImagineClick = () => {
    router.push("/new");
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

        <title>Silic AI</title>
        <meta
          name="description"
          content="Create the most innovative designs using AI."
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Silic AI" />
        <meta
          itemProp="description"
          content="Create the most innovative designs using AI."
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Silic AI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rankjay.vercel.app/" />
        <meta
          property="og:description"
          content="Create the most innovative designs using AI."
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="Silic AI" />
        <meta
          name="twitter:description"
          content="Create the most innovative designs using AI."
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
      <main>
        <video ref={videoRef} src="valo.mp4" width="250" loop muted style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: "-10",
        }}></video>
        <div className={styles.indePageLandingSection}>
        <Banner inputText="First 1 Million Sign-ups, Lifetime Free Subscription!" />
          <div className={styles.indexPageHeading}>SILIC</div>
          <div className={styles.indexPageSubHeading}>
            Self-Generating Fashion Agent
          </div>
          <button
            type="submit"
            className={styles.signUpButton}
            id="signUpButton"
            onClick={handleImagineClick}
            style={{
              height: "50px",
              marginTop: "2rem",
            }}
          >
            Get Started
          </button>
          {/* <Link href="/gallery" style={{
            padding: "1rem",
            fontSize: "1rem",
            fontFamily: "HelveticcaRegular"
          }}>Visit Gallery</Link> */}
        </div>
      </main>
    </>
  );
}
