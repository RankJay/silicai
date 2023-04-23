import store from "@/store";
import styles from "@/styles/likebutton.module.css";
import Image from "next/image";
import { useSnapshot } from "valtio";

const LikeButton = () => {
  const snap = useSnapshot(store);
  return (
    <div className={styles.container}>
      <button
        className={styles.likeButton}
        onClick={() => {store.isLiked = snap.isLiked ? false : true; store.isDisliked = false}}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="128.000000pt"
          height="128.000000pt"
          viewBox="0 0 128.000000 128.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
            fill={snap.isLiked? "#0276fa": "#ffffff"}
            stroke="none"
          >
            <path
              d="M637 1226 c-22 -22 -37 -79 -37 -141 -1 -87 -48 -165 -152 -249 l-48
-40 0 -328 0 -329 43 -18 c121 -52 350 -86 530 -79 93 3 108 6 145 31 75 49
87 80 127 305 19 112 35 213 35 225 0 73 -51 152 -121 188 -33 16 -59 19 -189
19 -82 0 -150 2 -150 5 0 2 7 30 15 62 23 87 20 207 -6 261 -37 75 -152 128
-192 88z"
            />
            <path
              d="M29 821 l-29 -29 0 -332 c0 -366 2 -378 61 -399 41 -14 157 -14 198
0 59 21 61 33 61 399 l0 332 -29 29 c-29 28 -32 29 -131 29 -99 0 -102 -1
-131 -29z"
            />
          </g>
        </svg>
      </button>
      <button
        style={{ transform: "rotate(180deg)" }}
        className={styles.likeButton}
        onClick={() => {store.isDisliked = snap.isDisliked ? false : true; store.isLiked = false}}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="128.000000pt"
          height="128.000000pt"
          viewBox="0 0 128.000000 128.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
            fill={snap.isDisliked? "#0276fa": "#ffffff"}
            stroke="none"
          >
            <path
              d="M637 1226 c-22 -22 -37 -79 -37 -141 -1 -87 -48 -165 -152 -249 l-48
-40 0 -328 0 -329 43 -18 c121 -52 350 -86 530 -79 93 3 108 6 145 31 75 49
87 80 127 305 19 112 35 213 35 225 0 73 -51 152 -121 188 -33 16 -59 19 -189
19 -82 0 -150 2 -150 5 0 2 7 30 15 62 23 87 20 207 -6 261 -37 75 -152 128
-192 88z"
            />
            <path
              d="M29 821 l-29 -29 0 -332 c0 -366 2 -378 61 -399 41 -14 157 -14 198
0 59 21 61 33 61 399 l0 332 -29 29 c-29 28 -32 29 -131 29 -99 0 -102 -1
-131 -29z"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default LikeButton;
