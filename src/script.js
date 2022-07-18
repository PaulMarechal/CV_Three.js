import * as THREE from 'three'
import './style.css'
import firefliesVertexShader from './shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { gsap } from "gsap"
import * as Sticker from './helpers/sticker.js'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Cursor from "./helpers/cursor.js"
import * as Font3D from './helpers/font3D.js'
import * as Curved from './helpers/curvedPlane.js'
import * as Background from './helpers/background.js'
import * as Popup from './helpers/popup.js'

const scene = new THREE.Scene()
// const gui = new GUI({
//     width: 400
// })

const textureLoader = new THREE.TextureLoader()

/**
 * Fonts
 */
Font3D.font(scene, 'WELCOME', 0.5, 0.2, '/new_cv/textures/matcaps/8.png', {x: -3.13, y: 4.8, z: -2.61}, {x: 0, y: 2.6, z: 4.7})

/**
 * Screen sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**  
 * Popup for mobile device orientation
 */
Popup.popupMobileScreenOrientation()

/**
 * Cursor
*/
Cursor.cursorCustom()

/**
 * Image de fond
 */
// Geometry Image de fond 
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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

scene.add(mesh)

/**
 * 3D Model 
 */
const fbxLoader = new FBXLoader()
const materialObj = new THREE.MeshNormalMaterial()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
let mixer; 
fbxLoader.load(
    'models/Idle.fbx',
    (object) => {

        object.traverse( function ( child ) {

            if ( child.isMesh ) {
                const oldMat = child.material;

                child.material = new THREE.MeshNormalMaterial( {  
                    flatShading: true
                });
            }
        });

        object.material = materialObj
        object.material = new THREE.MeshNormalMaterial()

        mixer = new THREE.AnimationMixer( object );
	    let action = mixer.clipAction( (object).animations[0] );
        action.play();


        
        object.scale.set(7, 7, 7)
        object.position.set(0, 0, 0)
        object.rotation.y = -3

        scene.add(object)
    },
    // (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    // },
    // (error) => {
    //     console.log(error)
    // }
)

scene.background = new THREE.Color( '#21272D' );


/**
 * Scene helper
 */
// const gridHelper = new THREE.GridHelper(100, 100, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper)

/**
 * Curved plane
 */
const geometryCylinder = new THREE.CylinderGeometry( 0.65, 0.65, 0.42, 64, 25, 14, true, 1.1 );
const geometryCylinderLangage = new THREE.CylinderGeometry( 0.42, 0.42, 0.42, 64, 25, 14, true, 1.1 );
const materialCylinder = new THREE.MeshBasicMaterial( {
    color: 0xffff00, 
    side: THREE.DoubleSide
} );

/**
 * Pictures 
 */
Curved.allCurvedPictures(scene)


const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()

// Textures 
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// material
const material = new THREE.MeshBasicMaterial({
    color: 0xfffffe,   
})

// Plane 
const geometryPlane = new THREE.PlaneGeometry( 12, 40 );
const materialPlane = new THREE.MeshBasicMaterial( {color: 0xffffff} );
const plane = new THREE.Mesh( geometryPlane, materialPlane );
plane.position.set(0, 1.5, -6)
plane.rotation.y = 3

scene.add( plane );

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

// animated topbar menu 
const stickyMenu = document.getElementById("topBarMenu")
window.addEventListener("scroll", function(){
const scroll = window.scrollY
	if(scroll <= 300){
        stickyMenu.style.visibility = "hidden";
	}
	else{
        stickyMenu.style.visibility = "visible";
        stickyMenu.style.position = "sticky"
	}
}, false);

/**
 * Background
 */
Background.backgroundScene(scene, {x: 0, y:0.65, z:0}, 13, 13, 35, 45, 35, {x: 0, y: -4, z: 0});

/**
 * Transparent cube
 */
const optionsCube = {
    enableSwoopingCamera: false,
    enableRotation: true,
    transmission: 1,
    thickness: 0,
    roughness: 0.22,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.12
}

const positionsTestCube = [
    [-1.7, 3.2, -1.1],
    [-1.2, 3.5, -0.4],
    [-0.8, 3.8, 0.6],
    [-0.7, 4.1, 1.3],
];

const geometriesTestCube = [
    new THREE.IcosahedronGeometry(0.1, 64, 32), // Sphere
    new THREE.DodecahedronGeometry(0.15, 0), 
    new THREE.IcosahedronGeometry(0.2, 0), 
    new THREE.TorusKnotGeometry( 0.1, 0.005, 114, 6, 9, 8 )
];

const materialTestCube = new THREE.MeshPhysicalMaterial({
    transmission: optionsCube.transmission,
    thickness: optionsCube.thickness,
    roughness: optionsCube.roughness,
    envMapIntensity: optionsCube.envMapIntensity,
    clearcoat: optionsCube.clearcoat,
    clearcoatRoughness: optionsCube.clearcoatRoughness,
    side: THREE.DoubleSide
});

const meshesTestCube = geometriesTestCube.map(
    (geometry) => new THREE.Mesh(geometry, materialTestCube)
);

meshesTestCube.forEach((mesh, i) => {
    scene.add(mesh);
    mesh.position.set(...positionsTestCube[i]);
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
 * Moving Lights ( background of scene )
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
    },
})

animationScripts.push({
    start: 0,
    end: 10,
    func: () => {
        camera.position.set(0, 1.5, -8)
        camera.rotation.y = 3
        plane.position.y = lerp(1.5, 40, scalePercent(0, 10))
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
        plane.position.y = lerp(40, 60, scalePercent(10, 20))
    },
})

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
        camera.position.x = lerp(-3, 1.8, scalePercent(70, 80))
        camera.position.z = lerp(1, 1.8, scalePercent(70, 80))
        camera.position.y = lerp(10.5, 11, scalePercent(70, 80))
        camera.rotation.y = lerp(12, 13.5, scalePercent(70, 80))
    },
})

animationScripts.push({
    start: 80,
    end: 90,
    func: () => {
        camera.position.x = lerp(1.8, -0.2, scalePercent(80, 90))
        camera.position.z = lerp(1.8, -3.8, scalePercent(80, 90))
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
    //     '\nCamera.position.x : ' + camera.position.x + 
    //     '\nCamera.position.y : ' + camera.position.y + 
    //     '\nCamera.position.z : ' + camera.position.z + 
    //     '\nCamera.rotation.y : ' + camera.rotation.y + 
    //     '\nCamera.rotation.x : ' + camera.rotation.x
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
function createCircleTexture(color, size) {
  var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // Create texture object from canvas
  var texture = new THREE.Texture(matCanvas);
  // Draw circle
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
    sizeAttenuation: true, 
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

    meshesTestCube.forEach((mesh, i) => {
        mesh.rotation.x += 0.003
        mesh.rotation.y += 0.007
    });

    requestAnimationFrame(animate)

    playScrollAnimations()

    gsap.delayedCall(1.2, ()=>{
        mixer.update(clock.getDelta())
    })

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

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()