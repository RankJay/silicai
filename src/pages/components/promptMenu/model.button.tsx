import store, { ModelType } from "@/store";
import styles from "@/styles/modelDropdown.module.css";
import { useAuth } from "@clerk/nextjs";
import { useState, ChangeEvent } from "react";
import { useSnapshot } from "valtio";

const ModelDropdown = () => {
  const snap = useSnapshot(store);

  const [selectedOption, setSelectedOption] = useState<ModelType>(ModelType.REPLICATE);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as ModelType);
    store.modelType = event.target.value as ModelType;
  };

  return (
    <div className={styles.container}>
      <select className={styles.dropdown} value={selectedOption} onChange={handleChange}>
        <option value={ModelType.REPLICATE}>stable-diffusion v2</option>
        <option value={ModelType.WOMBO}>wombo buliojourney-v2</option>
      </select>
      {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default ModelDropdown;
