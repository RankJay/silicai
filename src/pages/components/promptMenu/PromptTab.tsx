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
          // { id: 20, text: "Gingham" },
          { id: 21, text: "Chevron" },
          { id: 22, text: "Herringbone" },
          { id: 23, text: "Foulard" },
          { id: 24, text: "Ogee" },
          { id: 25, text: "Trompe l'oeil" },
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
    store.isFileUploadModalOpen = false;
    setImageSrc(null);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.imageURI = imageSrc as string;
    setFormSubmitted(true);
    store.isModalOpen = false;
    store.isFileUploadModalOpen = false;
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    d="M 19 13 C 18.449219 13 18 13.449219 18 14 L 18 14.378906 L 16.519531 12.898438 C 15.433594 11.820312 13.679688 11.820312 12.589844 12.898438 L 11.890625 13.601562 L 9.410156 11.121094 C 8.308594 10.074219 6.582031 10.074219 5.480469 11.121094 L 4 12.601562 L 4 7 C 4 6.449219 4.449219 6 5 6 L 12 6 C 12.550781 6 13 5.550781 13 5 C 13 4.449219 12.550781 4 12 4 L 5 4 C 3.34375 4 2 5.34375 2 7 L 2 19 C 2 20.65625 3.34375 22 5 22 L 17 22 C 18.65625 22 20 20.65625 20 19 L 20 14 C 20 13.449219 19.550781 13 19 13 Z M 5 20 C 4.449219 20 4 19.550781 4 19 L 4 15.429688 L 6.898438 12.53125 C 7.207031 12.238281 7.683594 12.238281 7.988281 12.53125 L 11.160156 15.699219 L 15.460938 20 Z M 18 19 C 18 19.191406 17.933594 19.378906 17.820312 19.53125 L 13.308594 15 L 14.011719 14.300781 C 14.15625 14.152344 14.351562 14.070312 14.558594 14.070312 C 14.765625 14.070312 14.964844 14.152344 15.109375 14.300781 L 18 17.210938 Z M 22.710938 4.289062 L 19.710938 1.289062 C 19.613281 1.199219 19.503906 1.128906 19.378906 1.078125 C 19.136719 0.980469 18.863281 0.980469 18.621094 1.078125 C 18.496094 1.128906 18.386719 1.199219 18.289062 1.289062 L 15.289062 4.289062 C 14.898438 4.683594 14.898438 5.316406 15.289062 5.710938 C 15.683594 6.101562 16.316406 6.101562 16.710938 5.710938 L 18 4.410156 L 18 10 C 18 10.550781 18.449219 11 19 11 C 19.550781 11 20 10.550781 20 10 L 20 4.410156 L 21.289062 5.710938 C 21.476562 5.898438 21.734375 6.003906 22 6.003906 C 22.265625 6.003906 22.523438 5.898438 22.710938 5.710938 C 22.898438 5.523438 23.003906 5.265625 23.003906 5 C 23.003906 4.734375 22.898438 4.476562 22.710938 4.289062 Z M 22.710938 4.289062 "
                    fill="#ffffff"
                  />
                </g>
              </svg>
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
                  placeholder="Coming Soon..."
                  disabled={true}
                  required
                />
                <label>OpenAI API Key</label>
                <input
                  id="prompt"
                  type="text"
                  className={styles.signUpInput}
                  style={{
                    fontFamily: "HelveticcaRegular",
                    width: "100%",
                  }}
                  name="prompt"
                  placeholder="Coming Soon..."
                  disabled={true}
                  required
                />
                {/* </div> */}
                <div
                  className={styles.autoGPTFooter}
                  style={{ marginTop: "20px", justifyContent: "flex-end" }}
                >
                  {/* Have AI design you next cotour. */}
                  <button
                    type="submit"
                    // onSubmit={handleSuggestionClick}
                    className={styles.signUpButton}
                    disabled={true}
                    id={styles.launchagent}
                    style={{
                      fontFamily: "HelveticcaRegular",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    Launch Agent
                  </button>
                </div>
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
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "HelveticcaBold",
                          textAlign: "center",
                          fontSize: "2rem",
                        }}
                      >
                        Upload Image
                      </div>
                      <div
                        style={{
                          fontFamily: "HelveticcaRegular",
                          textAlign: "center",
                          color: "#999",
                          marginTop: "1rem",
                        }}
                      >
                        Upload your <span style={{ fontFamily: "HelveticcaBold", color: "white" }}>MidJourney</span> creations or any {" "}
                        <Image
                          src={
                            "https://global-uploads.webflow.com/5fcf07e52d378eac98367eaf/60cb864c5f189bdbd96815b8_5fcecb678cc42bfa2337dc6e_WOMBO.png"
                          }
                          width={50}
                          height={14}
                          alt={"wombo"}
                        />{" "}
                        image of your choice
                      </div>
                    </div>
                    <label
                      className={styles.customimageupload}
                      htmlFor="customimageupload"
                    >
                      Choose Image
                    </label>
                    <input
                      id="customimageupload"
                      style={{ display: "none", fontSize: "1.25rem" }}
                      type="file"
                      onChange={handleFileUpload}
                      name="file-upload"
                      className={styles.customFileInput}
                    />
                    {/* <button onClick={handleCloseModal}>Close</button> */}
                  </div>
                )}
                {imageSrc && (
                  <form
                    onSubmit={handleSubmitForm}
                    style={{
                      height: "auto",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        marginRight: "10px",
                        color: "white",
                        backgroundColor: "transparent",
                      }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleCloseModal}
                      style={{
                        marginLeft: "10px",
                        color: "white",
                        backgroundColor: "transparent",
                      }}
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
