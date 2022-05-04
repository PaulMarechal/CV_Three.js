import * as THREE from 'three'
import './style.css'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { gsap } from "gsap"

const scene = new THREE.Scene()
const gui = new GUI({
    width: 400
})
const textureLoader = new THREE.TextureLoader()

// import model 3D 
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

        child.material = new THREE.MeshMatcapMaterial({ 
            matcap: matcapTexture, 
            // flatShading: true
         })

        // child.material = new THREE.MeshNormalMaterial( {  
        //    metalness: 1,
        //    flatShading: true
        // } );

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
        // gui.add(object.rotation, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
        // gui.add(object.rotation, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
        // gui.add(object.rotation, 'z').min(-20).max(20).step(0.01).name('Plane8 y')
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

scene.background = new THREE.Color( '#000' );

const gridHelper = new THREE.GridHelper(100, 100, 0xaec6cf, 0xaec6cf)
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)


const renderer = new THREE.WebGLRenderer()
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
  const y = e.clientY - 35;
  gsap.to(container, {
    y: y
  });
  gsap.to(".menu-mask", {
    y: -y
  });
});

/**
 * Experience
 */ 
// Feelin'Food
var feelinLoaderTab = new THREE.TextureLoader();
var feelinMaterial = new THREE.MeshLambertMaterial({
  map: feelinLoaderTab.load('images/feelinFood.jpg')
});
var feelinGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Color Foot 
var loaderTab = new THREE.TextureLoader();
var colorFootMaterial = new THREE.MeshLambertMaterial({
  map: loaderTab.load('images/colorFoot.png')
});
var colorFootGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// School 
var schoolLoaderTab = new THREE.TextureLoader();
var schoolMaterial = new THREE.MeshLambertMaterial({
  map: schoolLoaderTab.load('images/school.jpg')
});
var schoolGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// AeroBay 
var aerobayLoaderTab = new THREE.TextureLoader();
var aeroMaterial = new THREE.MeshLambertMaterial({
  map: aerobayLoaderTab.load('images/aerobay.png')
});
var aeroGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Forum
var forumLoaderTab = new THREE.TextureLoader();
var forumMaterial = new THREE.MeshLambertMaterial({
  map: forumLoaderTab.load('images/forum.png')
});
var forumGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Java
var javaLoaderTab = new THREE.TextureLoader();
var javaMaterial = new THREE.MeshLambertMaterial({
  map: javaLoaderTab.load('images/java.png')
});
var javaGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// homepage
var homepageLoaderTab = new THREE.TextureLoader();
var homepageMaterial = new THREE.MeshLambertMaterial({
  map: homepageLoaderTab.load('images/homepage.png')
});
var homepageGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Portfolio
var portfolioLoaderTab = new THREE.TextureLoader();
var portfolioMaterial = new THREE.MeshLambertMaterial({
  map: portfolioLoaderTab.load('images/portfolio.png')
});
var portfolioGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// FoodCulture Street
var fcsLoaderTab = new THREE.TextureLoader();
var fcsMaterial = new THREE.MeshLambertMaterial({
  map: portfolioLoaderTab.load('images/fcs.png')
});
var fcsGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// Movie rating - react 
var movieLoaderTab = new THREE.TextureLoader();
var movieMaterial = new THREE.MeshLambertMaterial({
  map: portfolioLoaderTab.load('images/movie.png')
});
var movieGeometry = new THREE.PlaneGeometry(1, 3*0.51);

// Food mobile 
var foodMobileLoaderTab = new THREE.TextureLoader();
var foodMobileMaterial = new THREE.MeshLambertMaterial({
  map: foodMobileLoaderTab.load('images/foodMobile.png')
});
var foodMobileGeometry = new THREE.PlaneGeometry(1, 3*0.51);

// Commerce java 
var commerceJavaLoaderTab = new THREE.TextureLoader();
var commerceJavaMaterial = new THREE.MeshLambertMaterial({
  map: commerceJavaLoaderTab.load('images/commerceJava.png')
});
var commerceJavaGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// coin js 
var coinLoaderTab = new THREE.TextureLoader();
var coinMaterial = new THREE.MeshLambertMaterial({
  map: coinLoaderTab.load('images/coin.png')
});
var coinGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// donjon java 
var donjonLoaderTab = new THREE.TextureLoader();
var donjonMaterial = new THREE.MeshLambertMaterial({
  map: donjonLoaderTab.load('images/donjon.png')
});
var donjonGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

