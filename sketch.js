//Variables for canvas
let heightCanvas;
let widthCanvas;
let cnvs;

//Variables for simulation
let obstacles;
let boids;
let boidsSize = 10;
let obstacleSize = 30;
let obstacleRadious = 150;
let friendsRadious = 25;

function setup() {

  //Important for working with degrees.
  angleMode(DEGREES);

  //Settting up canvas
  heightCanvas = windowHeight*.7;
  console.log(heightCanvas);
  widthCanvas = windowWidth*.8;
  console.log(widthCanvas);
  cnvs = createCanvas(widthCanvas,heightCanvas);
  frameRate(30);
  cnvs.style('display','block');
  cnvs.mouseClicked(addElement);

  //Initializing importante variables
  let initialBoids = 40;
  boids = [];
  obstacles = [];
  for(let i = 0; i < initialBoids; i++){
    boids.push(new Boid(boidsSize,[widthCanvas/2+Math.random()*80,heightCanvas/2+Math.random()*80],boids.length));
  }
  for(let i = 0; i < 50; i++){
    obstacles.push(new Obstacle(obstacleSize,i*1,0));
    obstacles.push(new Obstacle(obstacleSize,i*10,heightCanvas))
  }
  for(let i = 0; i < 40; i++){
    obstacles.push(new Obstacle(obstacleSize,0,i*20));
    obstacles.push(new Obstacle(obstacleSize,widthCanvas,i*20))
  }

}
function addElement(){
  let val = document.getElementsByName('addingElement');
  for(let aux of val){
    if(aux.checked){
      if(aux.value == "Boid")
        boids.push(new Boid(boidsSize,[mouseX,mouseY],boids.length));
      else
        obstacles.push(new Obstacle(obstacleSize,mouseX,mouseY));
    }
  } 
}
function draw() {
  background(0);
  for(let obstacle of obstacles){
    obstacle.drawObstacle();
  }
  for(let boid of boids){
    boid.sense(boids,friendsRadious,obstacles,obstacleRadious);
  }
  for(let boid of boids){
    boid.decide(widthCanvas,heightCanvas);
  }
  for(let boid of boids){
    boid.act();
  }
}