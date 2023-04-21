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
        // const res = await fetch("/api/suggestions");
        // const data: { data: Suggestion[] } = await res.json();
        // console.log(data);
        setSuggestions([
          { id: 1, text: "Abstract" },
          { id: 2, text: "Geometric" },
          { id: 3, text: "Floral" },
          { id: 4, text: "Art Nouveau" },
          { id: 5, text: "Paisley" },
          { id: 6, text: "Minimalist" },
          { id: 7, text: "Tribal" },
          { id: 8, text: "Ethnic" },
          { id: 9, text: "Art Nouveau" },
          { id: 10, text: "Minimalist" },
          { id: 11, text: "Pop Art" },
          { id: 12, text: "Op Art" },
          { id: 13, text: "Chinoiserie" },
          { id: 14, text: "Damask" },
          { id: 15, text: "Ikat" },
          { id: 16, text: "Toile" },
          { id: 17, text: "Plaid" },
          { id: 18, text: "Stripes" },
          { id: 19, text: "Polka dots" },
          { id: 20, text: "Gingham" },
          { id: 20, text: "Chevron" },
          { id: 20, text: "Herringbone" },
          { id: 20, text: "Foulard" },
          { id: 20, text: "Ogee" },
          { id: 20, text: "Trompe l'oeil" },
        ]);
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
        {snap.isModalOpen && !snap.isGenerating ? (
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
              Prompts
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
              Auto Agent
            </div>
          </div>
        )}
      </div>
      {!snap.isGenerating && snap.isModalOpen && (
        <div className={styles.suggestionsModal}>
          {/* <div className={styles.suggestionsModalHeading}>Suggestions</div> */}
          {loading && (
            <></>
            // <div
            //   style={{
            //     width: "100%",
            //     // height: "100%",
            //     display: "flex",
            //     flexDirection: "column",
            //     color: "white",
            //     fontSize: "1.25rem",
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            // >
            //   Loading...
            // </div>
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
                  <svg id="SvgjsSvg1011" width="288" height="288" version="1.1"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="288" height="288"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" fill="#ffffff"></path></svg></g></svg>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                    <div style={{fontFamily: "HelveticcaBold", textAlign: "center", fontSize: "2rem"}}>Upload Image</div>
                    <div style={{ fontFamily: "HelveticcaRegular", textAlign: "center", color: "#999", marginTop: "1rem" }}>
                      Upload your midjourney creations or any image of your choice
                    </div>
                    </div>
                    <label className={styles.customimageupload} htmlFor="customimageupload">Choose Image</label>
                    <input id="customimageupload" style={{display: "none", fontSize: "1.25rem"}} type="file" onChange={handleFileUpload} name="file-upload" className={styles.customFileInput} />
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
