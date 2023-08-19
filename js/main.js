import * as THREE from './three.module.js';
import * as star from './star.js';

import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


//data
let lastScrollPos = 0;
let stars = [];
const colorTemplate = ["#ff6e27", "#fbf665", "#73fffe", "#6287f8", "#383e65"]

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

//fbs loader
//humanoid
const loader = new FBXLoader();


//cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, materialBasic);


//capsule geometry
const capsuleGeo = new THREE.CapsuleGeometry(0.5, 0.5, 15, 15);
const capsule = new THREE.Mesh(capsuleGeo, materialBasic);


//torus
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
const torus = new THREE.Mesh(torusGeometry, materialStandard);

//sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, materialStandard);


//light
const light1 = new THREE.PointLight("red", 1, 50);
light1.intensity = 40;
light1.position.set(20, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight("blue", 1, 50);
light2.intensity = 40;
light2.position.set(-20, 5, 5);
scene.add(light2);

const light3 = new THREE.PointLight("white", 1, 10);
light3.intensity = 20;
light3.position.set(0, 5, 5);
scene.add(light3);

//control

camera.position.z = 5;

cube.position.x = -3;
capsule.position.x = 3;



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
    /*
    //load humanoid model
    loader.load('./../models/humanoid.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.004, 0.004, 0.004);
        object.position.set(0, -2, -50);

        humanoid = object;
        humanoid.show = false;
    });


    //grad hat
    loader.load('./../models/grad-hat.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, -1, -50);

        gradHat = object;
        gradHat.show = false;
    });

    //computer
    loader.load('./../models/computador.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, -1, -50);

        computer = object;
        computer.show = false;
    });

    //bulb
    loader.load('./../models/bulb.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.04, 0.04, 0.04);
        object.position.set(0, -1, -50);

        bulb = object;
        bulb.show = false;
    });

    //book
    loader.load('./../models/book.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.001, 0.001, 0.001);
        object.position.set(0, -1, -50);

        book = object;
        book.show = false;
    });


    profileText.style.opacity = 0;
    profileText.style.transform = "translateX(-100px)";

    educationText.style.opacity = 0;
    educationText.style.transform = "translateX(100px)";

    experienceText.style.opacity = 0;
    experienceText.style.transform = "translateX(-100px)";

    projectText.style.opacity = 0;
    projectText.style.transform = "translateX(100px)";

    skillText.style.opacity = 0;
    skillText.style.transform = "translateX(-100px)";


    sphere.position.y += (window.scrollY - lastScrollPos) * 0.005;
    sphere.position.z += (window.scrollY - lastScrollPos) * 0.01;
    
    */
    lastScrollPos = window.scrollY;

    animate();
    addStars();

}




function addStars() {
    for (let i = 0; i < 500; i++) {
        stars.push(new star.star(scene));
    }

}




//movement control
document.addEventListener("scroll", function (e) {
    for (const star of stars) {
        star.scrollY(window.scrollY - lastScrollPos);
    }

    sphere.position.y += (window.scrollY - lastScrollPos) * 0.005;
    sphere.position.z += (window.scrollY - lastScrollPos) * 0.01;

    lastScrollPos = window.scrollY;


    //profile text
    if (profileText.getClientRects()[0].top - window.innerHeight < -200 &&
        profileText.getClientRects()[0].bottom > 200) {
        profileText.style.opacity = 1;
        profileText.style.transform = "translateX(0)";
    } else {
        profileText.style.opacity = 0;
        profileText.style.transform = "translateX(-100px)";
    }
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);



    for (const star of stars) {
        star.move();
    }

}
