import { useState, useEffect, useRef } from "react";
import styles from "@/styles/prompttab.module.css";
import { useSnapshot } from "valtio";
import store from "@/store";
import Image from "next/image";

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

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageSrc(null);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.imageURI = imageSrc as string;
    setFormSubmitted(true);
    store.isModalOpen = false;
    handleCloseModal();
  };

  return (
    <div className={styles.suggestionsModalSection}>
      <div
        className={styles.suggestionsFooter}
        onClick={() =>
          snap.isModalOpen
            ? ((store.isModalOpen = false),
              (store.isSuggestionsModalOpen = false),
              (store.isFileUploadModalOpen = false),
              (store.isAutoGPTModalOpen = false))
            : (store.isModalOpen = true)
        }
      >
        {snap.isModalOpen ? (
          <div style={{ paddingBottom: "1rem" }}>Close</div>
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
                width: "20%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "#555",
                borderRadius: "0 0 0 0",
                paddingBottom: "1rem",
                borderLeft: "0.5px solid #999",
                borderRight: "0.5px solid #999",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              onClick={() => {
                // store.isModalOpen = true;
                store.isFileUploadModalOpen = true;
              }}
            >
              <Image
                width={24}
                height={24}
                src={"/assets/upload-image.png"}
                alt={""}
                style={{ marginBottom: "-0.15rem" }}
              />
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
                justifyContent: "flex-end",
              }}
              onClick={() => {
                store.isModalOpen = true;
                store.isAutoGPTModalOpen = true;
              }}
            >
              Design Agent
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
          {snap.isFileUploadModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    width={180}
                    height={180}
                    alt="Uploaded Image"
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                    <div style={{fontFamily: "HelveticcaBold", textAlign: "start", fontSize: "2rem"}}>Upload Image</div>
                    <div style={{ fontFamily: "HelveticcaRegular", textAlign: "start", color: "#999", marginTop: "1rem" }}>
                      Upload your midjourney prompts or any image of your choice
                    </div>
                    </div>
                    <input style={{fontSize: "1.25rem"}} type="file" onChange={handleFileUpload} id={styles.customFileInput} name="file-upload" className={styles.customFileInput} />
                    {/* <button onClick={handleCloseModal}>Close</button> */}
                  </div>
                )}
                {imageSrc && (
                  <form
                    onSubmit={handleSubmitForm}
                    style={{ height: "auto", justifyContent: "center", paddingTop: "10px" }}
                  >
                    <button
                      type="submit"
                      style={{ marginRight: "10px", color: "white", backgroundColor: "transparent" }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleCloseModal}
                      style={{ marginLeft: "10px", color: "white", backgroundColor: "transparent" }}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptTab;
