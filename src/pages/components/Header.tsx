import { UserButton, useUser } from "@clerk/nextjs";
import styles from "../../styles/header.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Header: NextPage = () => {
  const router = useRouter();
  const handleImagineClick = () => {
    router.push("/new");
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div style={{ marginLeft: "1%" }}>SILIC AI</div>
        <div style={{ fontFamily: "HelveticcaRegular" }}>
          {/* <Link href="/gallery">Gallery</Link> */}
        </div>
        <button className={styles.logInButton} onClick={handleImagineClick}>Get Started</button>
      </div>
    </div>
  );
};

export default Header;
