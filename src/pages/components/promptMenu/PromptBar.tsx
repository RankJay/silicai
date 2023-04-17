import { useSnapshot } from "valtio/react";
import styles from "@/styles/index.module.css";
import store from "@/store";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function PromptBar() {
  const snap = useSnapshot(store);
  const isGenerating = snap.isGenerating;
  const { isLoaded, user } = useUser();

  const openSuggestions = () => {
    // const prompt
  };

  useEffect(() => {
    const buttomElement = document.getElementById(
      "signUpButton"
    ) as HTMLButtonElement;
    if (isGenerating === true) {
      buttomElement.disabled = true;
      buttomElement.style.color = "#fff";
      buttomElement.style.background =
        "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
      buttomElement.style.backgroundSize = "400% 400%";
      buttomElement.innerText = `Generating...`;
    } else if (isGenerating === false) {
      buttomElement.disabled = false;
      buttomElement.style.color = "#fdfdfd";
      buttomElement.style.background = "#000";
      buttomElement.innerText = "Generate";
    }
  }, [isGenerating]);

  const handleChatSubmit = async (event: any) => {
    event.preventDefault();
    const questionInput = document.getElementById("prompt") as HTMLInputElement;
    const promptValue = questionInput.value;

    store.isGenerating = true;

    const render = await axios.post(
      `https://silicai-server-52dq.zeet-silicai.zeet.app/api/user/generate`,
      { prompt: promptValue, email: user?.emailAddresses[0].emailAddress }
    );

    const resp = await render.data;
    const imageURl = await resp.image;
    console.log(imageURl);
    const response: {
      data:
        | WithImplicitCoercion<string>
        | { [Symbol.toPrimitive](hint: "string"): string };
    } = await axios.get(imageURl, { responseType: "arraybuffer" });

    const imageData = Buffer.from(response.data, "binary");
    store.imageURI = `data:image/png;base64,${imageData.toString('base64')}`; // 'http://localhost:3000//assets/bf4a9099-42dc-4df6-806e-8537f0ae3636.png' // `http://localhost:3000//assets/${resp.id}.png`
    store.isGenerating = false;
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
            fontFamily: "HelveticcaRegular",
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
            fontFamily: "HelveticcaRegular",
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
