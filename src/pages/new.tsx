import BetterShirtModel from "./components/BetterShirtModel";
import FileUpload from "./components/FileUpload";
import PromptBar from "./components/PromptBar";
import styles from "@/styles/new.module.css";
import Suggestions from "./components/suggestions.tab";
import AutoGPT from "./components/autogpt.tab";
import PromptTab from "./components/PromptTab";

export default function New() {
  return (
    <>
      <div className={styles.newPageLandingSection}>
        {/* <UserButton /> */}
        <FileUpload />
        <BetterShirtModel position={[0, 0, 2.5]} fov={25} />
        <PromptBar />
      </div>
      {/* <Suggestions /> */}
      <PromptTab />
    </>
  );
}