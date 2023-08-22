import * as THREE from './three.module.js';
import * as star from './star.js';


//variables
const starCount = 500;

//data
let lastScrollPos = 0;
let stars = [];


//elements
const bg = document.querySelector('#bg');
const profileText = document.querySelector('.profile-text');

//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, bg.clientWidth / bg.clientHeight, 0.1, 1000);


//texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./../image/hw.png');

//material
const materialBasic = new THREE.MeshBasicMaterial({ color: "#fbf665", wireframe: true });
const materialStandard = new THREE.MeshStandardMaterial({ color: "#000000" });
materialStandard.roughness = 0.5;
materialStandard.normalMap = texture;



const renderer = new THREE.WebGLRenderer({ canvas: bg });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(bg.clientWidth, bg.clientHeight);
renderer.setClearColor("#000000", 0);
document.body.appendChild(renderer.domElement);


//light
const light1 = new THREE.PointLight("red", 1, 50);
light1.intensity = 100;
light1.position.set(20, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight("purple", 1, 50);
light2.intensity = 140;
light2.position.set(-20, 15, 5);
scene.add(light2);

const light3 = new THREE.PointLight("white", 1, 10);
light3.intensity = 100;
light3.position.set(10, -10, -40);
scene.add(light3);

//control
camera.position.z = 5;



//canvas responsive when window resize
window.addEventListener('resize', function () {
    bg.style.width = window.innerWidth + 'px';
    bg.style.height = window.innerHeight + 'px';
    camera.aspect = bg.clientWidth / bg.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(bg.clientWidth, bg.clientHeight);
});

//functions 
init();

function init() {
    lastScrollPos = window.scrollY;

    animate();
    addStars();
}




function addStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new star.star(scene));
    }

}




//movement control
document.addEventListener("scroll", function (e) {
    for (const star of stars) {
        star.scrollY(window.scrollY - lastScrollPos);
    }

    lastScrollPos = window.scrollY;

});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    for (const star of stars) {
        star.move();
    }

}
