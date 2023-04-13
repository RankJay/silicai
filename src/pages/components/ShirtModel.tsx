import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import store from "@/store";

const Scene = () => {
  const snap = useSnapshot(store);
  const gltf = useLoader(GLTFLoader, "/assets/shirt.glb");
  const imageTexture = useTexture(snap.imageURI);
  imageTexture.flipY = false;
  const isLoading = snap.isGenerating;
  const group = useRef<THREE.Group>() as React.MutableRefObject<THREE.Group>;

  useEffect(() => {
    if (group.current && gltf.scene && isLoading === false) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            map: imageTexture,
          });
        }
      });
      group.current.add(gltf.scene);
      store.isGenerating = false;
      store.loadingSpeed = 10;
    } else if (isLoading === true) {
      store.loadingSpeed = 100;
    }
  }, [group, gltf, imageTexture, isLoading]);

  return <group ref={group} scale={5}></group>;
};

const ShirtModel = () => {
  const snap = useSnapshot(store);
  return (
    <Canvas>
      <ambientLight color={"#aaa"} intensity={0.4} />
      <pointLight intensity={0.15} position={[0, -5, 5]} />
      <directionalLight intensity={1}  />
      <hemisphereLight intensity={0} />
      <OrbitControls autoRotate={true} autoRotateSpeed={snap.loadingSpeed} />
      <Scene />
    </Canvas>
  );
};

export default ShirtModel;
