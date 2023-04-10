import styles from "../../styles/index.module.css";

const handleChatSubmit = async (event: any) => {
  event.preventDefault();
  const questionInput = document.getElementById("prompt") as HTMLInputElement;

  fetch(``, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then((res) => res.json())
    .then((resp) => {
      if (resp.message) {
        // ADD HERE
      } else {
      }
    });
  questionInput.value = "";
};

export default function PromptBar() {
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
          name="email"
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
