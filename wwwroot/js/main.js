import * as THREE from "./three.js/three.module.js"
import { OrbitControls } from "./three.js/OrbitControls.js"

window.main = {
    initScene: function (canvasId) {
        //get parent container
        const container = document.getElementById('bg')
        const width = container.clientWidth;
        const height = container.clientHeight;

        //scene and camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        //renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(`#${canvasId}`),
        });
        renderer.setAnimationLoop(animate);
        renderer.setSize(width, height);

        //cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        const controls = new OrbitControls(camera, renderer.domElement);

        const grid = new THREE.GridHelper(100, 10, 0xffffff);
        scene.add(grid);
        function animate() {
            
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            controls.update();
            renderer.render(scene, camera);
        }
    }
}