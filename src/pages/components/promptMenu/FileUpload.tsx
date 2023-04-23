import Image from "next/image";
import { useState } from "react";
import { useSnapshot } from "valtio";
import styles from "@/styles/fileupload.module.css";
import store from "@/store";

const FileUpload = () => {
  const snap = useSnapshot(store);
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
    setImageSrc(null);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.imageURI = imageSrc as string;
    setFormSubmitted(true);
    handleCloseModal();
    // Send the image to the server or perform any other action here
  };

  return (
    <div className={styles.container}>
      {/* <button
        className={styles.uploadButton}
        onClick={() => setShowModal(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="upload-image"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"></path></svg>
         </button> */}
      {showModal && snap.isAutoGPTModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {imageSrc ? (
              <Image src={imageSrc} width={200} height={200} alt="Uploaded Image" />
            ) : (
              <>
                <input type="file" onChange={handleFileUpload} />
                <button onClick={handleCloseModal}>Close</button>
              </>
            )}
            {imageSrc && (
              <form onSubmit={handleSubmitForm} style={{justifyContent: "center", paddingTop: "10px"}}>
                <button type="submit" style={{marginRight: "10px"}}>Submit</button>
                <button onClick={handleCloseModal} style={{marginLeft: "10px"}}>Close</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
