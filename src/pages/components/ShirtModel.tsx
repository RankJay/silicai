import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import store from '@/store';

const Scene = () => {
  const snap = useSnapshot(store);
  const gltf = useLoader(GLTFLoader, '/assets/shirt.glb');
  const try1 = useTexture(snap.imageURI);
  const [texture, setTexture] = useState<THREE.Texture>();
  const group = useRef<THREE.Group>() as React.MutableRefObject<THREE.Group>;

  useEffect(() => {
    if (group.current && gltf.scene) {
        gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ map: try1 });
            }
          });
      group.current.add(gltf.scene);
    }
  }, [group, gltf, try1]);

  return (
    <group ref={group} scale={5}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls autoRotate={true} />
    </group>
  );
};

const ShirtModel = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default ShirtModel;
