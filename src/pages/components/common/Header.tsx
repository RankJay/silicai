import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@/styles/header.module.css";

const Header: NextPage = () => {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const userClosetURL = `/closet/${userId}`
  
  const handleImagineClick = () => {
    if (router) {
      router.push("/new");
    }
  }

  const loggedInContent = isSignedIn ? <div className={styles.headerChild} style={{alignItems: "flex-end"}}><UserButton /></div> : null;

  return (
    <div className={styles.headerContainer} id="headerContainer">
      <div className={styles.header}>
        <div className={styles.headerChild}><Link href={userClosetURL}>Closet</Link></div>
        <div className={styles.headerChild} style={{fontSize: "30px", cursor: "pointer"}} onClick={() => router.push("/")}>SILIC</div>
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
