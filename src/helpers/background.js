import * as THREE from 'three'

export function backgroundScene(scene, position, radiusTop, radiusBottom, heightBackground, radialSegments, heightSegments, translateGeometry){

    const geometry = new THREE.BoxGeometry()

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

    const positionsTest = [
        // [0, 0.65, 0],
        [position.x, position.y, position.z]
    ];

    const geometriesTest = [
        // new THREE.CylinderGeometry( 13, 13, 35, 45, 35 )
        new THREE.CylinderGeometry( radiusTop, radiusBottom, heightBackground, radialSegments, heightSegments )
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
    geometry.translate(translateGeometry.x, translateGeometry.y, translateGeometry.z)
}

