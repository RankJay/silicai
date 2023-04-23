import styles from "@/styles/index.module.css";

export const Banner = ({ inputText }: { inputText: string }) => {
  return (
    <>
      <div className={styles.banner}>{inputText}</div>
    </>
  );
};

export default Banner;