/**************** Dynamic mesh ***************/
const debugObject = {}
/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(10, 10, 512, 512)

// Colors
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'
debugObject.depthColor = '#fff'
debugObject.surfaceColor = '#000'

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
water.position.y = 1
scene.add(water)

/**
 * Ground 
 */
const geometryCircle = new THREE.CircleGeometry( 5, 32 );
const materialCircle = new THREE.MeshStandardMaterial( { 
    color: 0xffffff,
    metalness: 0.6,
    emissive: 0xffffff
    // side: THREE.DoubleSide
} );
const circle = new THREE.Mesh( geometryCircle, materialCircle );
scene.add( circle );