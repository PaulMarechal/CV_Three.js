import * as THREE from 'three'
import './style.css'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { gsap } from "gsap"
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import CircleType from 'circletype'
// import LocomotiveScroll from "https://cdn.skypack.dev/locomotive-scroll"
import LocomotiveScroll from 'locomotive-scroll';

const scene = new THREE.Scene()
const gui = new GUI({
    width: 400
})
const textureLoader = new THREE.TextureLoader()

// /**
//  * Locomotive scroll
//  */
// const scroller = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true
// });
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'WELCOME',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        // const textGeometry1 = new TextGeometry(
        //     'CO',
        //     {
        //         font: font,
        //         size: 0.5,
        //         height: 0.2,
        //         curveSegments: 12,
        //         bevelEnabled: true,
        //         bevelThickness: 0.03,
        //         bevelSize: 0.02,
        //         bevelOffset: 0,
        //         bevelSegments: 5
        //     }
        // )
        // const textGeometry2 = new TextGeometry(
        //     'ME',
        //     {
        //         font: font,
        //         size: 0.5,
        //         height: 0.2,
        //         curveSegments: 12,
        //         bevelEnabled: true,
        //         bevelThickness: 0.03,
        //         bevelSize: 0.02,
        //         bevelOffset: 0,
        //         bevelSegments: 5
        //     }
        // )
        // const textGeometry3 = new TextGeometry(
        //     '!',
        //     {
        //         font: font,
        //         size: 0.8,
        //         height: 0.2,
        //         curveSegments: 12,
        //         bevelEnabled: true,
        //         bevelThickness: 0.03,
        //         bevelSize: 0.02,
        //         bevelOffset: 0,
        //         bevelSegments: 5
        //     }
        // )
        const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
        const textMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture})
        const text = new THREE.Mesh(textGeometry, textMaterial)
        // const text1 = new THREE.Mesh(textGeometry1, textMaterial)
        // const text2 = new THREE.Mesh(textGeometry2, textMaterial)
        // const text3 = new THREE.Mesh(textGeometry3, textMaterial)

        // test disposition1 
        text.position.set(-3.13, 4.8, -2.61)
        text.rotation.y = 2.6
        text.rotation.z = 4.7

        // test disposition2 
        // text.position.set(-1.31, 1.4, -4.7)
        // text1.position.set(-1.4, 0.78, -4.69)
        // text2.position.set(-1.31, 0.2, -4.95)
        // text3.position.set(-2.4, 0.3, -5.25)
        // text.rotation.y = 2.7
        // text1.rotation.y = 2.7
        // text2.rotation.y = 2.7
        // text3.rotation.y = 2.7
        // text1.rotation.z = 1.6

        scene.add(text)
        // scene.add(text1)
        // scene.add(text2)
        // scene.add(text3)
    }
)

/**
 * Image de fond
 */
// Geometry Image de fond 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
console.log(getRandomInt(0, 20));
const geometryImageFond = new THREE.PlaneGeometry(15, 10, 128, 128)
// Material Image de fond 1
const materialImageFond = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide, 
    uniforms:
    {
        uTime: { value: getRandomInt(0, 20) },
        strenghValue: { value: 10 }
    }
})

// Mesh Image de fond 1
const mesh = new THREE.Mesh(geometryImageFond, materialImageFond)
mesh.position.set(0.26, 11.45, 4.94)
mesh.rotation.y = 0.66
        // gui.add(mesh.position, 'x').min(-40).max(40).step(0.01).name('Cube x')
        // gui.add(mesh.position, 'y').min(-40).max(40).step(0.01).name('Cube y')
        // gui.add(mesh.position, 'z').min(-40).max(40).step(0.01).name('Cube z')
        // gui.add(mesh.rotation, 'y').min(-40).max(40).step(0.01).name('Cube z')
scene.add(mesh)

 /**************** Dynamic mesh ***************/
const debugObject = {}
/**
 * Water
 */
// Geometry
// const waterGeometry = new THREE.PlaneGeometry(10, 10, 512, 512)

// Colors
// debugObject.depthColor = '#186691'
// debugObject.surfaceColor = '#9bd8ff'
// debugObject.depthColor = '#fff'
// debugObject.surfaceColor = '#000'

// gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
// gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })


// gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
// gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')


// gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
// gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
// gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

// gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
// gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')

// Mesh
// const water = new THREE.Mesh(waterGeometry, waterMaterial)
// water.rotation.x = - Math.PI * 0.5
// water.position.y = 1
// scene.add(water)

        // gui.add(water.rotation, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
        // gui.add(water.rotation, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
        // gui.add(water.rotation, 'z').min(-20).max(20).step(0.01).name('Plane8 y')

// /**
//  * Ground 
//  */
// const geometryCircle = new THREE.CircleGeometry( 5, 32 );
// const materialCircle = new THREE.MeshStandardMaterial( { 
//     color: 0xffffff,
//     metalness: 0.6,
//     emissive: 0xffffff
//     // side: THREE.DoubleSide
// } );
// const circle = new THREE.Mesh( geometryCircle, materialCircle );
//         gui.add(circle.position, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
//         gui.add(circle.position, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
//         gui.add(circle.position, 'z').min(-20).max(20).step(0.01).name('Plane8 y')
//         gui.add(circle.rotation, 'x').min(-20).max(20).step(0.01).name('Plane8 y')
// scene.add( circle );
/**
 * 3D Model 
 */
const fbxLoader = new FBXLoader()
const materialObj = new THREE.MeshNormalMaterial()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
let mixer; 
fbxLoader.load(
    'models/idle.fbx',
    (object) => {
        // object.traverse(function (child) {
        //     if (object.isMesh) {
        //         // (child as THREE.Mesh).materialObj = materialObj
        //         if ((child as THREE.Mesh).materialObj) {
        //             ((child as THREE.Mesh).materialObj as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        // gltf.scene.scale.set(.1, .1, .1) // for the Fox
   
        // const action = mixerObj.clipAction(object.animations[0])
        // action.play()

        object.traverse( function ( child ) {

    if ( child.isMesh ) {

         // switch the material here - you'll need to take the settings from the 
         //original material, or create your own new settings, something like:
        const oldMat = child.material;

        // child.material = new THREE.MeshMatcapMaterial({ 
        //     matcap: matcapTexture, 
        //     // flatShading: true
        //  })

        child.material = new THREE.MeshNormalMaterial( {  
           metalness: 1,
           flatShading: true
        } );

    }

  } );

        object.material = materialObj
        console.log(object.animations);
        object.material = new THREE.MeshNormalMaterial()

        mixer = new THREE.AnimationMixer( object );
	    let action = mixer.clipAction( (object).animations[0] );
        console.log(action);
        action.play();


        
        object.scale.set(7, 7, 7)
        object.position.set(0, 0, 0)
        object.rotation.y = -3

        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// scene.background = new THREE.Color( '#fff' );
scene.background = new THREE.Color( '#21272D' );


// var bgTexture = new THREE.Color( '#21272D' );
// // bgTexture.minFilter = THREE.LinearFilter;
// // scene.background = bgTexture;

// const geometryBackground = new THREE.CylinderGeometry( 5, 5, 20, 45, 35 );
// const materialBackground = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// const cylinderBackground = new THREE.Mesh( geometry, material );
// scene.add( cylinderBackground );


const gridHelper = new THREE.GridHelper(100, 100, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

/**
 * Curved plane
 */

const geometryCylinder = new THREE.CylinderGeometry( 0.65, 0.65, 0.42, 64, 25, 14, true, 1.1 );
const materialCylinder = new THREE.MeshBasicMaterial( {
    color: 0xffff00, 
    side: THREE.DoubleSide
} );

/**
 * Pictures 
 */
var loaderTab = new THREE.TextureLoader();

// Photo de profil 
const aproposPicture = new THREE.Mesh( geometryCylinder, materialCylinder );
aproposPicture.rotation.y = 2.86
aproposPicture.position.set(-1.31, 2.86, -1.83)
scene.add( aproposPicture );

// FeelinFood
var feelinMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/feelinFood.jpg'),
  side: THREE.DoubleSide
});

const projectPicture1 = new THREE.Mesh( geometryCylinder, feelinMaterial );
projectPicture1.rotation.y = 4.68
projectPicture1.position.set(0, 4.42, 1.3)
scene.add( projectPicture1 );

// ColorFoot
var colorFootMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/colorFoot.png'),
  side: THREE.DoubleSide
});
const projectPicture2 = new THREE.Mesh( geometryCylinder, colorFootMaterial );
projectPicture2.rotation.y = 5.1
projectPicture2.position.set(0.26, 4.9, 1.3)
scene.add( projectPicture2 );

