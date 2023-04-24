import Head from "next/head";
import styles from "@/styles/about.module.css";

export default function About() {
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

        <title>Silic AI : About</title>
        <meta
          name="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Silic AI : About" />
        <meta
          itemProp="description"
          content="Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints"
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/209462309-c5c2f8ad-3765-4059-8078-afcd569dd677.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Silic AI : About" />
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
        <meta name="twitter:title" content="Silic AI : About" />
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
        <div className={styles.aboutPageContainer}>
          <div className={styles.aboutPageHeading}>About Silic AI</div>
          <div className={styles.aboutPageSubHeading}>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