const materialPlane1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const materialPlane2 = new THREE.MeshBasicMaterial( {color: 0xeeff00} );
const materialPlane3 = new THREE.MeshBasicMaterial( {color: 0xddff00} );
const materialPlane4 = new THREE.MeshBasicMaterial( {color: 0x6600ff} );
const materialPlane5 = new THREE.MeshBasicMaterial( {color: 0x34f0f0} );
const materialPlane6 = new THREE.MeshBasicMaterial( {color: 0xd5f00c} );
const materialPlane7 = new THREE.MeshBasicMaterial( {color: 0x89ef00, side: THREE.DoubleSide} );

const plane1 = new THREE.Mesh( aeroGeometry, aeroMaterial );
const plane2 = new THREE.Mesh( feelinGeometry, feelinMaterial );
const plane3 = new THREE.Mesh( colorFootGeometry, colorFootMaterial );
const plane4 = new THREE.Mesh( schoolGeometry, schoolMaterial );
const plane5 = new THREE.Mesh( javaGeometry, javaMaterial );
const plane6 = new THREE.Mesh( forumGeometry, forumMaterial );
const plane7 = new THREE.Mesh( homepageGeometry, homepageMaterial );
const plane71 = new THREE.Mesh( portfolioGeometry, portfolioMaterial );
const plane72 = new THREE.Mesh( fcsGeometry, fcsMaterial );
const plane73 = new THREE.Mesh( movieGeometry, movieMaterial );
const plane74 = new THREE.Mesh( foodMobileGeometry, foodMobileMaterial );
const plane75 = new THREE.Mesh( commerceJavaGeometry, commerceJavaMaterial );
const plane76 = new THREE.Mesh( coinGeometry, coinMaterial );
const plane77 = new THREE.Mesh( donjonGeometry, donjonMaterial );

plane1.rotation.y = 1.5
plane2.rotation.y = 1.5
plane3.rotation.y = 1.5
plane4.rotation.y = 1.5
plane5.rotation.y = 1.5
plane6.rotation.y = 1.5
plane7.rotation.y = 1.5
plane71.rotation.y = 1.5
plane72.rotation.y = 1.5
plane73.rotation.y = 1.5
plane74.rotation.y = 1.5
plane75.rotation.y = 1.5
plane76.rotation.y = 1.5
plane77.rotation.y = 1.5

plane1.position.set(-6.5, 3.7, 2) // Aerobay 
plane2.position.set(-7.03, 5.3, 1.04) // FeelinFood
plane3.position.set(-8.86, 5.84, 3.96) // ColorFoot
plane4.position.set(-7.29, 3.96, -1.15) // School 
plane5.position.set(-8.33, 2.5, -1.6) // Java 
plane6.position.set(-6.77, 2.25, 1.88) // Forum 
plane7.position.set(-8.33, 4.15, 5.4) // Homepage 
plane71.position.set(-9.37, 1.82, 5.47) // portfolio 
plane72.position.set(-7.29, 5.5, -2) // FoodCultureStreet
plane73.position.set(-8, 5.64, 5.35) // Movie rating 
plane74.position.set(-7.55, 2.44, -2.79) // food mobile
plane75.position.set(-8, 2.65, 6.95) // ecommerce java 
plane76.position.set(-6.51, 5.3, 5.98) // coin js
plane77.position.set(-7.81, 4.25, 7.55) // donjon

/**
 * Hobbies
 */
// montagne
var montagneLoaderTab = new THREE.TextureLoader();
var montagneMaterial = new THREE.MeshLambertMaterial({
  map: montagneLoaderTab.load('images/Hobbies/montagne1.png')
});
var montagneGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// montagne1 
var montagne1LoaderTab = new THREE.TextureLoader();
var montagne1Material = new THREE.MeshLambertMaterial({
  map: montagne1LoaderTab.load('images/Hobbies/montagne2.png')
});
var montagne1Geometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// montagne2
var montagne2LoaderTab = new THREE.TextureLoader();
var montagne2Material = new THREE.MeshLambertMaterial({
  map: montagne2LoaderTab.load('images/Hobbies/montagne3.png')
});
var montagne2Geometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// montagne3
var montagne3LoaderTab = new THREE.TextureLoader();
var montagne3Material = new THREE.MeshLambertMaterial({
  map: montagne3LoaderTab.load('images/Hobbies/montagne4.png')
});
var montagne3Geometry = new THREE.PlaneGeometry(0.9, 2.62*0.51);