// School&U
var schoolMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/school.jpg'),
  side: THREE.DoubleSide
});

const projectPicture3 = new THREE.Mesh( geometryCylinder, schoolMaterial );
projectPicture3.rotation.y = 5.2
projectPicture3.position.set(0.52, 5.38, 1.3)
scene.add( projectPicture3 );

// AeroBay
var aeroMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/aerobay.png'),
  side: THREE.DoubleSide
});

const projectPicture4 = new THREE.Mesh( geometryCylinder, aeroMaterial );
projectPicture4.rotation.y = 5.45
projectPicture4.position.set(0.9, 5.87, 1.04)
scene.add( projectPicture4 );

// Forum 
var forumMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/forum.png'), 
  side: THREE.DoubleSide
});

const projectPicture5 = new THREE.Mesh( geometryCylinder, forumMaterial );
projectPicture5.rotation.y = 5.8
projectPicture5.position.set(0.9, 5.38, 1.04)
scene.add( projectPicture5 );

// FoodCulture Street
var fcsMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/fcs.png'), 
  side: THREE.DoubleSide
});

const projectPicture6 = new THREE.Mesh( geometryCylinder, fcsMaterial );
projectPicture6.rotation.y = 5.5
projectPicture6.position.set(0.78, 4.9, 1.04)
scene.add( projectPicture6 );



// Autriche
var montagneMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/Hobbies/montagne2.png'),
  side: THREE.DoubleSide
});
const hobbiesPicture1 = new THREE.Mesh( geometryCylinder, montagneMaterial );
hobbiesPicture1.rotation.y = 6.7
hobbiesPicture1.position.set(1.3, 6.6, 0)
scene.add( hobbiesPicture1 );

// Madere
var madereMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/Hobbies/madere1.png'),
  side: THREE.DoubleSide
});
const hobbiesPicture2 = new THREE.Mesh( geometryCylinder, madereMaterial );
hobbiesPicture2.rotation.y = 7.03
hobbiesPicture2.position.set(1.1, 7.1, -0.26)
scene.add( hobbiesPicture2 );

// Maroc
var marocMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/Hobbies/maroc3.png'),
  side: THREE.DoubleSide
});
const hobbiesPicture3 = new THREE.Mesh( geometryCylinder, marocMaterial );
hobbiesPicture3.rotation.y = 7.2
hobbiesPicture3.position.set(0.9, 7.6, -0.4)
scene.add( hobbiesPicture3 );

// Madere
var tenteMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/Hobbies/montagne6.jpg'), 
  side: THREE.DoubleSide
});
const hobbiesPicture4 = new THREE.Mesh( geometryCylinder, tenteMaterial );
hobbiesPicture4.rotation.y = 6.7
hobbiesPicture4.position.set(1.3, 7.1, 0.3)
scene.add( hobbiesPicture4 );

// Lozere
var lozereMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/Hobbies/lozere1.png'),
  side: THREE.DoubleSide
});
const hobbiesPicture5 = new THREE.Mesh( geometryCylinder, lozereMaterial );
hobbiesPicture5.rotation.y = 6.9
hobbiesPicture5.position.set(1.2, 7.6, 0.1)
scene.add( hobbiesPicture5 );


// Sorbonne
var sorbonneMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/School/sorbonne.png'),
  side: THREE.DoubleSide
});
const formationsPicture1 = new THREE.Mesh( geometryCylinder, sorbonneMaterial );
formationsPicture1.rotation.y = 8.33
formationsPicture1.position.set(-0.52, 8.85, -0.79)
scene.add( formationsPicture1 ); 

// ESIEE [it]
var esieeMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/School/esiee.png'),
  side: THREE.DoubleSide
});
const formationsPicture2 = new THREE.Mesh( geometryCylinder, esieeMaterial );
formationsPicture2.rotation.y = 8.53
formationsPicture2.position.set(-0.79, 9.4, -1.0)
scene.add( formationsPicture2 );


const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0xffffff
//     wireframe: true,
// })

