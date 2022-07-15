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
    // geometry.translate(0, -4, 0);
    geometry.translate(translateGeometry.x, translateGeometry.y, translateGeometry.z)
}

export function transparentObj(scene, positionObj1, positionObj2, positionObj3, positionObj4, geometryObj1, geometryObj2, geometryObj3, geometryObj4, translateGeometry){
    
    const geometry = new THREE.BoxGeometry()

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
        [positionObj1.x, positionObj1.y, positionObj1.z], 
        [positionObj2.x, positionObj2.y, positionObj2.z], 
        [positionObj3.x, positionObj3.y, positionObj3.z], 
        [positionObj4.x, positionObj4.y, positionObj4.z]
    ]

    const geometriesTestCube = [
        new THREE.IcosahedronGeometry(geometryObj1.vertices, geometryObj1.inndices, geometryObj1.radius),  // sphere
        new THREE.DodecahedronGeometry(geometryObj2.radius, geometryObj2.details), 
        new THREE.IcosahedronGeometry(geometryObj3.radius, geometryObj3.details), 
        new THREE.TorusKnotGeometry(geometryObj4.radius, geometryObj4.tube, geometryObj4.tubularSegments, geometryObj4.radialSegments, geometryObj4.p, geometryObj2.q)
    ]

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
    // geometry.translate(0, -4, 0);
    geometry.translate(translateGeometry.x, translateGeometry.y, translateGeometry.z)

}