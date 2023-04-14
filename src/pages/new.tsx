import BetterShirtModel from "./components/BetterShirtModel";
import PromptBar from "./components/PromptBar";
import styles from "@/styles/new.module.css";

export default function New() {
  return (
    <>
      <div className={styles.newPageLandingSection}>
        {/* <UserButton /> */}
        <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        <PromptBar />
      </div>
    </>
  );
}
