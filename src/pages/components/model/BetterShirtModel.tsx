import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
  OrbitControls,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import store from "@/store";
import styles from "@/styles/index.module.css";
import * as THREE from "three";
import Loader from "../common/Loader";


interface AppProps {
  position?: [number, number, number];
  fov?: number;
}

const BetterShirtModel = ({
  position = [0, 0, 2.5],
  fov = 25,
}: {
  position: [x: number, y: number, z: number];
  fov: number;
}) => {
  const snap = useSnapshot(store);
  return (
    <Suspense fallback={<><div>Loading 3D Model...</div></>}>
    <Canvas
    id={styles.modelcanvas}
      shadows
      camera={{ position, fov }}
      gl={{ preserveDrawingBuffer: true }}
      eventPrefix="layer"
      // style={{
      //   zIndex: "1"
        // justifyContent: "center",
        // backgroundColor: "#010",
        // display: "flex",
        // width: "550px",
        // height: "75vh",
      // }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="apartment"  />
      {/* <CameraRig> */}
      {/* <Backdrop /> */}
      {/* <Center> */}
      <OrbitControls autoRotate={true} autoRotateSpeed={snap.loadingSpeed} />
      <Shirt />
      {/* </Center> */}
      {/* </CameraRig> */}
    </Canvas>
    </Suspense>
  );
};

function Backdrop(): JSX.Element {
  const shadows = useRef<any>(null);
  useFrame((store, delta) =>
    easing.dampC(shadows.current?.getMesh().material.color, 2, 0.25, delta)
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

interface CameraRigProps {
  children: JSX.Element[];
}

function CameraRig({ children }: CameraRigProps): JSX.Element {
  const group = useRef<THREE.Group>(new THREE.Group());
  const snap = useSnapshot(store);
  useFrame((store, delta) => {
    easing.damp3(
      store.camera.position,
      [false ? -store.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    easing.dampE(
      group.current.rotation,
      [store.pointer.y / 10, -store.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

interface ShirtProps {
  [propName: string]: any;
}

function Shirt(props: ShirtProps): JSX.Element {
  const snap = useSnapshot(store);
  const isLoading = snap.isGenerating;
  const texture = useTexture(snap.imageURI);
  // texture.wrapS = THREE.MirroredRepeatWrapping;
  // texture.wrapT = THREE.MirroredRepeatWrapping;
  // texture.repeat.set(2, 2);
  // texture.offset.set(-0.5, -0.5);
  const { nodes, materials } = useLoader(GLTFLoader, "/assets/shirt.glb");
  (materials.lambert1 as THREE.MeshStandardMaterial).map = texture;
  useFrame((store, delta) =>{
    // easing.dampC((materials.lambert1 as THREE.MeshStandardMaterial).color, 'black', 0.25, delta)
});

  useEffect(() => {
    console.log(materials);
    if (isLoading === false) {
      store.isGenerating = false;
      store.loadingSpeed = 10;
    } else if (isLoading === true) {
      store.loadingSpeed = 20;
    }
  });
  return (
    <mesh
      castShadow
      geometry={(nodes.T_Shirt_male as THREE.Mesh).geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
      scale={0.8}
    >
      {/* <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={1}
        // map={texture}
        // map-anisotropy={16}
      /> */}
    </mesh>
  );
}

useGLTF.preload("/assets/shirt.glb");
export default BetterShirtModel;