// montagne4
var montagne4LoaderTab = new THREE.TextureLoader();
var montagne4Material = new THREE.MeshLambertMaterial({
  map: montagne4LoaderTab.load('images/Hobbies/montagne5.png')
});
var montagne4Geometry = new THREE.PlaneGeometry(0.9, 2.62*0.51);

// montagne5
var montagne5LoaderTab = new THREE.TextureLoader();
var montagne5Material = new THREE.MeshLambertMaterial({
  map: montagne5LoaderTab.load('images/Hobbies/montagne6.jpg')
});
var montagne5Geometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// maroc
var marocLoaderTab = new THREE.TextureLoader();
var marocMaterial = new THREE.MeshLambertMaterial({
  map: marocLoaderTab.load('images/Hobbies/maroc.png')
});
var marocGeometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// maroc1
var maroc1LoaderTab = new THREE.TextureLoader();
var maroc1Material = new THREE.MeshLambertMaterial({
  map: maroc1LoaderTab.load('images/Hobbies/maroc2.png')
});
var maroc1Geometry = new THREE.PlaneGeometry(2.62, 2.62*0.51);

// madere 
var madereLoaderTab = new THREE.TextureLoader();
var madereMaterial = new THREE.MeshLambertMaterial({
  map: madereLoaderTab.load('images/Hobbies/madere1.png')
});
var madereGeometry = new THREE.PlaneGeometry(2.5, 2.62*0.51);

// madere 1
var madere1LoaderTab = new THREE.TextureLoader();
var madere1Material = new THREE.MeshLambertMaterial({
  map: madere1LoaderTab.load('images/Hobbies/madere.png')
});
var madere1Geometry = new THREE.PlaneGeometry(0.9, 2.62*0.51);

// lozere
var lozereLoaderTab = new THREE.TextureLoader();
var lozereMaterial = new THREE.MeshLambertMaterial({
  map: lozereLoaderTab.load('images/Hobbies/lozere.png')
});
var lozereGeometry = new THREE.PlaneGeometry(2.5, 2.62*0.51);

// lozere 1
var lozere1LoaderTab = new THREE.TextureLoader();
var lozere1Material = new THREE.MeshLambertMaterial({
  map: lozere1LoaderTab.load('images/Hobbies/lozere1.png')
});
var lozere1Geometry = new THREE.PlaneGeometry(2.5, 2.62*0.51);

// Maroc 3
var maroc3LoaderTab = new THREE.TextureLoader();
var maroc3Material = new THREE.MeshLambertMaterial({
  map: maroc3LoaderTab.load('images/Hobbies/maroc3.png')
});
var maroc3Geometry = new THREE.PlaneGeometry(2.3, 2.62*0.51);

// Italie
var italieLoaderTab = new THREE.TextureLoader();
var italieMaterial = new THREE.MeshLambertMaterial({
  map: italieLoaderTab.load('images/Hobbies/italie.png')
});
var italieGeometry = new THREE.PlaneGeometry(2.3, 2.62*0.51);

const plane8 = new THREE.Mesh( montagneGeometry, montagneMaterial ); // vert flash
const plane9 = new THREE.Mesh( montagne1Geometry, montagne1Material );
const plane10 = new THREE.Mesh( montagne2Geometry, montagne2Material );
const plane12 = new THREE.Mesh( montagne4Geometry, montagne4Material );
const plane13 = new THREE.Mesh( montagne5Geometry, montagne5Material );
const plane11 = new THREE.Mesh( geometryPlane, materialPlane2 );
const plane14 = new THREE.Mesh( marocGeometry, marocMaterial );
const plane15 = new THREE.Mesh( maroc1Geometry, maroc1Material );
const plane111 = new THREE.Mesh( montagne3Geometry, montagne3Material );

const plane112 = new THREE.Mesh( madereGeometry, madereMaterial );
const plane113 = new THREE.Mesh( madere1Geometry, madere1Material );
const plane114 = new THREE.Mesh( lozereGeometry, lozereMaterial );
const plane115 = new THREE.Mesh( lozere1Geometry, lozere1Material );
const plane116 = new THREE.Mesh( maroc3Geometry, maroc3Material );
const plane117 = new THREE.Mesh( italieGeometry, italieMaterial );


// Image bgc video 
const planeImageVideo = new THREE.Mesh(geometryPlaneRectImageVideo, materialPlane);

