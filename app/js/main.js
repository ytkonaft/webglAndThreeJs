
// options object
var sqrOptions = {
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			posX: 0,
			posY: 0,
			posZ: 0
		};
// qui controls 		
var gui = new dat.GUI();
		gui.add(sqrOptions, 'rotateX',-0.2, 0.2, 0.001);﻿
		gui.add(sqrOptions, 'rotateY',-0.2, 0.2, 0.001);﻿
		gui.add(sqrOptions, 'rotateZ',-0.2, 0.2, 0.001);﻿
		gui.add(sqrOptions, 'posX',-0.2, 0.2, 0.001);﻿
		gui.add(sqrOptions, 'posY',-0.2, 0.2, 0.001);﻿
		gui.add(sqrOptions, 'posZ',-0.2, 0.2, 0.001);﻿		 


//initial scen and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


// initioal renderer
var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x999999)
		document.body.appendChild(renderer.domElement);


//reload camera aspect and renderer size on resize
window.addEventListener('resize', function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
})

var controls = new THREE.OrbitControls( camera, renderer.domElement)

var light = new THREE.AmbientLight(0x000000);
		scene.add( light );

//create the shape
var geometry = new THREE.BoxGeometry(1,1,1);

// One texture for all sides
// var cubeMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'),side: THREE.DoubleSide});



var cubeMaterial = [
	new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'),side: THREE.DoubleSide}),// right side
	new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'),side: THREE.DoubleSide}),// left side
	new THREE.MeshBasicMaterial({color: 0xff7777,side: THREE.DoubleSide}),// top side
	new THREE.MeshBasicMaterial({color: 0x777777,side: THREE.DoubleSide}),// bottoms ide
	new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'),side: THREE.DoubleSide}),// front side
	new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/1.jpg'),side: THREE.DoubleSide}) // back side
];



var material = new THREE.MeshFaceMaterial(cubeMaterial)	
// create gyomentry coube
var cube = new THREE.Mesh( geometry, material );


//adding cube to the scene
scene.add( cube );

camera.position.set(0,0,3);



// game logic
function update(){
	cube.rotation.x += sqrOptions.rotateX;
	cube.rotation.y += sqrOptions.rotateY;
	cube.rotation.z += sqrOptions.rotateZ;
	cube.position.x += sqrOptions.posX;
	cube.position.y += sqrOptions.posY;
	cube.position.z += sqrOptions.posZ;		
}

//draw scene
	function render(){
		renderer.render(scene, camera);
	}

//run game loop (update, render, repeat)
	function GameLoop(){
		requestAnimationFrame( GameLoop );
		update();
		render();
	}

//start
	GameLoop();