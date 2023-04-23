import { useState } from "react";
import styles from "@/styles/autogpt.module.css";
import { useSnapshot } from "valtio";
import store from "@/store";

interface Suggestion {
  id: number;
  text: string;
}

const AutoGPT = () => {
  const snap = useSnapshot(store);

  const handleSuggestionClick = (text: string) => {
    const textbox = document.getElementById("prompt") as HTMLInputElement;
    textbox.value += text;
  };

  return (
    <div className={styles.suggestionsModalSection}>
      <div
        className={styles.suggestionsFooter}
        onClick={() => (snap.isModalOpen ? store : {})}
      >
        {snap.isModalOpen && snap.isAutoGPTModalOpen ? "Close" : "Auto Designer"}
      </div>
      {!snap.isGenerating && snap.isModalOpen && (
        <div className={styles.suggestionsModal}>
          {/* <div className={styles.suggestionsModalHeading}>Suggestions</div> */}
          <div className={styles.autoGPT}>
            <form style={{ flexDirection: "column", justifyContent: "flex-start" }}>
              {/* <div> */}
              <label>Prompt</label>
              <input
                id="prompt"
                type="text"
                className={styles.signUpInput}
                style={{
                  fontFamily: "HelveticcaRegular",
                  width: "100%",
                }}
                name="prompt"
                placeholder="What kind of cotour you like?"
                required
              />
              <label>API Key</label>
              <input
                id="prompt"
                type="text"
                className={styles.signUpInput}
                style={{
                  fontFamily: "HelveticcaRegular",
                  width: "100%",
                }}
                name="prompt"
                placeholder="OpenAI Secret Key"
                required
              />
              {/* </div> */}
              {/* <div className={styles.autoGPTFooter}>
                Have AI design you next cotour.
                <button
                  type="submit"
                  // onSubmit={handleSuggestionClick}
                  className={styles.signUpButton}
                  id="signUpButton"
                  style={{
                    fontFamily: "HelveticcaRegular",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  Launch Agent
                </button>
              </div> */}
            </form>
          </div>
        </div>)}
    </div>
  );
};

export default AutoGPT;
