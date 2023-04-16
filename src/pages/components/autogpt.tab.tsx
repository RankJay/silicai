import { useState, useEffect, useRef } from "react";
import styles from "../../styles/autogpt.module.css";
import { useSnapshot } from "valtio";
import store from "@/store";

interface Suggestion {
  id: number;
  text: string;
}

const AutoGPT = () => {
  const snap = useSnapshot(store);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSuggestionClick = (text: string) => {
    const textbox = document.getElementById("prompt") as HTMLInputElement;
    textbox.value += text;
  };

  return (
    <div className={styles.suggestionsModalSection}>
      <div
        className={styles.suggestionsFooter}
        onClick={() => (isModalOpen ? setModalOpen(false) : setModalOpen(true))}
      >
        {isModalOpen ? "Close" : "Auto Designer"}
      </div>
      {!snap.isGenerating && isModalOpen && (
        <div className={styles.suggestionsModal}>
          {/* <div className={styles.suggestionsModalHeading}>Suggestions</div> */}
          {loading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                color: "white",
                fontSize: "1.25rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Loading...
            </div>
          )}
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
        </div>
      )}
    </div>
  );
};

export default AutoGPT;
