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
        <meta name="description" content="Generative AI Fashion Agent" />
        <meta name="author" content="Jay Rank" />

        {/* Google / Search Engine Tags */}
        <meta
          itemProp="name"
          content="Silic.AI: Generative Fashion For Real Clothing"
        />
        <meta itemProp="description" content="Generative AI Fashion Agent" />
        <meta
          itemProp="image"
          content="https://user-images.githubusercontent.com/53647573/235449155-661c2a93-9486-46ce-ad27-e2498aae68a0.png"
        />

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="Silic.AI: Generative Fashion For Real Clothing"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://silic.ai/" />
        <meta property="og:description" content="Generative AI Fashion Agent" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/53647573/235449155-661c2a93-9486-46ce-ad27-e2498aae68a0.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta
          name="twitter:title"
          content="Silic.AI: Generative Fashion For Real Clothing"
        />
        <meta
          name="twitter:description"
          content="Generative AI Fashion Agent"
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
              Generative Fashion For Real Clothing
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
              Design & Order
            </button>
            <Link
              href="/mpl"
              style={{
                padding: "1rem",
                fontSize: "1rem",
                fontFamily: "HelveticcaRegular",
              }}
            >
              Shop Designs
            </Link>
          </div>
        </div>
        <div
          className={styles.indexPageSection}
          style={{ backgroundColor: "hsla(230, 3%, 38%, 0.25)" }}
        >
          <div id={styles.softest} className={styles.SectionHeading}>
            Prompt To Design.
          </div>
          <div className={styles.Section}>
            <div className={styles.SectionData}>
              Explore infinite style options with generative fashion. Create a
              prompt of what you&rsquo;re imagining and press generate. Your
              design will be created by our Ai model and available to purchase
              in under 10 seconds. Try our suggested prompts to find
              inspiration. You&rsquo;ll soon be able to launch an auto-design
              agent with your OpenAi API key.
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
          <div id={styles.softest} className={styles.SectionHeading}>
            Earn Royalties For Every Design Sold
          </div>
          <div
            className={styles.Section}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.SectionData}>
              With Silic, you have the opportunity to eann up to 50% of the
              profits of every design you create. Share a link with friends and
              your creation will be hosted in our marketplace. When someone
              purchases your design you&rsquo;ll get paid when the garment is
              fulfilled.
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
              This is NOT cheap merch. Silic garments are made from ultra soft
              Tencel™ and Modal™ fibers. Our textile blend is specially
              engineered to ensure an amazing fit, extreme comfort and
              longevity. We use Direct to Garment digital printing methods to
              guarantee robust print quality and a harmonious feel. Experience
              designer quality clothing at an affordable price.
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
