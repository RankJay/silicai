import BetterShirtModel from "./components/model/BetterShirtModel";
import FileUpload from "./components/promptMenu/FileUpload";
import PromptBar from "./components/promptMenu/PromptBar";
import styles from "@/styles/new.module.css";
import PromptTab from "./components/promptMenu/PromptTab";
import LikeButton from "./components/promptMenu/like.button";

export default function New() {
  return (
    <>
      <div className={styles.newPageLandingSection}>
        {/* <UserButton /> */}
        <LikeButton />
        <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        <PromptBar />
      </div>
      {/* <Suggestions /> */}
      <PromptTab />
    </>
  );
}