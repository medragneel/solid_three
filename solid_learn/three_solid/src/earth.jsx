import { render } from 'solid-js/web';
import * as THREE from 'three'
// import { createSignal } from 'solid-js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



export const Earth = () => {
    // const [rotation, setRotation] = createSignal([0, 0, 0]);


    // function animate() {
    //     requestAnimationFrame(animate);
    //
    //     // Update the rotation state
    //     setRotation(prev => [prev[0] + 0.01, prev[1] + 0.01, prev[2]]);
    //
    //     // Update the rotation of the cube
    //     cube.rotation.x = rotation()[0];
    //     cube.rotation.y = rotation()[1];
    //     cube.rotation.z = rotation()[2];
    //
    //     // Render the scene
    //     renderer.render(scene, camera);
    // }





    function animate() {
        requestAnimationFrame(animate)
        world.rotation.y += 0.005
        renderer.render(scene, camera)


    }


    // Set up the Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 10)
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement)

    const worldTexture = new THREE.TextureLoader().load('../earth.jpg')
    const geometry = new THREE.SphereGeometry(1, 40, 40)
    const material = new THREE.MeshBasicMaterial({
        map: worldTexture,
    })

    const world = new THREE.Mesh(geometry, material)
    scene.add(world)

    animate()
    //
    //
    // const loader = new GLTFLoader()
    // loader.load('../models/shirt_baked.glb',
    //     // called when the resource is loaded
    //     function(gltf) {
    //
    //
    //         scene.add(gltf.scene);
    //     },
    //     // called while loading is progressing
    //     function(xhr) {
    //
    //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    //
    //     },
    //     // called when loading has errors
    //     function(error) {
    //
    //         console.log('An error happened');
    //         console.error(error)
    //
    //     })
    // renderer.render(scene, camera)
    // Create a cube and add it to the scene
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 0, 0); // Set the position to the center of the scene
    // scene.add(cube);
    //
    // const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // const points = [];
    // points.push(new THREE.Vector3(- 10, 0, 0));
    // points.push(new THREE.Vector3(0, 10, 0));
    // points.push(new THREE.Vector3(10, 0, 0));
    //
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const line = new THREE.Line(geometry, material); scene.add(line);
    // renderer.render(scene, camera);

    // Start the animation loop
    // animate();


    // Render the Solid.js UI
    return
}
