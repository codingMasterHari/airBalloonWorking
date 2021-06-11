var balloon, balloonImage1, balloonImage2;
// create database and position variable here
var database, position, balloonPosition;
var coin1, coin2, coin3, coin4, coin1Img;
var bomb1, bomb2, bomb3, bomb4, bomb5, bomb6, bomb7, bomb8, bomb1Img;
var score = 0;
var lives = 4;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
const bgSound = new Audio("BGmummy.wav");
const coinSound = new Audio("coinsound.wav");
const bombSound = new Audio("bomb1sound.wav");

function preload() {
   bg = loadImage("backgroundMummy.png");
  // bg = loadImage("bgMummy2.png");
  balloonImage1 = loadImage("hotAirBalloon.png");
  balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  coin1Img = loadImage("coin.png");
  bomb1Img = loadImage("bomb.png");
}

//Function to set initial environment
function setup() {
  createCanvas(1300,640);
  edges = createEdgeSprites();
  
  balloon = createSprite(150,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.3;

  coin1 = createSprite(600,450,150,150);
  coin1.addImage(coin1Img);
  coin1.velocityX = 6;
  coin1.velocityY = 7;
  coin1.scale = 0.05;

  coin2 = createSprite(600,450,150,150);
  coin2.addImage(coin1Img);
  coin2.velocityX = -6;
  coin2.velocityY = -7;
  coin2.scale = 0.05;

  coin3 = createSprite(600,450,150,150);
  coin3.addImage(coin1Img);
  coin3.velocityX = -6;
  coin3.velocityY = 7;
  coin3.scale = 0.05;

  coin4 = createSprite(600,450,150,150);
  coin4.addImage(coin1Img);
  coin4.velocityX = 6;
  coin4.velocityY = -7;
  coin4.scale = 0.05;
//////////////////////////////////////
/////////////
  bomb1 = createSprite(600,450,150,150);
  bomb1.addImage(bomb1Img);
  bomb1.velocityX = 7;
  bomb1.velocityY = 8;
  bomb1.scale = 0.04;

  bomb2 = createSprite(600,450,150,150);
  bomb2.addImage(bomb1Img);
  bomb2.velocityX = -7;
  bomb2.velocityY = -8;
  bomb2.scale = 0.04;

  bomb3 = createSprite(600,450,150,150);
  bomb3.addImage(bomb1Img);
  bomb3.velocityX = -7;
  bomb3.velocityY = 8;
  bomb3.scale = 0.04;

  bomb4 = createSprite(600,450,150,150);
  bomb4.addImage(bomb1Img);
  bomb4.velocityX = 7;
  bomb4.velocityY = -8;
  bomb4.scale = 0.04;
//////////////////////////////////////////////////////////
/////////////////////////////

  database = firebase.database();

  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition);
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y
}

function writePosition(x, y) {
  database.ref('balloon/position').set({
    x: position.x+x,
    y: position.y+y
  })
}

// function to display UI
function draw() {
  background(bg);
  coin1.bounceOff(edges);
  coin2.bounceOff(edges);
  coin3.bounceOff(edges);
  coin4.bounceOff(edges);

  bomb1.bounceOff(edges);
  bomb2.bounceOff(edges);
  bomb3.bounceOff(edges);
  bomb4.bounceOff(edges);

  bgSound.play();
  bgSound.loop = true;

  if(gameState == PLAY) {
    if(keyDown(LEFT_ARROW)) {
      //write code to move air balloon in left direction
      writePosition(-3, 0);
    }
    else if(keyDown(RIGHT_ARROW)) {
      //write code to move air balloon in right direction
      writePosition(3, 0);
    }
    else if(keyDown(UP_ARROW)) {
      //write code to move air balloon in up direction
      writePosition(0, -3);
      balloon.scale -= 0.002;
    }
    else if(keyDown(DOWN_ARROW)) {
      //write code to move air balloon in down direction
      writePosition(0, 3);
      balloon.scale += 0.002;
    }
  }

  if(balloon.isTouching(coin1)) {
    score+=1;
    coin1.destroy();
    coinSound.play();
  } else if(balloon.isTouching(coin2)) {
    score+=1;
    coin2.destroy();
    coinSound.play();
  } else if(balloon.isTouching(coin3)) {
    score+=1;
    coin3.destroy();
    coinSound.play();
  } else if(balloon.isTouching(coin4)) {
    score+=1;
    coin4.destroy();
    coinSound.play();
  }

  if(balloon.isTouching(bomb1)) {
    lives-=1;
    bomb1.destroy();
    bombSound.play();
  } else if(balloon.isTouching(bomb2)) {
    lives-=1;
    bomb2.destroy();
    bombSound.play();
  } else if(balloon.isTouching(bomb3)) {
    lives-=1;
    bomb3.destroy();
    bombSound.play();
  } else if(balloon.isTouching(bomb4)) {
    lives-=1;
    bomb4.destroy();
    bombSound.play();
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  fill("red");
  text("*Use arrow keys to move Hot Air Balloon!", 40, 40);
  text("Score: " + score, 48, 70);
  text("Lives: " + lives, 48, 100);
  if(lives <= 0 ) {
    text("Game Over", 100, 200);
    coin1.destroy();
    coin2.destroy();
    coin3.destroy();
    coin4.destroy();
  } else if(score >= 4) {
    text("You Win", 100, 200);
    bomb1.destroy();
    bomb2.destroy();
    bomb3.destroy();
    bomb4.destroy();
  }
}




// 1888 211 3839