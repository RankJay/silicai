import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@/styles/header.module.css";
import { useState } from "react";

const Header: NextPage = () => {
  const { isSignedIn, userId } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const userClosetURL = `/closet/${userId}`;

  const handleImagineClick = () => {
    if (router) {
      router.push("/new");
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownItemClick = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <div
        className={styles.dropdownItem}
        onClick={() => handleDropdownItemClick(`/closet/${userId}`)}
      >
        Digital Closet / My Store { /*<div className={styles.bubble}>Coming Soon</div>*/}
      </div>
      <div
        className={styles.dropdownItem}
        onClick={() => handleDropdownItemClick(`/mpl`)}
      >
        Marketplace { /* <div className={styles.bubble}>Coming Soon</div> */ }
      </div>
      <div
        className={styles.dropdownItem}
        onClick={() => handleDropdownItemClick(`/payment/${userId}`)}
      >
        Payments <div className={styles.bubble}>Coming Soon</div>
      </div>
    </div>
  );

  const loggedInContent = isSignedIn ? (
    <div className={styles.headerChild} style={{ alignItems: "flex-end" }}>
      <UserButton />
    </div>
  ) : null;

  return (
    <div className={styles.headerContainer} id="headerContainer">
      <div className={styles.header}>
        <div className={styles.headerChild} onClick={handleDropdownToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            fill="white"
          >
            <g id="surface1">
              <path d="M 1.117188 3.652344 C 0.820312 3.746094 0.453125 3.992188 0.300781 4.203125 C 0.0390625 4.554688 0 4.695312 0 5.296875 C 0 5.804688 0.015625 5.886719 0.113281 6.085938 C 0.273438 6.402344 0.582031 6.695312 0.9375 6.863281 L 1.242188 7.007812 L 11.90625 7.023438 C 23.738281 7.03125 22.824219 7.058594 23.320312 6.726562 C 23.578125 6.546875 23.746094 6.355469 23.902344 6.0625 C 23.984375 5.890625 24 5.785156 24 5.296875 C 24 4.808594 23.984375 4.703125 23.902344 4.53125 C 23.742188 4.222656 23.59375 4.054688 23.328125 3.875 C 22.832031 3.539062 23.742188 3.5625 11.980469 3.566406 C 1.859375 3.566406 1.367188 3.570312 1.117188 3.652344 Z M 1.117188 3.652344 " />
              <path d="M 1.101562 10.363281 C 0.730469 10.480469 0.417969 10.71875 0.203125 11.046875 L 0.0234375 11.3125 L 0.0234375 12.6875 L 0.203125 12.953125 C 0.421875 13.285156 0.730469 13.519531 1.121094 13.640625 C 1.410156 13.734375 1.539062 13.734375 12 13.734375 C 22.460938 13.734375 22.589844 13.734375 22.878906 13.640625 C 23.269531 13.519531 23.578125 13.285156 23.796875 12.953125 L 23.976562 12.6875 L 23.976562 11.3125 L 23.796875 11.046875 C 23.578125 10.714844 23.269531 10.480469 22.878906 10.359375 C 22.589844 10.265625 22.46875 10.265625 11.980469 10.269531 C 1.613281 10.269531 1.378906 10.273438 1.101562 10.363281 Z M 1.101562 10.363281 " />
              <path d="M 1.195312 17.035156 C 0.710938 17.1875 0.320312 17.507812 0.113281 17.914062 C 0.015625 18.113281 0 18.195312 0 18.703125 C 0 19.191406 0.015625 19.296875 0.0976562 19.46875 C 0.328125 19.917969 0.632812 20.179688 1.109375 20.339844 L 1.402344 20.4375 L 11.996094 20.4375 C 22.273438 20.4375 22.59375 20.433594 22.871094 20.347656 C 23.320312 20.207031 23.65625 19.921875 23.882812 19.492188 C 23.992188 19.289062 24 19.214844 24 18.703125 C 24 18.214844 23.984375 18.109375 23.902344 17.9375 C 23.746094 17.644531 23.578125 17.453125 23.320312 17.277344 C 22.824219 16.945312 23.742188 16.96875 11.980469 16.972656 C 3.558594 16.972656 1.34375 16.988281 1.195312 17.035156 Z M 1.195312 17.035156 " />
            </g>
          </svg>
        </div>
        {isDropdownOpen && dropdownContent}
        <div
          className={styles.headerChild}
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          SILIC
        </div>
        {/* <div className={styles.link}> */}
        {/* <Link href="/gallery">Gallery</Link> */}
        {/* </div> */}
        {!isSignedIn && (
          <button
            className={`${styles.headerChild} ${styles.logInButton}`}
            onClick={handleImagineClick}
          >
            Sign In
          </button>
        )}
        {loggedInContent}
      </div>
    </div>
  );
};

export default Header;
