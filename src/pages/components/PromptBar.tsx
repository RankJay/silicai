import { useSnapshot } from "valtio/react";
import styles from "../../styles/index.module.css";
import store from "@/store";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function PromptBar() {
  const snap = useSnapshot(store);
  const isGenerating = snap.isGenerating;
  const { isLoaded, user } = useUser();

  useEffect(() =>{
    const buttomElement = document.getElementById('signUpButton') as HTMLButtonElement;
    if (isGenerating === true) {
      buttomElement.disabled = true;
      buttomElement.style.color = "#888";
      buttomElement.style.background = "#ccc";
      buttomElement.innerText = `Generating...`;
    } else if (isGenerating === false) {
      buttomElement.disabled = false;
      buttomElement.style.color = "#fdfdfd";
      buttomElement.style.background = "linear-gradient(0deg, rgb(0, 0, 0), rgb(47, 47, 47) 95%) no-repeat";
      buttomElement.innerText = "Generate";
    }
  }, [isGenerating]);

  const handleChatSubmit = async (event: any) => {
    event.preventDefault();
    const questionInput = document.getElementById("prompt") as HTMLInputElement;
    const promptValue = questionInput.value;

    store.isGenerating = true;
  
    fetch(`/api/generate`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({prompt: promptValue, user})
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp) {
          console.log(resp);
          store.imageURI = resp.image // 'http://localhost:3000//assets/bf4a9099-42dc-4df6-806e-8537f0ae3636.png' // `http://localhost:3000//assets/${resp.id}.png`
          store.isGenerating = false;
        }
      });
    questionInput.value = "";
  };
  return (
    <div className={styles.signUp}>
      <form onSubmit={handleChatSubmit}>
        <input
          id="prompt"
          type="text"
          className={styles.signUpInput}
          style={{
            fontFamily: "alliance1Regular",
            width: "100%",
          }}
          name="prompt"
          placeholder="Search..."
          required
        />
        <button
          type="submit"
          className={styles.signUpButton}
          id="signUpButton"
          style={{
            fontFamily: "alliance1Regular",
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
