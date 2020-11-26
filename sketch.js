var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var END = 0;
var PLAY = 1;
var gameState = 1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;

  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  obsGroup = new Group();
  banGroup = new Group();

  score = 0;

}


function draw() {
  background("white");

  if (ground.x <= 0) {
    ground.x = ground.width / 2;

  }

  if (keyDown("space") && monkey.y >= 290) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  spawnObstacles();

  spawnBanana();

  text("Score:" + score, 270, 30);

  if (banGroup.isTouching(monkey)) {
    score = score + 1;
    banGroup.destroyEach();

  }

  if (monkey.isTouching(obsGroup)) {
    gameState = 0;
  }

  if (gameState === 0) {
    monkey.visible = false;
    ground.velocityX = 0;
    banGroup.destroyEach();
    obsGroup.destroyEach();

  }




  drawSprites();

}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 330, 40, 20);
    obstacle.addImage("obs", obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -3;
    obsGroup.add(obstacle);
    obsGroup.lifetime=0;
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 200, 30, 30);
    banana.velocityX = -3;
    banana.x = Math.round(random(200, 400));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.09;
    banGroup.add(banana);
    banGroup.lifetime=0;
  }
}