plane8.position.set(-9.64, 8.89, -2.35)
plane9.position.set(-7.46, 8.2, -3.13) 
plane10.position.set(-8.5, 9.03, -4.43)
plane11.position.set(-8.6, 7.97, -5.05) // video
plane111.position.set(-8.6, 8.97, -4.35) 
plane112.position.set(-8.6, 8.97, -4.38) 
plane113.position.set(-8.6, 8.97, -4.37) 
plane114.position.set(-8.6, 8.97, -4.33) 
plane115.position.set(-8.6, 8.97, -4.34) 
plane116.position.set(-8.6, 8.97, -4.35) 
plane117.position.set(-8.6, 8.97, -4.36) 
plane12.position.set(-7.8, 6.95, -4.2)
plane13.position.set(-9.9, 7.7, -2.3)
plane14.position.set(-9, 6.99, -3.91)
plane15.position.set(-11.65, 9.1, -6.1)

planeImageVideo.position.set(-8.4, 7.9, -20)

plane11.rotation.z = 1.57

// Ecoles 
const plane16 = new THREE.Mesh(geometryPlaneRectEcoles, materialPlane7);
const plane17 = new THREE.Mesh(geometryPlaneRectEcoles, materialPlane7);

plane16.position.set(6.76, 14.05, 7.81);
plane16.rotation.z = 1.57
plane16.rotation.y = -2.87
plane17.position.set(1.82, 14.05, 14);
plane17.rotation.z = 1.57
plane17.rotation.y = -0.26

// gui.add(plane2.rotation, 'x').min(-20).max(20).step(0.01).name('Plane2 x')
// gui.add(plane16.rotation, 'y').min(-20).max(20).step(0.01).name('Plane2 y')
// gui.add(plane16.rotation, 'z').min(-20).max(20).step(0.01).name('Plane2 z')
// gui.add(object.position, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
// gui.add(object.position, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
// gui.add(object.position, 'z').min(-20).max(20).step(0.01).name('Plane8 y')

// A propos 
scene.add( plane );

// Experiences 
// scene.add( plane1 );
// scene.add( plane2 );
// scene.add( plane3 );
// scene.add( plane4 );
// scene.add( plane5 );
// scene.add( plane6 );
// scene.add( plane7 );
// scene.add( plane71 );
// scene.add( plane72 );
// scene.add( plane73 );
// scene.add( plane74 );
// scene.add( plane75 );
// scene.add( plane76 );
// scene.add( plane77 );

// Hobbies
// scene.add( plane8 );
// scene.add( plane9 );
// scene.add( plane10 );
// scene.add( plane11 );
// scene.add( plane111 );
// scene.add( plane112 );
// scene.add( plane113 );
// scene.add( plane114 );
// scene.add( plane115 );
// scene.add( plane116 );
// scene.add( plane117 );
// scene.add( plane12 );
// scene.add( plane13 );
// scene.add( plane14 );
// scene.add( plane15 );

// scene.add(planeImageVideo)

// Ecoles
// scene.add( plane16 ); 
// scene.add( plane17 ); 


// const cube1 = new THREE.Mesh(geometry, material)
// cube1.position.set(4, 5.5, -8)
// scene.add(cube1)

// const cube2 = new THREE.Mesh(geometry, material)
// cube2.position.set(5.5, 7.5, -10.5)
// scene.add(cube2)

// const cube3 = new THREE.Mesh(geometry, material)
// cube3.position.set(12, 12.5, -16)
// scene.add(cube3)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
// function lerp(x: THREE.Vector3, y: THREE.Vector3, a: THREE.Vector3): THREE.Vector3 {
//     return (1 - a) * x + a * y
// }

// var _v = new THREE.Vector3(...);

function lerp ( x, y, z ) {
  return(1 - z) * x + z * y
//   mesh.position.lerp( _v, 0.5 );
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}

const animationScripts = []

//add an animation that flashes the cube through 100 percent of scroll
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

//add an animation that moves the cube through first 40 percent of scroll
// test 

animationScripts.push({
    start: 0,
    end: 10,
    func: () => {
        // camera.lookAt(0)
        camera.position.set(0, 1.5, -8)
        camera.rotation.y = 3
        // camera.position.set(0, 1.5, -7)
        
        // camera.rotation.y = 3
        // // camera.rotation.y = lerp(0, 5, scalePercent(0, 10))
        // // camera.position.z = lerp(5, 1, scalePercent(0, 10))
        // camera.position.x = lerp(0, -3, scalePercent(0, 10))
        // camera.position.z = lerp(-7, -1.5, scalePercent(0, 10))
        // camera.position.y = lerp(1.5, 3, scalePercent(0, 10))
        // camera.rotation.y = lerp(3, 4.5, scalePercent(0, 10))
        // // camera.rotation.y = lerp(1.5, 3, scalePercent(0, 10))
        plane.position.y = lerp(1.5, 20, scalePercent(0, 10))
        // plane.position.x = lerp(0, -2, scalePercent(0, 10))
        // plane.position.z = lerp(-6, -3, scalePercent(0, 10))
    },
})


