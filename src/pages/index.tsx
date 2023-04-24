import Head from "next/head";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        (document.getElementById("headerContainer") as HTMLElement).style.top =
          "0";
      } else {
        (document.getElementById("headerContainer") as HTMLElement).style.top =
          "-1rem";
      }
      prevScrollpos = currentScrollPos;
    };
  });

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

        <link rel="shortcut icon" href="../f2.ico" />
        {/* <link rel="icon" href="" type="image/svg+xml" /> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="" />
        <link rel="apple-touch-icon" href="" />
      </Head>
      <main>
        <video
          ref={videoRef}
          src="valo.mp4"
          width="250"
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-10",
          }}
        ></video>
        <div className={styles.indePageLandingSection}>
          {/* <Banner inputText="First 1 Million Sign-ups, Lifetime Free Subscription!" /> */}
          <div className={styles.indexPageHeading}>SILIC</div>
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
          {/* <Link href="/gallery" style={{
            padding: "1rem",
            fontSize: "1rem",
            fontFamily: "HelveticcaRegular"
          }}>Visit Gallery</Link> */}
        </div>
        <div className={styles.indexPageHowSection}>
          <div className={styles.HowSection}>
            <div className={styles.HowHeading}>Prompt-Driven Design.</div>
            <ul>
              <li>Begin with a prompt, infinite design possibilies await.</li>
              <li>
                Our suggestioned guide you to produce beautiful generative
                textile designs.{" "}
              </li>
              <li>Unlock your creative potential.</li>
              <li>
                {" "}
                Each design is saved in your closet for you to view later.
              </li>
              {/* <li>Earn Rewards & Royalties</li>
              <li>On-demand Manufacturing & Shipping</li>
              <li>Quality of clothing/fabric</li> */}
            </ul>
          </div>
          <div className={styles.SectionAttachment}></div>
        </div>
        {/* <div className={styles.indexPageOfferingSection}>
          <div className={styles.Offering}>
            <div className={styles.OfferingHeading}>Prompt-to-Design UI<h6>Type in anything you imagine, the possibilites and infinte</h6></div>
            <div className={styles.SectionOfferingAttachment}></div>
          </div>
        </div> */}
        <div className={styles.indexPageOfferingSection}>
          <div
            className={styles.Offering}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.OfferingHeading}>
              <div>Earn Rewards & Royalties</div>
              <div className={styles.OfferingSubHeading}>
                <ul>
                  <li>
                    Create a design, and earn up to 50% profit share when other
                    users purchase it.
                  </li>
                  <li>
                    When you create a design, it is showcased in our public
                    marketplace allowing it to be discoved and ordered.
                  </li>
                  <li>
                    Each design you create is unquiely labled as your creation.
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.SectionOfferingAttachment}></div>
          </div>
        </div>
        <div className={styles.indexPageOfferingSection}>
          <div className={styles.Offering}>
            <div className={styles.OfferingHeading}>
              <div>Manufacturing On-Demand</div>
              <div className={styles.OfferingSubHeading}>
                <ul>
                  <li>
                    Each garment is made-to-order, tailored to fit every
                    customer comfortably.
                  </li>
                  <li>
                    Using state of the are digital printing infastrucutre we
                    ensure designer grade quality in every garment.
                  </li>
                  <li>
                    Experience true mass customization and with the highest
                    degree of craftsmanship.
                  </li>
                </ul>
              </div>
            </div>
            <div
              id={styles.printer}
              className={styles.SectionOfferingAttachment}
            ></div>
          </div>
        </div>
        <div className={styles.indexPageOfferingSection}>
          <div
            className={styles.Offering}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.OfferingHeading}>
              <div>Silic Garments</div>
              <div className={styles.OfferingSubHeading}>
                <ul>
                  <li>
                    This is not mass-produced merch; we mill our own high-end
                    fabric, avoiding stock or blanks.
                  </li>
                  <li>
                    {" "}
                    Our garments are produced with the same attention to detail
                    as top-tier fashion designers, ensuring luxurious textiles
                    and lasting quality for discerning clients.
                  </li>
                  <li>Embrace the artistry of superior fashion design.</li>
                </ul>
              </div>
            </div>
            <div
              id={styles.fabric}
              className={styles.SectionOfferingAttachment}
            ></div>
          </div>
        </div>
        <div className={styles.indexPageOfferingSection}>
          <div className={styles.Offering}>
            <div className={styles.OfferingHeading}>
              <div>Intelligence</div>
              <div className={styles.OfferingSubHeading}>
                <ul>
                  <li>
                    The more you use SILIC the better our Ai will understand
                    you.
                  </li>
                  <li>
                    Designs you&#39;re likely to desire will be suggested to you
                    in the future.
                  </li>
                  <li>
                    Soon you can deploy your own AutoGPT designer that can
                    automate your creations and suggest them to customers.
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.SectionOfferingAttachment}></div>
          </div>
        </div>
        <div className={styles.indexPageOfferingSection}>
          <div
            className={styles.Offering}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className={styles.OfferingHeading}>
              <div>Marketplace</div>
              <div className={styles.OfferingSubHeading}>
                <ul>
                  <li>
                    Browse and search designs made by any Silic community
                    member.
                  </li>
                  <li>
                    We&rsquo;ll soon provide you with custom link to your own
                    storefront, empowering you to sell the designs you create.
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.SectionOfferingAttachment}></div>
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
      </main>
    </>
  );
}
