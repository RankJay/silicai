import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";
import styles from "@/styles/new.module.css";
import { useState } from "react";
import PromptBar from "./components/PromptBar";

type GLBProps = {
  url: string;
};

const GLBModel: React.FC<GLBProps> = ({ url }) => {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} />;
};

const ShirtCanvas = () => {
  // const [prompt, setPrompt] = useState<string>('');
  // const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls autoRotate={true} />
      <mesh scale={5}>
        <GLBModel url="/assets/shirt.glb" />
      </mesh>
    </Canvas>
  );
};

export default function New() {
  return (
    <>
      <div className={styles.newPageLandingSection}>
        <ShirtCanvas />
        <PromptBar />
      </div>
    </>
  );
};