// Textures 
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// material
const material = new THREE.MeshBasicMaterial({
    // color: parameters.materialColor, 
    color: 0xfffffe, 
    // gradientMap: gradientTexture
    
})

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0, 0.5, -10)
// scene.add(cube)

const geometryPlane = new THREE.PlaneGeometry( 12, 10 );
const geometryPlaneRect = new THREE.PlaneGeometry( 1, 2 );
const geometryPlaneRectEcoles = new THREE.PlaneGeometry(3, 4);
const geometryPlaneRectImageVideo = new THREE.PlaneGeometry(18, 10);

const materialPlane = new THREE.MeshBasicMaterial( {color: 0xffffff} );

const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.position.set(0, 1.5, -6)
plane.rotation.y = 3

/**
 * Animated text
 */
const container = document.querySelector(".container");

document.body.addEventListener("mousemove", e => {
  const x = e.clientX;
  const y = e.clientY;
  gsap.to(container, {
    y: y
  });
  gsap.to(".menu-mask", {
    y: -y
  });
});

// A propos 
scene.add( plane );

// Cubes 
const geometryCube = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
const materialCube = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometryCube, materialCube );
const cube1 = new THREE.Mesh( geometryCube, materialCube );
// const cube2 = new THREE.Mesh( geometryCube, materialCube );
// const cube3 = new THREE.Mesh( geometryCube, materialCube );
// const cube4 = new THREE.Mesh( geometryCube, materialCube );
cube.position.set(-0.9 ,3.2, -0.2)

scene.add( cube );

/**
 * Background
 */
const options = {
    enableSwoopingCamera: false,
    enableRotation: true,
    transmission: 1,
    thickness: 0,
    roughness: 0.67,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.12
}

// const bgTexture = new THREE.TextureLoader().load("images/textureFond.jpg");
// const bgGeometry = new THREE.PlaneGeometry(5, 5);
// const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
// const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
// bgMesh.position.set(0, 3, -1);

// scene.add(bgMesh);

const positionsTest = [
    [0, 6.85, 0],
];

const geometriesTest = [
    new THREE.CylinderGeometry( 13, 13, 35, 45, 35 )
    // new THREE.IcosahedronGeometry(0.67, 24), // Sphere
];

const materialTest = new THREE.MeshPhysicalMaterial({
    transmission: options.transmission,
    thickness: options.thickness,
    roughness: options.roughness,
    envMapIntensity: options.envMapIntensity,
    clearcoat: options.clearcoat,
    clearcoatRoughness: options.clearcoatRoughness,
    side: THREE.DoubleSide
});

const meshesTest = geometriesTest.map(
    (geometry) => new THREE.Mesh(geometry, materialTest)
);

meshesTest.forEach((mesh, i) => {
    scene.add(mesh);
    mesh.position.set(...positionsTest[i]);
});

geometry.rotateX(Math.PI / 2);
geometry.translate(0, -4, 0);

// ------
// Update
// ------

const update = (time, deltaTime) => {
const ROTATE_TIME = 10; // Time in seconds for a full rotation
const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);
const rotateX = (deltaTime / ROTATE_TIME) * Math.PI * 2;
const rotateY = (deltaTime / ROTATE_TIME) * Math.PI * 2;

if (options.enableRotation) {
    meshes.forEach((mesh) => {
      mesh.rotateOnWorldAxis(xAxis, rotateX);
      mesh.rotateOnWorldAxis(yAxis, rotateY);
    });
}

if (options.enableSwoopingCamera) {
    camera.position.x = Math.sin((time / 10) * Math.PI * 2) * 2;
    camera.position.y = Math.cos((time / 10) * Math.PI * 2) * 2;
    camera.position.z = 4;
    camera.lookAt(scene.position);
    }
};

function lerp ( x, y, z ) {
  return(1 - z) * x + z * y
}


function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}

/**
 * Lights ( background of scene )
 */
const light1 = new THREE.PointLight('#ff00ff', 16, 12)
scene.add(light1)

const light2 = new THREE.PointLight('#00ffff', 14, 12)
scene.add(light2)

const light3 = new THREE.PointLight('#ffff00', 20, 11)
scene.add(light3)

const light4 = new THREE.PointLight('#ffffff', 18, 12)
scene.add(light4)

const animationScripts = []

