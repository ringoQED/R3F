// ******************************************************
// 
//    Restaurant background with spinning cube & menu
//    
//          ringoQED, 22 Mar 2025
// 
// 
// ******************************************************

import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useRef, useEffect, useState, Suspense } from 'react';
import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';

//Load the food photos as cube textures
import img1 from './assets/images/food_01.jpg';
import img2 from './assets/images/food_02.jpg';
import img3 from './assets/images/food_03.jpg';
import img4 from './assets/images/food_04.jpg';
import img5 from './assets/images/food_05.jpg';
import img6 from './assets/images/food_06.jpg';

//Load the restaurant hdr images as background
import restaurant1 from './assets/images/restaurant1.hdr';
import restaurant2 from './assets/images/restaurant2.hdr';
import restaurant3 from './assets/images/restaurant3.hdr';

//Load the restaurant menus image
import menu_main from './assets/images/menu_main.jpg';
import menu_starter from './assets/images/menu_starter.jpg';
import menu_dessert from './assets/images/menu_dessert.jpg';
import menu_drink from './assets/images/menu_drink.jpg';
import { Fragment } from 'react';


//Load the Spaghetti model
function ModelSpag({ isSpagVisible, onSpagClick }) {
  const modelSpagRef = useRef();
  const gltf = useLoader( GLTFLoader, "/spaghetti/scene.gltf" );

  useFrame(() => (modelSpagRef.current.rotation.y += 0.01));

  return (   
    <primitive 
        onPointerDown = { (e) => {
          e.stopPropagation();
          onSpagClick();
        }}
        ref = { modelSpagRef }
        object={ gltf.scene } 
        scale={ 0.007 } 
        position={[ 0, 1, 3 ]}
        visible={ isSpagVisible }
    />   
  );
};


//Load the Oyster model
function ModelOyster({ isOysterVisible, onOysterClick }) {
  const modelOysterRef = useRef();
  const gltf = useLoader( GLTFLoader, "/oyster/scene.gltf" );

  useFrame(() => (modelOysterRef.current.rotation.y += 0.01));

  return (   
    <primitive 
        onPointerDown = { (e) => {
          e.stopPropagation();
          onOysterClick();
        }}
        ref = { modelOysterRef }
        object={ gltf.scene } 
        scale={ 5 } 
        position={[ 3, -1, 0 ]}
        visible={ isOysterVisible }
    />   
  );
};


//Load the Dessert model
function ModelDessert({ isDessertVisible, onDessertClick }) {
  const modelDessertRef = useRef();
  const gltf = useLoader( GLTFLoader, "/dessert/scene.gltf" );

  useFrame(() => (modelDessertRef.current.rotation.y += 0.01));

  return (   
    <primitive 
        onPointerDown = { (e) => {
          e.stopPropagation();
          onDessertClick();
        }}
        ref = { modelDessertRef }
        object={ gltf.scene } 
        scale={ 1 } 
        position={[ 0, -1, -3 ]}
        visible={ isDessertVisible }
    />   
  );
};


//Load the Drink model
function ModelDrink({ isDrinkVisible, onDrinkClick }) {
  const modelDrinkRef = useRef();
  const gltf = useLoader( GLTFLoader, "/drink/scene.gltf" );

  useFrame(() => (modelDrinkRef.current.rotation.y += 0.01));

  return (   
    <primitive 
        onPointerDown = { (e) => {
          e.stopPropagation();
          onDrinkClick();
        }}
        ref = { modelDrinkRef }
        object={ gltf.scene } 
        scale={ 0.03 } 
        position={[ -3, -1.5, 0 ]}
        visible={ isDrinkVisible }
    />   
  );
};


// Control menu to select skybox as background
function CtrlMenu ({ setBackground }){

  useEffect(() => {

    const obj = {

      Background: 'Restaurant',

    };
  
  const gui = new GUI();

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
  
  return () => {
    gui.destroy()
  }
}, [setBackground])
}


