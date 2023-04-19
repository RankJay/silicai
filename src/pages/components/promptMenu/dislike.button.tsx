import store from "@/store";
import styles from "@/styles/likebutton.module.css";
import Image from "next/image";
import { useSnapshot } from "valtio";

const DislikeButton = () => {
  const snap = useSnapshot(store);
  return (
    <div className={styles.container}>
      <button className={styles.likeButton} onClick={() => store.isDisliked = snap.isDisliked ? false: true}>
      <Image style={{transform: "rotate(180deg)"}} src={ snap.isDisliked ? "/assets/liked.png" : "/assets/like.png"} width={24} height={24} alt={"like"} />
      </button>
    </div>
  );
};

export default DislikeButton;
