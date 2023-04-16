import { useState, useEffect, useRef } from "react";
import styles from "../../styles/suggestions.module.css";
import { useSnapshot } from "valtio";
import store from "@/store";

interface Suggestion {
  id: number;
  text: string;
}

const Suggestions = () => {
  const snap = useSnapshot(store);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      const fetchSuggestions = async () => {
        const res = await fetch("/api/suggestions");
        const data: { data: Suggestion[] } = await res.json();
        console.log(data);
        setSuggestions(data.data);
        setLoading(false);
      };
      fetchSuggestions();
    }
  }, [isModalOpen]);

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
        {isModalOpen ? "Close" : "Need prompts?"}
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
          {suggestions && !snap.isGenerating && (
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
        </div>
      )}
    </div>
  );
};

export default Suggestions;
