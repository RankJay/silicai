import store, { ModelType } from "@/store";
import styles from "@/styles/modelDropdown.module.css";
import { useAuth } from "@clerk/nextjs";
import { useState, ChangeEvent } from "react";
import { useSnapshot } from "valtio";
import Image from "next/image";

const ModelDropdown = () => {
  const snap = useSnapshot(store);

  const [selectedOption, setSelectedOption] = useState<ModelType>(
    ModelType.REPLICATE
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (modelType: ModelType) => {
    setSelectedOption(modelType);
    store.modelType = modelType;
    handleDropdownToggle();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <div
        className={styles.dropdownItem}
        onClick={() => handleChange(ModelType.REPLICATE)}
      >
        Stable Diffusion
      </div>
      <div
        className={styles.dropdownItem}
        onClick={() => handleChange(ModelType.WOMBO)}
      >
        Wombo
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* <select className={styles.dropdown} value={selectedOption} onChange={handleChange}>
        <option value={ModelType.REPLICATE}>stable-diffusion v2</option>
        <option value={ModelType.WOMBO}>wombo buliojourney-v2</option>
      </select> */}
      Choose Model
      <div className={styles.dropdown} onClick={handleDropdownToggle}>
        {selectedOption === ModelType.WOMBO ? (
          <>
            <Image
              src={
                "https://global-uploads.webflow.com/5fcf07e52d378eac98367eaf/60cb864c5f189bdbd96815b8_5fcecb678cc42bfa2337dc6e_WOMBO.png"
              }
              width={50}
              height={14}
              alt={"wombo"}
            />
          </>
        ) : (
          <>Stable Diffusion</>
        )}
      </div>
      {isDropdownOpen && dropdownContent}
      {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default ModelDropdown;
