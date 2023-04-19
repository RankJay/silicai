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
        onClick={() => (store.isLiked = snap.isLiked ? false : true)}
      >
        <Image
          src={snap.isLiked ? "/assets/liked.png" : "/assets/like.png"}
          width={24}
          height={24}
          alt={"like"}
        />
      </button>
      <button
      style={{paddingTop: "0.85rem"}}
        className={styles.likeButton}
        onClick={() => (store.isDisliked = snap.isDisliked ? false : true)}
      >
        <Image
          src={snap.isDisliked ? "/assets/disliked.png" : "/assets/dislike.png"}
          width={24}
          height={24}
          alt={"like"}
        />
      </button>
    </div>
  );
};

export default LikeButton;