animationScripts.push({
    start: 0,
    end: 100,
    func: () => {
        let g = material.color.g
        g -= 0.05
        if (g <= 0) {
            g = 1.0
        }
        // material.color.g = g
    },
})

animationScripts.push({
    start: 0,
    end: 10,
    func: () => {
        camera.position.set(0, 1.5, -8)
        camera.rotation.y = 3
        plane.position.y = lerp(1.5, 20, scalePercent(0, 10))
    },
})


animationScripts.push({
    start: 10,
    end: 20,
    func: () => {
        camera.position.x = lerp(0, -3, scalePercent(10, 20))
        camera.position.z = lerp(-8, -1.5, scalePercent(10, 20))
        camera.position.y = lerp(1.5, 3, scalePercent(10, 20))
        camera.rotation.y = lerp(3, 4.5, scalePercent(10, 20))
    },
})
// mesh.rotation.y = 0.65
animationScripts.push({
    start: 20,
    end: 30,
    func: () => {
        camera.position.x = lerp(-3, -1.5, scalePercent(20, 30))
        camera.position.z = lerp(-1.5, 3.5, scalePercent(20, 30))
        camera.position.y = lerp(3, 4.5, scalePercent(20, 30))
        camera.rotation.y = lerp(4.5, 6, scalePercent(20, 30))
    },
})

animationScripts.push({
    start: 30,
    end: 40,
    func: () => {
        camera.position.x = lerp(-1.5, 4, scalePercent(30, 40))
        camera.position.z = lerp(3.5, 2, scalePercent(30, 40))
        camera.position.y = lerp(4.5, 6, scalePercent(30, 40))
        camera.rotation.y = lerp(6, 7.5, scalePercent(30, 40))
    },
})

animationScripts.push({
    start: 40,
    end: 50,
    func: () => {
        camera.position.x = lerp(4, 3, scalePercent(40, 50))
        camera.position.z = lerp(2, -2, scalePercent(40, 50))
        camera.position.y = lerp(6, 7.5, scalePercent(40, 50))
        camera.rotation.y = lerp(7.5, 9, scalePercent(40, 50))
    },
})

animationScripts.push({
    start: 50,
    end: 60,
    func: () => {
        camera.position.x = lerp(3, -2, scalePercent(50, 60))
        camera.position.z = lerp(-2, -3, scalePercent(50, 60))
        camera.position.y = lerp(7.5, 9, scalePercent(50, 60))
        camera.rotation.y = lerp(9, 10.5, scalePercent(50, 60))
    },
})

animationScripts.push({
    start: 60,
    end: 70,
    func: () => {
        camera.position.x = lerp(-2, -3, scalePercent(60, 70))
        camera.position.z = lerp(-3, 1, scalePercent(60, 70))
        camera.position.y = lerp(9, 10.5, scalePercent(60, 70))
        camera.rotation.y = lerp(10.5, 12, scalePercent(60, 70))
    },
})


animationScripts.push({
    start: 70,
    end: 80,
    func: () => {
        camera.position.x = lerp(-3, 1.7, scalePercent(70, 80))
        camera.position.z = lerp(1, 1.5, scalePercent(70, 80))
        camera.position.y = lerp(10.5, 11, scalePercent(70, 80))
        camera.rotation.y = lerp(12, 13.5, scalePercent(70, 80))
    },
})

animationScripts.push({
    start: 80,
    end: 90,
    func: () => {
        camera.position.x = lerp(1.7, -0.2, scalePercent(80, 90))
        camera.position.z = lerp(1.5, -3.8, scalePercent(80, 90))
        camera.position.y = lerp(11, 11.2, scalePercent(80, 90))
        camera.rotation.y = lerp(13.5, 15, scalePercent(80, 90))
    },
})

animationScripts.push({
    start: 90,
    end: 100,
    func: () => {
        camera.position.x = lerp(-0.2, -0.6, scalePercent(90, 100))
        camera.position.z = lerp(-3.8, -7, scalePercent(90, 100))
        camera.position.y = lerp(11.2, 10, scalePercent(90, 100))
        camera.rotation.y = lerp(15, 16.4, scalePercent(90, 100))
    },
})

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