animationScripts.push({
    start: 10,
    end: 20,
    func: () => {

        // camera.lookAt(0)
        // camera.position.set(0, 1.5, -7)
        
        // camera.rotation.y = 3
        // camera.rotation.y = lerp(0, 5, scalePercent(0, 10))
        // camera.position.z = lerp(5, 1, scalePercent(0, 10))
        camera.position.x = lerp(0, -3, scalePercent(10, 20))
        camera.position.z = lerp(-8, -1.5, scalePercent(10, 20))
        camera.position.y = lerp(1.5, 3, scalePercent(10, 20))
        camera.rotation.y = lerp(3, 4.5, scalePercent(10, 20))
        // camera.rotation.y = lerp(1.5, 3, scalePercent(0, 10))
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
        camera.position.x = lerp(-3, 2, scalePercent(70, 80))
        camera.position.z = lerp(1, 1.8, scalePercent(70, 80))
        camera.position.y = lerp(10.5, 11, scalePercent(70, 80))
        camera.rotation.y = lerp(12, 13.5, scalePercent(70, 80))
    },
})

animationScripts.push({
    start: 80,
    end: 90,
    func: () => {
        camera.position.x = lerp(2, -0.2, scalePercent(80, 90))
        camera.position.z = lerp(1.8, -3.8, scalePercent(80, 90))
        camera.position.y = lerp(11, 11.2, scalePercent(80, 90))
        camera.rotation.y = lerp(13.5, 15.7, scalePercent(80, 90))
    },
})

animationScripts.push({
    start: 90,
    end: 100,
    func: () => {
        camera.position.z = lerp(-3.8, -7, scalePercent(90, 100))
        camera.position.y = lerp(11.2, 9, scalePercent(90, 100))
        // camera.position.z = lerp(1.8, -3.8, scalePercent(80, 90))
        // camera.position.y = lerp(11, 11.2, scalePercent(80, 90))
        // camera.rotation.y = lerp(13.5, 15.7, scalePercent(80, 90))
    },
})
        gui.add(camera.position, 'x').min(-20).max(20).step(0.01).name('Plane2 z')
        gui.add(camera.position, 'y').min(-20).max(20).step(0.01).name('Plane8 y')
        gui.add(camera.position, 'z').min(-20).max(20).step(0.01).name('Plane8 y')
// fin test 



// début 
// animationScripts.push({
//     start: 0,
//     end: 10,
//     func: () => {
//         // camera.lookAt(plane.position)
//         camera.position.set(5, 1, 2)
//         plane.position.z = lerp(-10, 1, scalePercent(0, 10))
//         // plane.position.y = lerp(0.5, 1.5, scalePercent(9, 10))
//         // plane.position.x = lerp(0, -2, scalePercent(8, 10))
//         //console.log(cube.position.z)
//     },
// })

// animationScripts.push({
//     start: 10,
//     end: 12,
//     func: () => {
//         // camera.lookAt(cube.position)
//         // camera.position.set(0, 1, 2)
//         plane.position.y = lerp(0.5, 1, scalePercent(10, 12))
//         plane.position.z = lerp(1, 1.7, scalePercent(10, 12))
//         //console.log(cube.position.z)
//     },
// })

// animationScripts.push({
//     start: 12,
//     end: 14,
//     func: () => {
//         // camera.lookAt(cube.position)
//         // camera.position.set(0, 1, 2)
//         plane.position.y = lerp(0.5, 3, scalePercent(12, 14))
//         plane.position.z = lerp(1.7, 2.6, scalePercent(12, 14))
//         plane.position.y = lerp(1, 3, scalePercent(12, 14))
//         plane.rotation.y = lerp(0, 2, scalePercent(12, 14))
//         plane.rotation.x = lerp(0, 2, scalePercent(12, 14))
//         //console.log(cube.position.z)
//     },
// })

// animationScripts.push({
//     start: 14,
//     end: 24,
//     func: () => {
//         camera.rotation.y = lerp(0, 1.501000, scalePercent(14, 24))
//         camera.position.x = lerp(5, -3, scalePercent(14, 24))
//         camera.position.y = lerp(1, 3.5, scalePercent(14, 24))
//         // camera.rotation.x = lerp(0, 2, scalePercent(12, 14))
//     },
// })

