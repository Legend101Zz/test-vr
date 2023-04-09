import * as THREE from 'three'

import {
    RollerCoasterGeometry,
    RollerCoasterShadowGeometry,
    RollerCoasterLiftersGeometry,
    TreesGeometry,
    SkyGeometry,
} from 'three/examples/jsm/misc/RollerCoaster.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

let mesh, geometry

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.xr.enabled = true
renderer.xr.setReferenceSpaceType('local')
document.body.appendChild(renderer.domElement)

document.body.appendChild(VRButton.createButton(renderer))

let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})

const loader2 = new GLTFLoader()
loader2.load(
    'models/3 kathkuni.glb',
    function (gltf) {
        gltf.scene.position.x = -100
        gltf.scene.position.z = -50
        gltf.scene.scale.x = 2
        gltf.scene.scale.y = 2
        gltf.scene.scale.z = 2

        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

loader2.load(
    'models/3 kathkuni.glb',
    function (gltf) {
        gltf.scene.position.x = 100
        gltf.scene.position.z = -50
        gltf.scene.scale.x = 2
        gltf.scene.scale.y = 2
        gltf.scene.scale.z = 2

        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const scene = new THREE.Scene()

const loader3 = new GLTFLoader()
loader3.load(
    'models/gate.glb',
    function (gltf) {
        gltf.scene.position.x = 5
        gltf.scene.position.y = 17
        gltf.scene.scale.x = 2
        gltf.scene.scale.y = 2
        gltf.scene.scale.z = 2

        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const loader4 = new GLTFLoader()
loader4.load(
    'models/model with terrain.glb',
    function (gltf) {
        gltf.scene.position.x = 50

        gltf.scene.position.z = -50
        gltf.scene.position.y = -80
        gltf.scene.rotation.y = 180
        gltf.scene.scale.x = 2
        gltf.scene.scale.y = 2
        gltf.scene.scale.z = 2

        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const loader5 = new GLTFLoader()
loader5.load(
    'models/model with terrain',
    function (gltf) {
        gltf.scene.position.x = 100

        gltf.scene.position.z = 60
        // gltf.scene.position.y = -80
        gltf.scene.rotation.y = 180
        gltf.scene.rotation.x = 180
        // gltf.scene.rotation.z = 180
        gltf.scene.scale.x = 2
        gltf.scene.scale.y = 2
        gltf.scene.scale.z = 2

        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

scene.background = new THREE.Color(0x00f0ff)
scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025)
// scene.fog = new THREE.Fog(0xcccccc, 10, 25)
const light = new THREE.HemisphereLight(0xfff0f0, 0x606066)
light.position.set(0, 1, 1)
scene.add(light)

const train = new THREE.Object3D()
scene.add(train)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500)
train.add(camera)

// environment
const controls = new OrbitControls(camera, renderer.domElement)
console.log(controls)
controls.update()
geometry = new (<any>THREE).PlaneBufferGeometry(500, 500, 15, 15)

geometry.rotateX(-Math.PI / 2)

const positions = geometry.attributes.position.array
const vertex = new THREE.Vector3()

for (let i = 0; i < positions.length; i += 3) {
    vertex.fromArray(positions, i)

    vertex.x += Math.random() * 10 - 5
    vertex.z += Math.random() * 10 - 5

    const distance = vertex.distanceTo(scene.position) / 5 - 25
    vertex.y = Math.random() * Math.max(0, distance)

    vertex.toArray(positions, i)
}

geometry.computeVertexNormals()

material = new THREE.MeshLambertMaterial({
    color: 0x388004,
})

mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

geometry = new TreesGeometry(mesh)
material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    vertexColors: true,
})
mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// @ts-ignore

geometry = new SkyGeometry()
material = new THREE.MeshBasicMaterial({ color: 0xffffff })
mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//

const PI2 = Math.PI * 2

const curve = (function () {
    const vector = new THREE.Vector3()
    const vector2 = new THREE.Vector3()

    return {
        getPointAt: function (t: number) {
            t = t * PI2

            const x = Math.sin(t * 3) * Math.cos(t * 4) * 50
            const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5
            const z = Math.sin(t) * Math.sin(t * 4) * 50

            return vector.set(x, y, z).multiplyScalar(2)
        },

        getTangentAt: function (t: number) {
            const delta = 0.0001
            const t1 = Math.max(0, t - delta)
            const t2 = Math.min(1, t + delta)

            return vector2.copy(this.getPointAt(t2)).sub(this.getPointAt(t1)).normalize()
        },
    }
})()
// @ts-ignore
geometry = new RollerCoasterGeometry(curve, 0)
material = new THREE.MeshPhongMaterial({
    vertexColors: true,
})
mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// @ts-ignore
geometry = new RollerCoasterLiftersGeometry(curve, 0)
material = new THREE.MeshPhongMaterial()
mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 0.1
scene.add(mesh)
// @ts-ignore
geometry = new RollerCoasterShadowGeometry(curve, 0)
material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    depthWrite: true,
    transparent: true,
})
mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 0.1
scene.add(mesh)

const funfairs: any = []

window.addEventListener('resize', onWindowResize, false)

const stats = Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

//

const position = new THREE.Vector3()
const tangent = new THREE.Vector3()

const lookAt = new THREE.Vector3()

let velocity = 0
let progress = 0

let prevTime = performance.now()

function render() {
    controls.update()
    const time = performance.now()
    const delta = time - prevTime

    for (let i = 0; i < funfairs.length; i++) {
        funfairs[i].rotation.y = time * 0.0004
    }

    //

    progress += velocity
    progress = progress % 1

    position.copy(curve.getPointAt(progress))
    position.y += 0.3

    train.position.copy(position)

    tangent.copy(curve.getTangentAt(progress))

    velocity -= tangent.y * 0.0000001 * delta
    velocity = Math.max(0.00004, Math.min(0.0002, velocity))

    train.lookAt(lookAt.copy(position).sub(tangent))

    //
    //   if (modelReady) mixer.update(clock.getDelta());

    stats.update()
    renderer.render(scene, camera)

    prevTime = time
}

function animate() {
    controls.update()
    requestAnimationFrame(animate)
    // videoTexture.needsUpdate = true;
}

animate()
renderer.setAnimationLoop(render)
