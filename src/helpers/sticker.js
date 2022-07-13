import * as THREE from 'three'; 
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

// const gui = new GUI({
//     width: 400
// })

export function createSticker(scene, imagePath, rotationY, position, name)
{
    const geometry = new THREE.PlaneGeometry(5, 5);
    const textureLoader = new THREE.TextureLoader()

    const material = new THREE.MeshPhongMaterial({
        color: '#fff000',
        map: textureLoader.load(imagePath), 
        alphaTest: 0.5,
        transparent: false,
        side: THREE.DoubleSide,

    });
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(-3.13, 4.8, -2.61);
    
    // mesh.position.set(position.x, position.y, position.z);
    mesh.visibility = true
    mesh.rotation.y = rotationY;
    mesh.name = name;
    scene.add(mesh);

    return mesh;
}