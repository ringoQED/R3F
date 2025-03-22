// ***********************************************
// 
//    Restaurant backgrounds with cube menu
//    
//          ringoQED, 11 Mar 2025
// 
// 
// ***********************************************

import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { TextureLoader } from 'three';
import { GUI } from 'lil-gui'

//Load the food photos as cube textures
import img1 from './assets/images/food_01.jpg';
import img2 from './assets/images/food_02.jpg';
import img3 from './assets/images/food_03.jpg';
import img4 from './assets/images/food_04.jpg';
import img5 from './assets/images/food_05.jpg';
import img6 from './assets/images/food_06.jpg';

//Load the restaurant hdr images as background
import restaurant1 from './assets/images/restaurant1.hdr'
import restaurant2 from './assets/images/restaurant2.hdr'
import restaurant3 from './assets/images/restaurant3.hdr'

//Load the restaurant menu image
import menu from './assets/images/menu.png'

let bgd = restaurant1; // global variable to contain the background image

function Menu() {
  const meshMenu = useRef();
  const menuTextures = useLoader( TextureLoader, menu );

  return (
    <mesh ref={meshMenu}>


    </mesh>

  );

}

//Define the cube and set the background
function Box({ setBackground }) {
  const meshRef = useRef();
  const textures = useLoader( TextureLoader, [img1, img2, img3, img4, img5, img6] );

  useFrame(() => (meshRef.current.rotation.x += 0.01));
  useFrame(() => (meshRef.current.rotation.y += 0.01));
  
  useEffect(() => {

    const obj = {

      Background: 'Restaurant',

    };
    
    const gui = new GUI()

    gui.add( obj, 'Background', ['Restaurant1', 'Restaurant2', 'Restaurant3'] ).onFinishChange( value => {
      switch( value ) {
        case 'Restaurant1':
          setBackground( restaurant1 );
          break;
        case 'Restaurant2':
          setBackground( restaurant2 );
          break;
        case 'Restaurant3':
          setBackground( restaurant3 );
          break;
      }    
    })
    
    gui.add(meshRef.current.rotation, 'x', 0, Math.PI * 2)
    gui.add(meshRef.current.rotation, 'y', 0, Math.PI * 2)
    gui.add(meshRef.current.rotation, 'z', 0, Math.PI * 2)
    return () => {
      gui.destroy()
    }
  }, [setBackground])

  return (
    <mesh ref={meshRef} onClick={(e) => {
      
      let element = document.getElementById("menu");
      element.style.display = "block";
      console.log('Menu!');
      
    }}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial attach="material-0" map={textures[0]} />
      <meshStandardMaterial attach="material-1" map={textures[1]} />
      <meshStandardMaterial attach="material-2" map={textures[2]} />
      <meshStandardMaterial attach="material-3" map={textures[3]} />
      <meshStandardMaterial attach="material-4" map={textures[4]} />
      <meshStandardMaterial attach="material-5" map={textures[5]} />
    </mesh>
  );
}

//Consolidate the features into App() function
function App() {
  const [background, setBackground] = useState( restaurant1 );
  
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Environment files={ background } background />
      {/*<Environment preset='lobby' background backgroundBlurriness={0.1}/>*/}
      <Box setBackground={setBackground}/>
      <Menu />
      <OrbitControls enableZoom = { false } autoRotate={true} autoRotateSpeed={2}/>
      <Stats />
    </Canvas>
  );
}

export default App;

