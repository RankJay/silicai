import PromptBar from "./components/PromptBar";
import ShirtModel from "./components/ShirtModel";
import styles from "@/styles/new.module.css";

export default function New() {
  return (
    <>
      <div className={styles.newPageLandingSection}>
        {/* <UserButton /> */}
        <ShirtModel />
        <PromptBar />
      </div>
    </>
  );
}