// animationScripts.push({
//     start: 24,
//     end: 27,
//     func: () => {
//         camera.position.x = lerp(-3, -4, scalePercent(24, 27))
//         // camera.position.y = lerp(1, 3.1, scalePercent(17, 20))
//         // camera.rotation.x = lerp(0, 2, scalePercent(12, 14))
//     },
// })

// animationScripts.push({
//     start: 27,
//     end: 32,
//     func: () => {
//         // camera.lookAt(plane1.position)
//         camera.position.x = lerp(-4, -7, scalePercent(27, 32))

//         plane1.rotation.y = lerp(1.5, 2, scalePercent(27, 32))
//         plane1.rotation.x = lerp(0, 2, scalePercent(27, 32))
//         plane1.position.y = lerp(3.7, 10, scalePercent(27, 32))
//         plane1.position.x = lerp(-6.5, -9, scalePercent(27, 32))

//         plane2.position.x = lerp(-7.03, -2.5, scalePercent(27, 32))
//         plane2.position.y = lerp(5.3, 2, scalePercent(27, 32))

//         plane2.rotation.x = lerp(0, -2, scalePercent(27, 32))
//         plane2.rotation.y = lerp(1.5, 0.5, scalePercent(27, 32))

//         plane3.position.z = lerp(3.96, 5, scalePercent(27, 32))
//         plane3.rotation.z = lerp(0, 2, scalePercent(27, 32))

//         plane4.position.z = lerp(-1.15, -2, scalePercent(27, 32))
//         plane4.position.y = lerp(3.96, 2, scalePercent(27, 32))
//         plane4.rotation.z = lerp(0, -2, scalePercent(27, 32))

//         plane5.position.z = lerp(-1.6, -2.5, scalePercent(27, 32))
//         plane5.rotation.z = lerp(0, -2, scalePercent(27, 32))
//         plane5.rotation.y = lerp(1.5, 0, scalePercent(27, 32))

//         plane6.position.z = lerp(1.88, 5, scalePercent(27, 32))
//         plane6.rotation.z = lerp(0, -2, scalePercent(27, 32))
//         plane6.rotation.y = lerp(1.5, -3, scalePercent(27, 32))

//         plane7.position.z = lerp(5.47, 5, scalePercent(27, 32))
//         plane7.rotation.z = lerp(0, 2, scalePercent(27, 32))
//         plane7.rotation.y = lerp(1.5, -1, scalePercent(127, 32))

//         plane71.position.z = lerp(5.47, 9, scalePercent(27, 32))
//         plane71.rotation.z = lerp(0, -2, scalePercent(27, 32))
//         plane71.rotation.y = lerp(1.5, 2.34, scalePercent(27, 32))

//         plane72.position.y = lerp(5.5, 6.5, scalePercent(27, 32))
//         plane72.rotation.z = lerp(0, -2, scalePercent(27, 32))
//         plane72.rotation.y = lerp(1.5, 2.34, scalePercent(27, 32))

//         // const brokenPlate = new Audio('music/assiette_cassee.wav');
//         // brokenPlate.play();
//         // camera.position.y = lerp(1, 3.1, scalePercent(17, 20))
//         // camera.rotation.x = lerp(0, 2, scalePercent(12, 14))
//     },
// })

// animationScripts.push({
//     start: 32,
//     end: 36,
//     func: () => {
        
//         camera.rotation.y = lerp(2, 0, scalePercent(32, 36))
//         camera.position.y = lerp(3.5, 8, scalePercent(32, 36))
//         camera.position.x = lerp(-7, -9, scalePercent(32, 36))
//         scene.remove(plane5)
//     },
// })

// animationScripts.push({
//     start: 36,
//     end: 39,
//     func: () => {
//         // camera.position.y = lerp(8, 12.5, scalePercent(36, 39))
//         // camera.position.z = lerp(2.6, -5, scalePercent(36, 39))
//         camera.rotation.y = lerp(0, -2, scalePercent(36, 39))
//         camera.position.y = lerp(8, 12.5, scalePercent(36, 39))
//         camera.position.x = lerp(-9, -6, scalePercent(36, 39))
//         // camera.position.x = lerp(2.6, 2.5, scalePercent(36, 39))
//     },
// })

