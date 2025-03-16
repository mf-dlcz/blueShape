import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer( { antialias:true } );
renderer.setSize( w, h );
document.body.appendChild( renderer.domElement );

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = 2;
const scene = new THREE.Scene();

//Makes the share move and zoom in/out
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new THREE.IcosahedronGeometry( 1.0, 2 );
const material = new THREE.MeshStandardMaterial( 
  { 
    color: 0xfff,
    flatShading: true
  }
);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight();
scene.add(hemiLight);

const wireMaterial = new THREE.MeshBasicMaterial(
  {
    color: 0xffffff,
    wireframe: true
  }
);

const wireMesh = new THREE.Mesh(geometry, wireMaterial);
mesh.add(wireMesh);

function animate( t = 0) {
  requestAnimationFrame(animate);
  // mesh.rotation.x = t * 0.0002;
  // mesh.rotation.y = t * 0.0003;
  controls.update();
  renderer.render( scene, camera );
}

animate();