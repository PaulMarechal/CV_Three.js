import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()

export function font(scene, text, size, height, texture, position, rotation){
    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
            const textGeometry = new TextGeometry(
                text,
                {
                    font: font,
                    size: size,
                    height: height,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            )

            const matcapTexture = textureLoader.load(texture)
            const textMaterial = new THREE.MeshMatcapMaterial({matcap : matcapTexture})
            const text3D = new THREE.Mesh(textGeometry, textMaterial)

            // test disposition1 
            text3D.position.set(position.x, position.y, position.z)
            text3D.rotation.set(rotation.x, rotation.y, rotation.z)

            scene.add(text3D)
        }
    )
}