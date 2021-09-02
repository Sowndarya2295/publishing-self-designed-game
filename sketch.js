var astronaut,astronautImg;
var bg,bgImage;
var obstacle;
var asteroidImg,cometImg,planet1Img,planet2Img;
//var gameState="start";
var obstaclesGrp;
var loseImg,lostScreen;
var score =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var lostSound,victorySound;
function preload(){
 bgImage = loadImage("Images/bgImage.png");
 astronautImg= loadImage("Images/astronaut.png");
 asteroidImg= loadImage("Images/asteroid.png");
 cometImg= loadImage("Images/comet.png");
 planet1Img= loadImage("Images/planet1.png");
 planet2Img= loadImage("Images/planet2.png");
 loseImg =loadImage("Images/lose.png");
 lostSound = loadSound("sounds/mixkit-retro-arcade-game-over-470.mp3");
 victorySound = loadSound("sounds/mixkit-retro-game-notification-212.mp3");
}

function setup(){
  createCanvas(displayWidth-10,displayHeight-145);
  
  //creating bg
  bg = createSprite(0,0);
  bg.addImage(bgImage);
  bg.scale = 1.5;
 
  //creating pc
  astronaut = createSprite(displayWidth/2,displayHeight-175, 50, 50);
  astronaut.addImage(astronautImg);
  astronaut.scale = 0.3;

  lostScreen=createSprite(650,380,50,50);
  lostScreen.addImage(loseImg);
  lostScreen.visible = false;

  obstaclesGrp = new Group();
  
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);  
 astronaut.debug = true;
 astronaut.setCollider("circle",0,0,50);

  if(gameState===PLAY){

    score = score + Math.round(frameCount/50);
    if(bg.y > displayHeight-145){
      bg.y = bg.height/2
   }

   bg.velocityY = 1.5;
   bg.y = bg.height/2;

      //move pc
  if(keyDown("up")){
    astronaut.y = astronaut.y - 10;
  }
  
  if(keyDown("down")){
    astronaut.y = astronaut.y + 10;
  } 
  
  if(keyDown("left")){
    astronaut.x = astronaut.x - 10;
  }
  
  if(keyDown("right")){
    astronaut.x = astronaut.x + 10;
  }
  if(obstaclesGrp.isTouching(astronaut)){
    gameState = END;
    lostSound.play();
  }
  if(score>=2000){
    obstacle.velocityY = 8;
    var randomNo = Math.round(random(-10,10));
    obstacle.velocityX = randomNo ;
  }
  if(score>2000 && score<3000){
      victorySound.play();
  }

  //lostScreen.visible=false;
  spawnObstacles();
  }


  else if(gameState === END){
      //obstaclesGrp.destroyEach();
      obstaclesGrp.setVelocityXEach(0);
      bg.velocity = 0;
      astronaut.velocity=0;
      lostScreen.visible=true;

      if(keyWentDown(UP_ARROW)) {
        reset(); 
      }
  }

  drawSprites();

  textSize(22);
  fill("red");
  text("Score-"+score,200,50);
}

function reset(){
  gameState = PLAY;
  lostScreen.visible = false;
  obstaclesGrp.destroyEach();
  score = 0;
  
}

function spawnObstacles(){
  if(frameCount%20===0){
  var randX = Math.round(random(10,1300));
  var randY = Math.round(random(10,760));
       obstacle = createSprite(randX,randY,20,20);
       obstacle.scale = 0.5;
       obstacle.velocityY = 5;
       obstaclesGrp.add(obstacle);
       var randomNo = Math.round(random(-5,5));
       obstacle.velocityX = randomNo ;
       var r=Math.round(random(1,4));
       switch(r){
         case 1:obstacle.addImage(asteroidImg);
         break;
         case 2:obstacle.addImage(cometImg);
         break;
         case 3:obstacle.addImage(planet1Img);
         break;
         case 4:obstacle.addImage(planet2Img);
         break;
        default:break;
       }
}
}
