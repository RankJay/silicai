import { useState, useEffect, useRef } from "react";
import styles from "../../styles/prompttab.module.css";
import { useSnapshot } from "valtio";
import store from "@/store";

interface Suggestion {
  id: number;
  text: string;
}

const PromptTab = () => {
  const snap = useSnapshot(store);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (snap.isModalOpen) {
      const fetchSuggestions = async () => {
        const res = await fetch("/api/suggestions");
        const data: { data: Suggestion[] } = await res.json();
        console.log(data);
        setSuggestions(data.data);
        setLoading(false);
      };
      fetchSuggestions();
    }
  }, [snap.isModalOpen]);

  const handleSuggestionClick = (text: string) => {
    const textbox = document.getElementById("prompt") as HTMLInputElement;
    textbox.value += " " + text;
    textbox.focus();
  };

  return (
    <div className={styles.suggestionsModalSection}>
      <div
        className={styles.suggestionsFooter}
        onClick={() =>
          snap.isModalOpen
            ? (store.isModalOpen = false, store.isSuggestionsModalOpen = false, store.isAutoGPTModalOpen = false)
            : (store.isModalOpen = true)
        }
      >
        {snap.isModalOpen ? (
          "Close"
        ) : (
          <div className={styles.promptTabs}>
            <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#555",
              borderRadius: "0 0 0 0.75rem",
              paddingBottom: "1rem",
              borderRight: "0.5px solid #999",
              justifyContent: "flex-end",

            }}
              onClick={() => {
                store.isModalOpen = true;
                store.isSuggestionsModalOpen = true;
              }}
            >
              Suggestions
            </div>
            <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "#555",
              borderRadius: "0 0 0.75rem 0",
              paddingBottom: "1rem",
              borderLeft: "0.5px solid #999",
              justifyContent: "flex-end"
            }}
              onClick={() => {
                store.isModalOpen = true;
                store.isAutoGPTModalOpen = true;
              }}
            >
              Auto Design Agent
            </div>
          </div>
        )}
      </div>
      {!snap.isGenerating && snap.isModalOpen && (
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
          {snap.isSuggestionsModalOpen && suggestions && !snap.isGenerating && (
            <div className={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={styles.suggestionBox}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  {suggestion.text}
                </div>
              ))}
            </div>
          )}
          {snap.isAutoGPTModalOpen && (
            <div className={styles.autoGPT}>
              <form
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
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
          )}
        </div>
      )}
    </div>
  );
};

export default PromptTab;