let scrollPercent = 0 

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;
    // // Display percent and coordinates of camera 
    // (document.getElementById('scrollProgress')).innerText =
    //     'Scroll Progress : ' + scrollPercent.toFixed(2) + 
    //     '\n  Camera.position.x : ' + camera.position.x + 
    //     '\nCamera.position.y : ' + camera.position.y + 
    //     '\n Camera.position.z : ' + camera.position.z + 
    //     '\nCamera.rotation.y : ' + camera.rotation.y + 
    //     '\n Camera.rotation.x : ' + camera.rotation.x
}

/**
* Particles
*/
// Geometry
const objectsDistance = 4
const particlesCount = 700
const positions = new Float32Array(particlesCount * 3 )

for( let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0 ] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1 ] = objectsDistance * 0.5 - Math.random() * objectsDistance * 30
    positions[i * 3 + 2 ] = (Math.random() - 0.5) * 20
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material 
// Ta have round particles 
function createCircleTexture(color, size) {
  var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // create texture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;
  matContext.beginPath();
  matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  return texture;
}

// Particles material with round particles function ( createCircleTexture )
const particlesMaterial = new THREE.PointsMaterial({
    // color: parameters.materialColor, 
    // color: 0x000000,
    sizeAttenuation: true, 
    // size: 0.04
    map: createCircleTexture('#ffffff', 256),
    size: 0.04,
    transparent: true,
    depthWrite: false
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
particles.position.set(0, 20, 0)
scene.add(particles)

/**
 * Fireflies
*/
// Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 70
const positionArray = new Float32Array(firefliesCount * 3 ) // *3 because XYZ
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i < firefliesCount; i++){
    positionArray[ i * 3 + 0 ] = (Math.random() -0.5 ) * 15
    positionArray[ i * 3 + 1 ] = (Math.random() -0.1) * 15.5
    positionArray[ i * 3 + 2 ] = (Math.random() - 0.5 ) * 15

    scaleArray[i] = Math.random()
}

// 3 because of XYZ
firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material 
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2)}, 
        uSize: { value: 100}
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader, 
    transparent: true, 
    blending: THREE.AdditiveBlending, 
    depthWrite: false
})

// GUI Fireflies 
// gui.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('fireflies Size')

// Points 
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)



/**
* Lights
*/
const ambientLight = new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)

const clock = new THREE.Clock()

function animate() {
    // const elapsedTime = clock.getElapsedTime()
    cube.rotation.x += 0.007
    cube.rotation.y += 0.008

    requestAnimationFrame(animate)

    playScrollAnimations()

    mixer.update(clock.getDelta())

    render()
}

function render() {
    const elapsedTime = clock.getElapsedTime()
    // Image de fond 
    materialImageFond.uniforms.uTime.value = elapsedTime 
    materialImageFond.uniforms.strenghValue. value = elapsedTime

    // Fireflies 
    firefliesMaterial.uniforms.uTime.value = elapsedTime 
    renderer.render(scene, camera)

    // // Smoke
    // material.dispose();
    // renderer.dispose();

    // Lights on background
    const light1Angle = elapsedTime * 0.23
    light1.position.x = Math.cos(light1Angle) * 14
    light1.position.z = Math.sin(light1Angle) * 14
    light1.position.y = Math.sin(elapsedTime * 13)

    const light2Angle = - elapsedTime * 0.5
    light2.position.x = Math.cos(light2Angle) * 13
    light2.position.z = Math.sin(light2Angle) * 13
    light2.position.y = Math.sin(elapsedTime * 10) + Math.sin(elapsedTime * 1)

    const light3Angle = elapsedTime * 0.6
    light3.position.x = Math.cos(light3Angle) * (14 + Math.sin(elapsedTime * 0.1))
    light3.position.z = Math.sin(light3Angle) * (14 + Math.sin(elapsedTime * 0.1))
    light3.position.y = Math.sin(elapsedTime * 10) + Math.cos(elapsedTime * 0.5)

    const light4Angle = - elapsedTime * 0.23
    light4.position.x = Math.cos(light4Angle) * 14
    light4.position.z = Math.sin(light4Angle) * 14
    light4.position.y = Math.sin(elapsedTime * 2)

}

//    gui.add(mesh.position, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
//         gui.add(mesh.position, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
//         gui.add(mesh.position, 'z').min(-20).max(20).step(0.01).name('Plane8 y')

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()