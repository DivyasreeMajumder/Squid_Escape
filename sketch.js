//declaring variables.
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var reset;
var water,waterImage;
var squid,squidImage,squidCollidedImage,squidJumpingImage;
var invisibleGround;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var score=0;
var gameOver,gameOverImage;
var restart,restartImage;
var jumpSound , checkPointSound, dieSound
var gameSound;
var gems,gemsImage;
var obstaclesGroup,gemGroup;
var gemsCollected=0;


function preload(){
  //loading Images.
  waterImage=loadImage("Water background.jpg");
  squidImage=loadImage("squid 2.png");
  obstacle1=loadImage("obstacle 1.png");
  obstacle2=loadImage("obstacle 2.png");
  obstacle3=loadImage("obstacle 3.png");
  obstacle4=loadImage("obstacle 4.png");
  obstacle5=loadImage("obstacle 5.png");
  gameOverImage=loadImage("Game over.png");
  restartImage=loadImage("RESTART.png");  
  gemsImage=loadImage("Gem.png");

  //loading Sounds.
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  gameSound=loadSound("Epic-Chase.mp3");
}


function setup() {
  //creating a canvas.
  createCanvas(displayWidth-20,displayHeight-100);

  //creating the background.
  water=createSprite(125,0,1000,450);
  water.addImage(waterImage);
  water.x=water.width/2;
  water.velocityX=-4;

  //creating the playing characters
  squid=createSprite(50,500,20,50);
  squid.addImage(squidImage);
  squid.scale=0.3;

  //creating an invisible ground.
  invisibleGround = createSprite(20,550,100000,20);
  invisibleGround.visible = false;

  //creating groups
  obstaclesGroup = new Group();
  gemGroup=new Group();

  //creating the gameOver sprite.
  gameOver=createSprite(displayWidth/2,displayHeight/2-100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;

  //creating the restart sprite.
  restart=createSprite(displayWidth/2,displayHeight/2+100);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible=false;

  score = 0;

  gemsCollected=0;
  gameSound.play();
  gameSound.loop();

  
  
  
  
  
}

function draw() {
  background("lightblue");
  
  
  //helping the squid to collide with the ground.
  squid.collide(invisibleGround)

  //play gameState.
  if(gameState===PLAY){
    //increasing speed
    water.velocityX = -(6 + 2*score/100);
    if (water.x < 0){
      water.x = water.width/2;
    }  
    console.log(squid.y);
    //helping the squid to jump.
    if(keyDown("space") && squid.y >= 480.45){
      squid.velocityY = -12;
      jumpSound.play();
      
    }

    squid.velocityY = squid.velocityY + 0.2;
    //adding sound for checkpoints.
    if(score>0 && score%100 === 0){
      checkPointSound.play() 
   }
   

  for(var i=0;i<gemGroup.length;i++){
    if(gemGroup.get(i).isTouching(squid)){
      gemGroup.get(i).destroy();
      gemsCollected=gemsCollected+1;


    }

  }//creating the end of the game.
    if(obstaclesGroup.isTouching(squid)){
      gameState=END
      dieSound.play()
    }
    
    score = score + Math.round(getFrameRate()/60);
  
    spawnObstacles();
    spawnGems();

  }else if(gameState===END){
    //making sprites visible.
    gameOver.visible = true;
    restart.visible = true;
    //velocities to 0.    
    water.velocityX=0;
    squid.velocityY=0;
    //changing lifetime and velocity    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    //destroying the gems
    gemGroup.destroyEach();
    
    //clicking on restart button.
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();

  
  
 
  
  //add texts;
  fill("black");
  textSize(30)
  text("Score: "+score,displayWidth-200,50)
  fill("black");
  textSize(30)
  text("Gems Collected: "+gemsCollected,displayWidth-300,90)

  
}

function spawnObstacles(){
  //creating the non playing characters
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(displayWidth,500);
    
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    obstacle.velocityX = -(6 + 2*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = displayWidth/4;
    obstaclesGroup.add(obstacle);

    
  }
}

  function spawnGems(){
    //creating the gems
    if (frameCount % 60 === 0) {
      gem = createSprite(displayWidth,displayHeight);
      
      gem.setCollider("rectangle",0,0,gem.width,gem.height);
      gem.y = Math.round(random(displayHeight/2-150,displayHeight/2+100));
      gem.addImage(gemsImage);
      gem.scale = 0.3;
      gem.velocityX = -(4+2*score/100);
      
       //assign lifetime to the variable
      gem.lifetime =displayWidth/4;
      
      //adjust the depth
      gem.depth = squid.depth;
      squid.depth = squid.depth + 1;
      
      //add each gem to the group
      gemGroup.add(gem);
    
    }
  }
  //reseting the game.
  function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  gemGroup.destroyEach();
  
  
  score=0;
  gemsCollected=0;
  }
  //THE END :-)

