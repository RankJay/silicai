import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleImagineClick = () => {
    router.push("/new");
  }
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
        <div className={styles.indePageLandingSection}>
          <div className={styles.indexPageHeading}>SILIC</div>
          <div className={styles.indexPageSubHeading}></div>
          <button
          type="submit"
          className={styles.signUpButton}
          id="signUpButton"
          onClick={handleImagineClick}
          style={{
            height: "50px"
          }}
        >
          Get Started
        </button>
        </div>
      </main>
    </>
  );
}