//Define the cube and show the food menu when cube is clicked
function Box({ onCubeClick }) {
  const meshRef = useRef();
  const textures = useLoader( TextureLoader, [img1, img2, img3, img4, img5, img6] );

  useFrame(() => (meshRef.current.rotation.x += 0.005));
  useFrame(() => (meshRef.current.rotation.y += 0.005));

  return (
    <mesh ref={meshRef} 
      const onPointerDown = {(e) => {
        e.stopPropagation(); // Prevent click from passing through to the canvas
        onCubeClick();
      }}
    >

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

//Load the menu textures to create the food menus
function FoodMenu({ isVisible }) {
  const menu_mainRef = useRef();
  const menu_starterRef = useRef();
  const menu_dessertRef = useRef();
  const menu_drinkRef = useRef();

  const textureMain = useRef(new THREE.TextureLoader().load( menu_main ));
  const textureStarter = useRef(new THREE.TextureLoader().load( menu_starter ));
  const textureDessert = useRef(new THREE.TextureLoader().load( menu_dessert ));
  const textureDrink = useRef(new THREE.TextureLoader().load( menu_drink ));

  // Position the menus around the cube
  return (
    <Fragment>
      <mesh ref={ menu_mainRef } position={[ 0, 0, 2.5 ]} visible={ isVisible } >
        <planeGeometry args={[3, 3.5]} />
        <meshBasicMaterial
          map={ textureMain.current }
          side={ THREE.DoubleSide }
        />
      </mesh>

      <mesh ref={ menu_starterRef } position={[ 2.5, 0, 0 ]} rotation={[0, Math.PI / 2, 0]} visible={ isVisible } >
        <planeGeometry args={[3, 3.5]} />
        <meshBasicMaterial
          map={ textureStarter.current }
          side={ THREE.DoubleSide }
        />
      </mesh>

      <mesh ref={ menu_dessertRef } position={[ 0, 0, -2.5 ]} rotation={[0, Math.PI, 0]} visible={ isVisible } >
        <planeGeometry args={[3, 3.5]} />
        <meshBasicMaterial
          map={ textureDessert.current }
          side={ THREE.DoubleSide }
        />  
      </mesh>

      <mesh ref={ menu_drinkRef } position={[ -2.5, 0, 0 ]} rotation={[0, -Math.PI / 2, 0]} visible={ isVisible } >
        <planeGeometry args={[3, 3.5]} />
        <meshBasicMaterial
          map={ textureDrink.current }
          side={ THREE.DoubleSide }
        />  
      </mesh>      
    </Fragment>
  );
}


//Consolidate the features into App() function
function App() {
  const [ background, setBackground ] = useState( restaurant1 );
  const [ isBlur, setIsBlur ] = useState( 0 );
  const [ isMenuVisible, setIsMenuVisible ] = useState( false );
  const [ isSpagVisible, setIsSpagVisible ] = useState( false );
  const [ isOysterVisible, setIsOysterVisible ] = useState( false );
  const [ isDessertVisible, setIsDessertVisible ] = useState( false );
  const [ isDrinkVisible, setIsDrinkVisible ] = useState( false );

  // Handle clicks on food models
  const handleSpagClick = () => {
    setIsMenuVisible( prev => !prev );
  }

  const handleOysterClick = () => {
    setIsMenuVisible( prev => !prev );
  }

  const handleDessertClick = () => {
    setIsMenuVisible( prev => !prev );
  }

  const handleDrinkClick = () => {
    setIsMenuVisible( prev => !prev );
  }

  // Handle clicks on the cube
  const handleCubeClick = () => {
    setIsSpagVisible( prev => !prev );
    setIsOysterVisible( prev => !prev );
    setIsDessertVisible( prev => !prev );
    setIsDrinkVisible( prev => !prev );

    if ((!isSpagVisible) || (!isOysterVisible) || (!isDessertVisible) || (!isDrinkVisible)) {
      setIsBlur( 0.1 );
    } else {
      setIsBlur( 0 );
    };
  };

  // Handle clicks on the canvas (outside the cube)
  const handleCanvasClick = () => {
    setIsMenuVisible( false ); // Hide the image when clicking outside
    setIsBlur( 0 );
  };
  
  return (
    <Canvas>
      <Suspense fallback={ null }>
        <ambientLight onPointerDown={ handleCanvasClick } />
        <pointLight position={[ 10, 10, 10 ]} />
        <Box onCubeClick={ handleCubeClick } />
        <ModelSpag isSpagVisible={ isSpagVisible } onSpagClick={ handleSpagClick } />
        <ModelOyster isOysterVisible={ isOysterVisible } onOysterClick={ handleOysterClick } />
        <ModelDessert isDessertVisible={ isDessertVisible } onDessertClick={ handleDessertClick } />
        <ModelDrink isDrinkVisible={ isDrinkVisible } onDrinkClick={ handleDrinkClick } />
        <FoodMenu isVisible={ isMenuVisible } />
        <OrbitControls 
          enableZoom={ false } 
          enablePan={ false }
          autoRotate={ false } 
          autoRotateSpeed={ 0.2 }
          minPolarAngle={ Math.PI/2}
          maxPolarAngle={ Math.PI/2}
        />
        <CtrlMenu setBackground={ setBackground } />
        <Environment files={ background } background backgroundBlurriness={ isBlur } />
        <Stats />
      </ Suspense>
    </Canvas>
  );
}

export default App;

