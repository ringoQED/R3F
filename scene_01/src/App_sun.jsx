import { Canvas, useFrame } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

function EarthAndMoon() {
  const earthRef = useRef();
  const moonRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    earthRef.current.position.x = Math.sin(time) * 4;
    earthRef.current.position.z = Math.cos(time) * 4;
    moonRef.current.position.x = earthRef.current.position.x + Math.sin(time * 2) * 1.5;
    moonRef.current.position.z = earthRef.current.position.z + Math.cos(time * 2) * 1.5;
  });

  return (
    <>
      <mesh
        ref={earthRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={hovered ? 'lightgreen' : 'lightblue'} />
      </mesh>
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color='lightgray' />
      </mesh>
    </>
  );
}

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sun />
        <EarthAndMoon />
        <OrbitControls enablePan={false} />
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;