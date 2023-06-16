import { Suspense, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Decal,
  Environment,
  Center,
  OrbitControls,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSnapshot } from "valtio";
import store from "@/store";
import styles from "@/styles/index.module.css";
import * as THREE from "three";

interface AppProps {
  position?: [number, number, number];
  fov?: number;
}

const BetterShirtModel = ({
  position = [0, 0, 0],
  fov = 25,
}: {
  position: [x: number, y: number, z: number];
  fov: number;
}) => {
  const snap = useSnapshot(store);
  return (
    <Suspense
      fallback={
        <>
          <div>Loading 3D Model...</div>
        </>
      }
    >
      <Canvas
        className={styles.modelcanvas}
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
        <Environment preset="city" />
        <Center>
          <OrbitControls
            autoRotate={true}
            autoRotateSpeed={4}
            enablePan={false}
            // minDistance={0}
            // maxDistance={5}
            // enableZoom={false}
          />
          <Shirt />
        </Center>
      </Canvas>
    </Suspense>
  );
};

interface ShirtProps {
  [propName: string]: any;
}

function Shirt(props: ShirtProps): JSX.Element {
  const snap = useSnapshot(store);
  const isLoading = snap.isGenerating;
  const texture = useTexture(snap.imageURI);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  // texture.repeat.set(2, 2);
  texture.flipY = false;
  // texture.offset.set(-0.5, -0.5);
  const { nodes, materials } = useLoader(GLTFLoader, snap.threeModel);
  (materials.lambert1 as THREE.MeshStandardMaterial).map = texture;
  (materials.lambert1 as THREE.MeshStandardMaterial).aoMapIntensity = 0;
  // useFrame((store, delta) => {
    // easing.dampC((materials.lambert1 as THREE.MeshStandardMaterial).color, 'black', 0.25, delta)
  // });

  useEffect(() => {
    if (isLoading === false) {
      store.isGenerating = false;
      store.loadingSpeed = 10;
    } else if (isLoading === true) {
      store.loadingSpeed = 20;
    }
  });

  // console.log((nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv.getX(1), (nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv.getY(1), (nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv.getZ(1));
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
      <Decal
        position={[
          (
            (nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv as
              | THREE.BufferAttribute
              | THREE.InterleavedBufferAttribute
          ).getX(1),
          (
            (nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv as
              | THREE.BufferAttribute
              | THREE.InterleavedBufferAttribute
          ).getY(1),
          (
            (nodes.T_Shirt_male as THREE.Mesh).geometry.attributes.uv as
              | THREE.BufferAttribute
              | THREE.InterleavedBufferAttribute
          ).getZ(1),
        ]}
        rotation={[0, 0, 0]}
        scale={1}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  );
}

useGLTF.preload("/assets/shirtnew.glb");
export default BetterShirtModel;
