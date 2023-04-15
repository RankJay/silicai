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
    const fetchSuggestions = async () => {
      const res = await fetch("/api/suggestions");
      const data: Suggestion[] = [
        { id: 1, text: "Texture" },
        { id: 2, text: "Color palette" },
        { id: 3, text: "Repeating patterns" },
        { id: 4, text: "Pattern scaling" },
        { id: 5, text: "Layering" },
        { id: 6, text: "Transparency" },
        { id: 7, text: "Gradient" },
        { id: 8, text: "Abstract shapes" },
        { id: 9, text: "Geometric shapes" },
        { id: 10, text: "Organic shapes" },
        { id: 11, text: "Line work" },
        { id: 12, text: "Optical illusions" },
        { id: 13, text: "Motion blur" },
        { id: 14, text: "Depth of field" },
        { id: 15, text: "Noise" },
        { id: 16, text: "Fractals" },
        { id: 17, text: "Symmetry" },
        { id: 18, text: "Asymmetry" },
        { id: 19, text: "Randomization" }
      ]; // await res.json()
      setSuggestions(data);
      setLoading(false);
    };
    fetchSuggestions();
  }, []);

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
