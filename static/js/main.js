"use strict";

var scene, camera, renderer;

function main() {
  var canvas = document.querySelector('.webgl');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45.6, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;
  scene.add(camera);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  renderer.setClearColor(0x00000, 0.0); //марс

  var marsGeometry = new THREE.SphereGeometry(0.48, 32, 32);
  var marsMaterial = new THREE.MeshPhongMaterial({
    roughess: 1,
    meralness: 0,
    map: new THREE.TextureLoader().load('/static/images/content/mars.jpg'),
    bumpMap: new THREE.TextureLoader().load('/static/images/content/mars.jpg'),
    bumpScale: 0.005
  }); // map: new THREE.TextureLoader().load( '/static/images/content/mars.jpg' ),
  //     bumpMap: new THREE.TextureLoader().load( '/static/images/content/mars.jpg' ),

  var marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
  scene.add(marsMesh);
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  var pointerLight = new THREE.PointLight(0xf5d021, 3);
  pointerLight.position.set(100, -100, -30);
  scene.add(pointerLight);

  var animate = function animate() {
    requestAnimationFrame(animate);
    marsMesh.rotation.y += 0.001;
    render();
  };

  var render = function render() {
    renderer.render(scene, camera);
  };

  animate();
}

window.onload = main;
addEventListener("resize", function () {
  main();
});
document.addEventListener('DOMContentLoaded', function () {
  let gameLoader = document.querySelector(".game-loader");
setTimeout(() => { gameLoader.style.display = 'none' }, 5000);
 const sandwichToggle = function () {
        // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
        let sandwichElements = document.querySelectorAll('.sandwich');
        // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс
        sandwichElements.forEach((item) => {
            item.addEventListener('click', showSandwichTarget);
        });
    
        function showSandwichTarget() {

                let navTarget = document.querySelector('.nav-wrap');
      this.classList.toggle('is-active');
      navTarget.classList.toggle('is-active') 
        }
        
    };
    sandwichToggle();
});