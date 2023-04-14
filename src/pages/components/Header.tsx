import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/header.module.css";

const Header: NextPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  
  const handleImagineClick = () => {
    if (router) {
      router.push("/new");
    }
  }

  const loggedInContent = isSignedIn ? <div className={styles.headerChild}><UserButton /></div> : null;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerChild}></div>
        <div className={styles.headerChild} style={{fontSize: "30px"}}>SILIC</div>
        {/* <div className={styles.link}> */}
          {/* <Link href="/gallery">Gallery</Link> */}
        {/* </div> */}
        {!isSignedIn && (
          <button className={`${styles.headerChild} ${styles.logInButton}`} onClick={handleImagineClick}>
            Sign In
          </button>
        )}
        {loggedInContent}
      </div>
    </div>
  );
};

export default Header;
