import { useSnapshot } from "valtio/react";
import styles from "../../styles/index.module.css";
import store from "@/store";

export default function PromptBar() {
  const snap = useSnapshot(store);

  const handleChatSubmit = async (event: any) => {
    event.preventDefault();
    const questionInput = document.getElementById("prompt") as HTMLInputElement;
    const promptValue = questionInput.value;
    console.log(promptValue);
  
    fetch(`http://localhost:3000/api/generate`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({prompt: promptValue})
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp) {
          console.log(resp);
          store.imageId = resp.id
          store.imageURI = resp.image // 'http://localhost:3000/assets/bf4a9099-42dc-4df6-806e-8537f0ae3636.png' // `http://localhost:3000/assets/${resp.id}.png`
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
          Send
        </button>
      </form>
    </div>
  );
}
