import * as THREE from './three.module.js';
import * as star from './star.js';
import * as VARIABLES from './variables.js';
import { GLTFLoader } from './GLTFLoader.js';
import { DRACOLoader } from './DRACOLoader.js';
import { FBXLoader } from './FBXLoader.js';


//data
let lastScrollPos = 0;
let stars = []; 


//elements
const bg = document.querySelector('#bg');

//scene
const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
scene.background = textureLoader.load("./../image/b2.jpeg");
const camera = new THREE.PerspectiveCamera(50, bg.clientWidth / bg.clientHeight, 1, 1000);

//fog
//scene.background = new THREE.Color(VARIABLES.backgroundColor);
//scene.fog = new THREE.Fog(VARIABLES.backgroundColor, 1, 30);

//house model
let gltfModel;
let originalModelPosY = 0;

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );


loader.load('./../3dModels/cyberpunk_building/room.glb', function (gltf) {
    gltfModel = gltf;
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0.3, -10, -5);
    scene.add(gltf.scene);
    originalModelPosY = gltf.scene.position.y;
}, undefined, function (error) {
    console.error(error);
});

const renderer = new THREE.WebGLRenderer({ canvas: bg });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(bg.clientWidth, bg.clientHeight);
renderer.setClearColor("#673147", 0);
document.body.appendChild(renderer.domElement);


//light
const light1 = new THREE.PointLight(VARIABLES.leftLight, 1, 50);
light1.intensity = 1;
light1.position.set(20, 2, -5);
scene.add(light1);

const light2 = new THREE.PointLight(VARIABLES.rightLight, 1, 50);
light2.intensity = 1;
light2.position.set(-20, -2, -5);
scene.add(light2);

// const light3 = new THREE.PointLight("white",0, 0);
// light3.intensity = 0.4;
// light3.position.set(0, 0, -5);
// scene.add(light3);

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
    for (let i = 0; i < VARIABLES.starCount; i++) {
        stars.push(new star.star(scene));
    }

}




//movement control
let moveSpeed = 0.01;
let modelMaxPosY = 7;
var canSpin = false;
document.addEventListener("scroll", function (e) {
    for (const star of stars) {
        star.scrollY(window.scrollY - lastScrollPos);
    }

    lastScrollPos = window.scrollY;

    // house model
    // gltfModel.scene.position.y = originalModelPosY + window.scrollY * moveSpeed;

    // if (gltfModel.scene.position.y > originalModelPosY + modelMaxPosY) {
    //     gltfModel.scene.position.y = originalModelPosY + modelMaxPosY;
    //     canSpin = true;
    // }

});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    for (const star of stars) {
        star.move();
    }

    if(canSpin){
        gltfModel.scene.rotation.y += 0.01;
    }

}



//moving lines
// general setup, boring, skip to the next comment

// renderer.setSize( innerWidth, innerHeight );
// renderer.setAnimationLoop( animationLoop );
// document.body.appendChild( renderer.domElement );
        

// // next comment

// const N = 20; // number of vertices in a line
// const L = 150; // number of lines

// var colors = [],
//     color = new THREE.Color();
// for( var i=0; i<N; i++ )
// {
//     color.setHSL( 0.8, 0.4, 1 );
//     colors.push( 0.6, 0.3, 0.3 );
// }

// var material = new THREE.LineBasicMaterial( {
//             vertexColors: true,
//             blending: THREE.AdditiveBlending,
//             transparent: true,
//     } );

// var geometry, line, lines = [];
// for( var i=0; i<L; i++ )
// {
//     geometry = new THREE.BufferGeometry();
//     geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( colors, 3 ));
//     geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ));

//     line = new THREE.Line( geometry, material );
//     line.pos = geometry.getAttribute( 'position' );
//     line.rnd = Math.random();

//     lines.push( line );
// }
// scene.add( ...lines );


// function path( buf, t, i, rnd )
// {
//     t += 10*rnd;

//     var x = (0.1+3*rnd)*Math.sin(t+13*rnd) + 2*rnd*Math.cos(3.2*t+3);
//     var y = (3-3*rnd)*Math.cos(t) + 2*rnd*Math.cos(4.5*t-7*rnd);
//     var z = (30*rnd**20)*Math.sin(2.7*t-4*rnd);
//     buf.setXYZ( i, x, y, z );
// }


// function animationLoop( t )
// {
    
//     for( var line of lines )
//     {
//             for( var i=0; i<N; i++ )
//                 path( line.pos, t/3000-i/50, i, line.rnd );
        
//             line.pos.needsUpdate = true;
//     }

// renderer.render( scene, camera );
// }
