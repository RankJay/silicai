import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   var prevScrollpos = window.pageYOffset;
  //   window.onscroll = function () {
  //     var currentScrollPos = window.pageYOffset;
  //     if (prevScrollpos > currentScrollPos) {
  //       (document.getElementById("headerContainer") as HTMLElement).style.top =
  //         "0";
  //     } else {
  //       (document.getElementById("headerContainer") as HTMLElement).style.top =
  //         "-1rem";
  //     }
  //     prevScrollpos = currentScrollPos;
  //   };
  // });

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
          content="Generativ AI Fashion Agent"
        />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Silic AI" />
        <meta
          itemProp="description"
          content="Generativ AI Fashion Agent"
        />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/235407380-d229d5f6-2105-4418-b7eb-eb1657c8f717.png"
        />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Silic AI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rankjay.vercel.app/" />
        <meta
          property="og:description"
          content="Generativ AI Fashion Agent"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/53647573/235407380-d229d5f6-2105-4418-b7eb-eb1657c8f717.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta name="twitter:title" content="Silic AI" />
        <meta
          name="twitter:description"
          content="Generativ AI Fashion Agent"
        />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/53647573/235407380-d229d5f6-2105-4418-b7eb-eb1657c8f717.png"
        />
        <meta name="twitter:creator" content="@RankJay1" />

        <meta name="robots" content="index,follow" />

        <link rel="shortcut icon" href="../f2.ico" />
        {/* <link rel="icon" href="" type="image/svg+xml" /> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="" />
        <link rel="apple-touch-icon" href="" />
      </Head>
      <main>
        <video
          loop={true}
          autoPlay={true}
          playsInline={true}
          muted={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-10",
          }}
        >
          <source src="assets/fd2.mp4" type="video/mp4" />
        </video>
        <div className={styles.indePageLandingSection}>
          {/* <Banner inputText="First 1 Million Sign-ups, Lifetime Free Subscription!" /> */}
          <div>
            <div className={styles.indexPageHeading}>SILIC</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className={styles.indexPageSubHeading}>
              Self-Generative Fashion Agent
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
          </div>
          {/* <Link href="/gallery" style={{
            padding: "1rem",
            fontSize: "1rem",
            fontFamily: "HelveticcaRegular"
          }}>Visit Gallery</Link> */}
        </div>
        <div
          className={styles.indexPageSection}
          style={{ backgroundColor: "hsla(230, 3%, 38%, 0.25)" }}
        >
          <div id={styles.softest} className={styles.SectionHeading}>Get Paid To Prompt Design.</div>
          <div className={styles.Section}>
            <div className={styles.SectionData}>
              Earn $.001 per design you generate. Our suggestions will guide you
              to produce beautiful textile designs. Each design is saved in your
              closet for you to view later. Infinite design possibilities await,
              unlock your creative potential.
            </div>
            <div className={styles.SectionAttachment}>
              <video
                // src="assets/fd1.mp4"
                loop={true}
                autoPlay={true}
                playsInline={true}
                muted={true}
                className={styles.SectionAttachment}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <source src="assets/fd1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        {/* <div className={styles.indexPageOfferingSection}>
          <div className={styles.Offering}>
            <div className={styles.OfferingHeading}>Prompt-to-Design UI<h6>Type in anything you imagine, the possibilites and infinte</h6></div>
            <div className={styles.SectionOfferingAttachment}></div>
          </div>
        </div> */}
        <div className={styles.indexPageSection}>
          <div id={styles.softest} className={styles.SectionHeading}>Earn Royalties $</div>
          <div
            className={styles.Section}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.SectionData}>
              When you create a design, it will be listed in our public
              marketplace and your own store front. If another user buys your
              design, you can earn up to 50% of the profit of the fulfilled
              garment. Our royalty system is just in its infancy. Many paradigm
              shifting updates await.
            </div>
            <div id={styles.pp2} className={styles.SectionAttachment}></div>
          </div>
        </div>
        <div
          className={styles.indexPageSection}
          style={{ backgroundColor: "hsla(230, 3%, 38%, 0.25)" }}
        >
          <div className={styles.SectionHeading}>Manufacturing On-Demand.</div>
          <div className={styles.Section}>
            <div className={styles.SectionData}>
              Each garment is made-to-order, tailored to fit every customer
              comfortably. Using state of the are digital printing infastrucutre
              we ensure designer grade quality in every garment. Experience true
              mass customization and with the highest degree of craftsmanship.
            </div>
            <div id={styles.printer} className={styles.SectionAttachment}></div>
          </div>
        </div>
        <div className={styles.indexPageSection}>
          <div id={styles.softest} className={styles.SectionHeading}>
            The Softest Shirt You&rsquo;ll Ever Own.
          </div>
          <div
            className={styles.Section}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.SectionData}>
              This is not cheap merch. Unlike other on demand printing services,
              we don&rsquo;t use low quality stock fabric or blank shirts to
              print on. The SILIC garment will be the softest fabric
              you&rsquo;ve ever owned. We mill our own textiles from highest
              grade natural fibers and yarn with state of the art knitting
              machines. Embrace designer fashion at affordable prices.
            </div>
            <div id={styles.fabric} className={styles.SectionAttachment}></div>
          </div>
        </div>
        <div
          className={styles.indexPageSection}
          style={{ backgroundColor: "hsla(230, 3%, 38%, 0.25)" }}
        >
          <div className={styles.SectionHeading}>Sentient Intelligence.</div>
          <div className={styles.Section}>
            <div className={styles.SectionData}>
              Silic stands for: Self-driven Intelligence for Limitless
              Innovation in Composite-materials. We&rsquo;re working on our own
              ai model that we believe will change the trajectory many
              industries. Read our white paper to learn more.
            </div>
            <div id={styles.pp3} className={styles.SectionAttachment}></div>
          </div>
        </div>
        <div className={styles.indexPageSection}>
          <div className={styles.SectionHeading}>A Global Marketplace.</div>
          <div
            className={styles.Section}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.SectionData}>
              Browse and search designs made by any Silic community member.
              We&rsquo;ll soon provide you with custom link to your own
              storefront, empowering you to sell the designs you create.
            </div>
            <div id={styles.pp4} className={styles.SectionAttachment}></div>
          </div>
        </div>
        <div className={styles.indexPageFAQSection}>
          <div
            className={styles.OfferingHeading}
            style={{ textAlign: "center" }}
          >
            FAQs
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            color: "#555",
            fontFamily: "HelveticcaBold",
            height: "5rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p>Ⓒ Copyrights since 2023. All Rights Reserved.</p>
          <Link href={"/terms"}>
            <u>Terms of Service</u>
          </Link>
        </div>
      </main>
    </>
  );
}