// animationScripts.push({
//     start: 39,
//     end: 42,
//     func: () => {
//         camera.position.z = lerp(2.5, 1.5, scalePercent(39, 42))
//         // scene.add(planeImageVideo)
//     },
// })
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// animationScripts.push({
//     start: 42,
//     end: 48,
//     func: () => {
//         // Vert flash 
//         plane8.position.x = lerp(-9.64, -12.5, scalePercent(42, 48))
//         plane8.position.y = lerp(8.89, 9.63, scalePercent(42, 48))
//         // plane8.position.z = lerp(-3.39, -5, scalePercent(42, 48))

//         // Jaune tout a droite 
//         plane9.position.x = lerp(-7.46, -4.69, scalePercent(42, 48))
//         plane9.position.y = lerp(8.2, 8.33, scalePercent(42, 48))
//         // plane9.position.z = lerp(-3.13, 8.33, scalePercent(42, 48))

//         // // Jaune en haut 
//         plane10.position.x = lerp(-8.5, -10.42, scalePercent(42, 48))
//         plane10.position.y = lerp(9.03, 9.9, scalePercent(42, 48))
//         plane10.position.z = lerp(-4.43, -3.39, scalePercent(42, 48))


//         plane111.position.x = lerp(-8.6, -10.75, scalePercent(42, 48))
//         plane111.position.y = lerp(8.97, 7.81, scalePercent(42, 48))
//         plane111.position.z = lerp(-4.35, -1.05, scalePercent(42, 48))

//         // Bleu clair en bas a droite
//         plane12.position.x = lerp(-7.8, -5.47, scalePercent(42, 48))
//         plane12.position.y = lerp(6.95, 9.63, scalePercent(42, 48))
//         plane12.position.z = lerp(-4.2, -2.35, scalePercent(42, 48))

//         // Vert / Jaune tout a gauche 
//         plane13.position.x = lerp(-9.9, -5.24, scalePercent(42, 48))
//         plane13.position.y = lerp(7.7, 6.95, scalePercent(42, 48))
//         plane13.position.z = lerp(-2.3, -2.35, scalePercent(42, 48))

//         // Vert en bas 
//         plane14.position.x = lerp(-9, -7.51, scalePercent(42, 48))
//         plane14.position.y = lerp(6.99, 9.6, scalePercent(42, 48))
//         plane14.position.z = lerp(-3.91, -2.3, scalePercent(42, 48))

//         // Vert haut gauche 
//         plane15.position.x = lerp(-11.65, -14.9, scalePercent(42, 48))
//         plane15.position.y = lerp(9.2, 8.4, scalePercent(42, 48))
//         plane15.position.z = lerp(-6, -3.13, scalePercent(42, 48))

//         // Vert haut gauche 
//         plane112.position.x = lerp(-11.65, -15.89, scalePercent(42, 48))
//         plane112.position.y = lerp(9.2, 6.6, scalePercent(42, 48))
//         plane112.position.z = lerp(-6, -4.17, scalePercent(42, 48))

//         // Madere 
//         plane113.position.x = lerp(-11.65, -7.4, scalePercent(42, 48))
//         plane113.position.y = lerp(9.2, 6.8, scalePercent(42, 48))
//         plane113.position.z = lerp(-6, -2.09, scalePercent(42, 48))

//         // Lozere
//         plane114.position.x = lerp(-11.65, -10.2, scalePercent(42, 48))
//         plane114.position.y = lerp(9.2, 6.24, scalePercent(42, 48))
//         plane114.position.z = lerp(-6, -3.75, scalePercent(42, 48))

//         // Lozere
//         plane115.position.x = lerp(-11.65, 0.52, scalePercent(42, 48))
//         plane115.position.y = lerp(9.2, 10.67, scalePercent(42, 48))
//         plane115.position.z = lerp(-6, -5.73, scalePercent(42, 48))

//         // Maroc 3
//         plane116.position.x = lerp(-11.65, -13.8, scalePercent(42, 48))
//         plane116.position.y = lerp(9.2, 4.68, scalePercent(42, 48))
//         plane116.position.z = lerp(-6, -5.47, scalePercent(42, 48))

//         // Italie
//         plane117.position.x = lerp(-11.65, -7.64, scalePercent(42, 48))
//         plane117.position.y = lerp(9.2, 5.46, scalePercent(42, 48))
//         plane117.position.z = lerp(-6, -7.81, scalePercent(42, 48))

//         camera.position.z = lerp(1.5, 1, scalePercent(42, 48))
//         camera.rotation.y = lerp(0.05, 0.000000000, scalePercent(42, 48))
//         // directionalLight1.position.z = lerp(2.45, 1, scalePercent(42, 48))
//     },
// })

