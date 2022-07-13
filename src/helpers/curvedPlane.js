import * as THREE from 'three'

export function pictures(scene, imgPath, rotationY, position){

    const geometryCylinder = new THREE.CylinderGeometry( 0.65, 0.65, 0.42, 64, 25, 14, true, 1.1 );
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