import * as THREE from "./three.js/three.module.js"
import { OrbitControls } from "./three.js/OrbitControls.js"
import { GLTFLoader } from "../js/three.js/loaders/GLTFLoader.js"

window.main = {
    initScene: function (canvasId) {
        //get parent container
        const container = document.getElementById('bg')
        const width = container.clientWidth;
        const height = container.clientHeight;

        //scene and camera
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;
        camera.position.y = 2;

        //renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(`#${canvasId}`),
        });
        renderer.setAnimationLoop(animate);
        renderer.setSize(width, height);

        //loader
        const loader = new GLTFLoader();

        //load model
        loader.load('../3dModels/BaseModel/scene.gltf',
            function (gltf) {
                scene.add(gltf.scene)
            },
            undefined,
            function (error) {
                console.error(error)
            }
        )

        //light
        const light = new THREE.PointLight(0xffffff, 40, 10);
        const lightHelper = new THREE.PointLightHelper(light, 1, 0x000000);
        light.position.set(2, 4, 2);
        scene.add(light, lightHelper);

        //orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);

        //grid helper
        const grid = new THREE.GridHelper(100, 10, 0xffffff);
        scene.add(grid);
        function animate() {

            controls.update();
            renderer.render(scene, camera);
        }
    }
}