// animationScripts.push({
//     start: 48,
//     end: 50,
//     func: () => {
//         scene.add(planeImageVideo)

//         camera.rotation.y = lerp(0.03, 0.0001, scalePercent(48, 50))
//         camera.position.z = lerp(1, -2.5, scalePercent(48, 50))
//         camera.position.x = lerp(-9, -8.6, scalePercent(48, 50))
//         camera.position.y = lerp(8, 7.3, scalePercent(48, 50))

//         plane117.position.y = lerp(5.46, 3.46, scalePercent(48, 50))
//         plane114.position.y = lerp(6.24, 4.24, scalePercent(48, 50))



//         // plane11.position.z = lerp(-5.05, -3, scalePercent(27, 28))

//         planeImageVideo.position.z = lerp(-20, -10.35, scalePercent(48, 50))
//     },
// })


// animationScripts.push({
//     start: 50,
//     end: 55,
//     func: () => {
//         // camera.position.z = lerp(-1, -1, scalePercent(28, 35))

        
//         // planeImageVideo.position.set(-8.2, 8.46, -20)

//         // planeImageVideo.position.x = lerp(-7.6, -8.2, scalePercent(34, 35))
//         // planeImageVideo.position.y = lerp(7.9, 8.46, scalePercent(34, 35))
//         // planeImageVideo.position.z = lerp(-10.35, -20, scalePercent(34, 35))

//         plane11.position.x = lerp(-8.6, -8.47, scalePercent(50, 55))
//         plane11.position.y = lerp(7.97, 7.5, scalePercent(50, 55))
//         plane11.position.z = lerp(-5.05, -3.5, scalePercent(50, 55))
//     },
// })


// animationScripts.push({
//     start: 35,
//     end: 38,
//     func: () => {
        
//         camera.position.y = lerp(8, 14, scalePercent(35, 38))
//         camera.position.z = lerp(-1, -3, scalePercent(35, 38))
//         camera.rotation.y = lerp(0.0001, -1.6, scalePercent(35, 38))
//     },
// })

// animationScripts.push({
//     start: 38,
//     end: 41,
//     func: () => {
//         scene.remove(planeImageVideo)

//         camera.position.x = lerp(-9, 5, scalePercent(38, 41))
//     },
// })

// animationScripts.push({
//     start: 41,
//     end: 44,
//     func: () => {
//         camera.rotation.y = lerp(-1.6, -3.11, scalePercent(41, 44))
//         camera.position.z = lerp(-1.2, 3, scalePercent(41, 44))
//     },
// })

// animationScripts.push({
//     start: 44,
//     end: 48,
//     func: () => {
//         camera.position.z = lerp(3, 9, scalePercent(44, 48))
//         // plane16.rotation.y = lerp(-2.87, -3.7, scalePercent(44, 48))
//         plane16.position.x = lerp(6.76, 7.3 , scalePercent(44, 48))

//         // plane17.rotation.y = lerp(-2.87, -1.8, scalePercent(46, 48))
//         plane17.position.x = lerp(1.82, 2.3, scalePercent(44, 48))
        
//         // plane16.position.z = lerp()
//         // camera.position.z = lerp(-1.2, 3, scalePercent(41, 44))
//     },
// })

// fin 

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
    ;(document.getElementById('scrollProgress')).innerText =
        'Scroll Progress : ' + scrollPercent.toFixed(2) + '\n  Camera.position.x : ' + camera.position.x + '\nCamera.position.y : ' + camera.position.y + '\n Camera.position.z : ' + camera.position.z + '\nCamera.rotation.y : ' + camera.rotation.y + '\n Camera.rotation.x : ' + camera.rotation.x
}

/**
* Particles
*/
// Geometry
const objectsDistance = 4
const particlesCount = 700
const positions = new Float32Array(particlesCount * 3 )

for( let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0 ] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1 ] = objectsDistance * 0.5 - Math.random() * objectsDistance * 30
    positions[i * 3 + 2 ] = (Math.random() - 0.5) * 10
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
    // sizeAttenuation: true, 
    // size: 0.04
    map: createCircleTexture('#ffffff', 256),
    size: 0.05,
    transparent: true,
    depthWrite: false
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
* Lights
*/
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

const directionalLight1 = new THREE.DirectionalLight('#ffffff', 5)
directionalLight1.position.set(-8.90, 8, 2.45)
scene.add(directionalLight1)


// const stats = Stats()
// document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    mixer.update(clock.getDelta())

    render()


    // stats.update()
}

function render() {

    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()