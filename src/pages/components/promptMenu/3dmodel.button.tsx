import store, { ThreeModelType } from "@/store";
import styles from "@/styles/threeModel.module.css";
import { useState } from "react";
import { useSnapshot } from "valtio";

const ThreeModelButton = () => {
  const snap = useSnapshot(store);
  const [selectedOption, setSelectedOption] = useState<ThreeModelType>(
    ThreeModelType.TSHIRT
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (modelType: ThreeModelType) => {
    setSelectedOption(modelType);
    if (modelType === ThreeModelType.TSHIRT) {
      store.threeModel = '/assets/shirt.glb'
    } else if (modelType === ThreeModelType.PANTS) {
      store.threeModel = '/assets/shirt.glb'
    }
    handleDropdownToggle();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <div
        className={styles.dropdownItem}
        onClick={() => handleChange(ThreeModelType.TSHIRT)}
      >
        T-Shirt
      </div>
      <div
        className={styles.dropdownItem}
        // onClick={() => handleChange(ThreeModelType.PANTS)}
      >Coming Soon...</div>
    </div>
  );
  return (
    <div className={styles.container}>
      <button className={styles.buyButton} onClick={handleDropdownToggle}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            fill="#fff"
            stroke="none"
          >
            <path
              d="M30 209 c-13 -6 -26 -12 -28 -14 -8 -8 20 -45 33 -45 12 0 15 -15 15
-65 l0 -65 70 0 70 0 0 65 c0 50 3 65 15 65 12 0 35 28 35 44 0 3 -18 10 -39
17 -34 10 -42 9 -56 -5 -20 -20 -29 -20 -49 -1 -17 17 -31 18 -66 4z"
            />
            <path d="M108 213 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z" />
          </g>
        </svg>
      </button>
      {isDropdownOpen && dropdownContent}
    </div>
  );
};

export default ThreeModelButton;
