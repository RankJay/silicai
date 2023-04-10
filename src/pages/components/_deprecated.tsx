import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { NextPage } from "next";

type GLBProps = {
  url: string;
};

const GLBModel: React.FC<GLBProps> = ({ url }) => {
  const gltf = useGLTF(url, true);

  return <primitive object={gltf.scene} />;
};

const Model: NextPage = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <GLBModel url="/assets/shirt.glb" />
    </Canvas>
  );
};

// interface GLBModelProps {
//   path: string;
// }

// type GLTFResult = GLTF & {
//   nodes: {
//     T_Shirt_male: THREE.Mesh;
//   };
//   materials: {
//     lambert1: THREE.MeshStandardMaterial;
//   };
// };

// const GLBModel = ({ path }: GLBModelProps) => {
//   const { nodes, materials } = useGLTF(path) as GLTFResult;
//   // Get the first mesh in the scene

//   return (
//     <group dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         userData={{ name: "T_Shirt_male" }}
//       />
//     </group>
//   );
// };

export default Model;
