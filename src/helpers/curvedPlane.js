import * as THREE from 'three'

export function pictures(scene, imgPath, rotationY, position){

    const geometryCylinder = new THREE.CylinderGeometry( 0.65, 0.65, 0.42, 64, 25, 14, true, 0.97 );
    const materialCylinder = new THREE.MeshBasicMaterial({
        color: 0xffff00, 
        side: THREE.DoubleSide
    });    

    var loaderTab = new THREE.TextureLoader();

    // FeelinFood
    var feelinMaterial = new THREE.MeshLambertMaterial({
        map: loaderTab.load(imgPath),
        side: THREE.DoubleSide
    });

    const curvedPictures = new THREE.Mesh( geometryCylinder, feelinMaterial );
    curvedPictures.rotation.y = rotationY
    curvedPictures.position.set(position.x, position.y, position.z)
    scene.add( curvedPictures );
}

export function square(scene, imgPath, rotationY, position){

    const geometryCylinderLangage = new THREE.CylinderGeometry( 0.42, 0.42, 0.42, 64, 25, 14, true, 1.1 );

    var loaderTab = new THREE.TextureLoader();

    var material = new THREE.MeshLambertMaterial({
        map: loaderTab.load(imgPath),
    });

    const curvedPictures = new THREE.Mesh( geometryCylinderLangage, material );
    curvedPictures.rotation.y = rotationY
    curvedPictures.position.set(position.x, position.y, position.z)
    scene.add( curvedPictures );
}

export function allCurvedPictures(scene){

    // Profil picture
    const aproposPicture = pictures(scene, 'images/Profil/photoPaul.jpg', 2.86, {x:-1.31, y:2.86, z:-1.83})

    // FeelinFood
    const projectPicture1 = pictures(scene, 'images/Projets/feelinFood.jpg', 4.68, {x:0.2, y:4.42, z:1.3})

    // ColorFoot
    const projectPicture2 = pictures(scene, 'images/Projets/colorFoot.png', 5.1, {x:0.32, y:4.9, z:1.3})

    // School&U
    const projectPicture3 = pictures(scene, 'images/Projets/school.jpg', 5.2, {x:0.59, y:5.38, z:1.25})

    // AeroBay
    const projectPicture4 = pictures(scene, 'images/Projets/aerobay.png', 5.45, {x:0.9, y:5.87, z:1.04})

    // Forum 
    const projectPicture5 = pictures(scene, 'images/Projets/forum.png', 5.8, {x:0.9, y:5.38, z:1.04})

    // FoodCulture Street
    const projectPicture6 = pictures(scene, 'images/Projets/fcs.png', 5.5, {x:0.78, y:4.9, z:1.04})


    // Autriche
    const hobbiesPicture1 = pictures(scene, 'images/Hobbies/montagne2.png', 6.7, {x:1.3, y:6.6, z:0})

    // Madere
    const hobbiesPicture2 = pictures(scene, 'images/Hobbies/madere1.png', 7.03, {x:1.1, y:7.1, z:-0.2})

    // Maroc
    const hobbiesPicture3 = pictures(scene, 'images/Hobbies/maroc3.png', 7.2, {x:0.9, y:7.6, z:-0.37})

    // Madere
    const hobbiesPicture4 = pictures(scene, 'images/Hobbies/montagne6.jpg', 6.7, {x:1.3, y:7.1, z:0.3})

    // Lozere
    const hobbiesPicture5 = pictures(scene, 'images/Hobbies/lozere1.png', 6.9, {x:1.2, y:7.6, z:0.1})

    // Vietnam
    const hobbiesPicture6 = pictures(scene, 'images/Hobbies/vietnam.png', 7.2, {x:1.07, y:8.08, z:-0.2})


    // OpenClassRooms
    const formationsPicture12 = pictures(scene, 'images/School/open.png', 7.8, {x:-0.4, y:8.27, z:-0.7})

    // ESIEE [it]
    const formationsPicture2 = pictures(scene, 'images/School/esiee.png', 8.33, {x:-0.52, y:8.85, z:-0.79})

    // Sorbonne
    const formationsPicture1 = pictures(scene, 'images/School/sorbonne.png', 8.5, {x:-0.79, y:9.4, z:-0.7})


    // JS
    const formationsPicture6 = square(scene, 'images/Langage/js.png', 11.4, {x:0.4, y:11.27, z:0.45})

    // Three
    const formationsPicture7 = square(scene, 'images/Langage/three.png', 11.47, {x:0.84, y:11.28, z:0.2})

    // React
    const formationsPicture8 = square(scene, 'images/Langage/react.png', 11.47, {x:0.08, y:10.8, z:0.6})

    // XR
    const formationsPicture9 = square(scene, 'images/Langage/xr.png', 11.47, {x:0.54, y:10.8, z:0.3})

    // PHP
    const formationsPicture10 = square(scene, 'images/Langage/php.png', 11.4, {x:1.05, y:10.8, z:0.05})
}