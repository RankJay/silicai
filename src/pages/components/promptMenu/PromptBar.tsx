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

  // window.addEventListener("input", function () {
  //   const questionInput = document.getElementById(
  //     "prompt"
  //   ) as HTMLTextAreaElement;
  //   const parr = document.getElementById("signup1") as HTMLElement;
  //   questionInput.style.height =
  //     questionInput.scrollHeight + "px"; /* set height to content height */
  //   if (questionInput.scrollHeight > parr.offsetHeight) {
  //     console.log(questionInput.style.lineHeight, parr.clientHeight);
  //     // questionInput.style.height = "1px"; /* reset height to one line */
  //     parr.style.height = parr.offsetHeight + 13 + "px";
  //   }
  // });

  useEffect(() => {
    const buttomElement = document.getElementById(
      "signUpButton"
    ) as HTMLButtonElement;
    if (isGenerating === true) {
      buttomElement.disabled = true;
      buttomElement.style.color = "#fff";
      buttomElement.style.background =
        "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
      buttomElement.style.webkitAnimation =
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
    store.isSuggestionsModalOpen = false;
    store.isFileUploadModalOpen = false;
    store.isAutoGPTModalOpen = false;
    store.isModalOpen = false;

    // const delay = 500; // 2 seconds
    // let j = 1;

    // for (let i = 0; i < 122; i++) {
    //   // Use an Immediately Invoked Function Expression (IIFE) to create a closure
    //   (function (iteration) {
    //     setTimeout(function () {
    //       console.log(`Iteration: ${j}`);
    //       store.imageURI = `/assets/animation/${j}.png`
    //       questionInput.value = `${j}`;
    //       j++;

    //       if (j === 61) {
    //         j = 1;
    //       }
    //     }, delay * iteration);
    //   })(i);

    //   if (j === 8) {
    //     i = 0;
    //   }
    // }

    await axios
      .post(`/api/generate`, { prompt: promptValue, clerk_id: user?.id })
      .then(async (render) => {
        const resp = (await render.data) as any;
        const imageURl = await resp.image;
        store.checkoutURL = imageURl;
        const response: {
          data:
            | WithImplicitCoercion<string>
            | { [Symbol.toPrimitive](hint: "string"): string };
        } = await axios.get(imageURl, { responseType: "arraybuffer" });

        const imageData = Buffer.from(response.data, "binary");
        store.imageURI = `data:image/png;base64,${imageData.toString(
          "base64"
        )}`; // 'http://localhost:3000//assets/bf4a9099-42dc-4df6-806e-8537f0ae3636.png' // `http://localhost:3000//assets/${resp.id}.png`
      })
      .catch((err) => {
        window.alert(err.response.data.error);
      });
    store.isGenerating = false;
    // questionInput.value = "";
    // questionInput.style.height = "initial";
  };
  return (
    <div className={styles.signUp} id="signup1">
      <form onSubmit={handleChatSubmit} style={{ alignItems: "flex-end" }}>
        <textarea
          id="prompt"
          // type="text"
          className={styles.signUpInput}
          style={{
            fontFamily: "HelveticcaRegular",
            width: "100%",
          }}
          name="prompt"
          placeholder="Prompt..."
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
