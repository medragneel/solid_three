
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

function App() {
    const scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(5))

    const light = new THREE.PointLight()
    light.position.set(0.8, 1.4, 1.0)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight()
    scene.add(ambientLight)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.rotation.y = 90 / 180 * Math.PI
    camera.position.x = 50
    camera.position.y = 50
    camera.position.z = 200


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)


    let mixer = THREE.AnimationMixer
    let modelReady = false
    const animationActions = []
    let activeAction
    let lastAction
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        '../Mma Kick.fbx',
        (object) => {
            object.scale.set(0.9, 0.9, 0.9)
            mixer = new THREE.AnimationMixer(object)

            const animationAction = mixer.clipAction(
                object.animations[0]
            )
            const clips = object.animations
            const clip = THREE.AnimationClip.findByName(clips, "mixamo.com")
            const action = mixer.clipAction(clip)
            action.play()


            scene.add(object)


        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )



    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }
    const stats = new Stats()
    document.body.appendChild(stats.dom)


    // const gui = new GUI()
    // const animationsFolder = gui.addFolder('Animations')
    // animationsFolder.open()


    const clock = new THREE.Clock()
    function animate() {
        requestAnimationFrame(animate)

        controls.update()

        mixer.update(clock.getDelta())


        render()

        stats.update()
    }


    function render() {
        renderer.render(scene, camera)
    }

    animate()


    return <></>

}



export default App;
