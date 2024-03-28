var bg_img;
var player,player_img,player_standing;
var zombie,zombie_img,zombie_group;
var heart_1,heart_1_img , heart_2,heart_2_img , heart_3,heart_3_img;
var life = 3;
var bullets = 10 
var bullets_group 
var bullets_img;
var gameState = "play";
var score = 0;

var lose, winning, explosion;


function preload(){
 bg_img = loadImage("assets/bg.jpeg");
 player_img = loadImage("assets/shooter_3.png");
 zombie_img = loadImage("assets/zombie.png");
player_standing = loadImage("assets/shooter_2.png");
heart_1_img = loadImage("assets/heart_1.png")
heart_2_img = loadImage("assets/heart_2.png")
heart_3_img = loadImage("assets/heart_3.png")
bullets_img = loadImage("assets/bullet.png")

lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")
}

function setup(){
createCanvas(windowWidth,windowHeight);

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
player.addImage(player_standing);
player.scale = 0.7;

heart_1 = createSprite(displayWidth-150,40,20,20)
   heart_1.visible = false
    heart_1.addImage("heart_1",heart_1_img)
    heart_1.scale = 0.4

    heart_2 = createSprite(displayWidth-150,40,20,20)
   heart_2.visible = false
    heart_2.addImage("heart_1",heart_2_img)
    heart_2.scale = 0.4

    heart_3 = createSprite(displayWidth-150,40,20,20)
    heart_3.addImage("heart_1",heart_3_img)
    heart_3.scale = 0.4

//player.debug = true;
player.setCollider("rectangle",0,0,200,400);

zombie_group = new Group();
bullets_group = new Group();

}

function draw(){

background(bg_img);

if (gameState === "play"){

if(life === 3){
  heart_3.visible = true;
  heart_2.visible = false;
  heart_1.visible = false;
}

if(life === 2){
  heart_3.visible = false;
  heart_2.visible = true;
  heart_1.visible = false;
}

if(life === 1){
  heart_3.visible = false;
  heart_2.visible = false;
  heart_1.visible = true;
}
if( life === 0){
  gameState = "lost"
  lose.play();
  heart_3.visible = false;
  heart_2.visible = false;
  heart_1.visible = false;
}

movement();

if(keyWentDown("space")){
  spawnBullets();
  bullets = bullets-1
  explosion.play();
 
    player.addImage(player_img)
   
  }
  else if(keyWentUp("space")){
    player.addImage(player_standing)
  }

  if(zombie_group.isTouching(player)){
 

    for(var i=0;i<zombie_group.length;i++){     
         
 //    if(zombie_group[i].isTouching(player)){
          zombie_group[i].destroy()
          life -= 1;
          lose.play();
  //        player.visible = false;
 //         gameState = "lost";
 //         } 
    }
   }
// deleating the zombies when the bullet is touching

   if(zombie_group.isTouching(bullets_group)){
    for(var i=0;i<zombie_group.length;i++){     
        
     if(zombie_group[i].isTouching(bullets_group)){
          score += 1;
          zombie_group[i].destroy()
          bullets_group.destroyEach()
          
         
          } 
    
    }
  }

  
  if(score >= 20){
    gameState = "won"
    winning.play();
  };

  if( bullets == 0){
    gameState = "bullets"
    lose.play();
  }
  
  spawnEnemies();
 // console.log(player.y);

}

if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombie_group.destroyEach();
  bullets_group.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
 if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombie_group.destroyEach();
  player.destroy();
  bullets_group.destroyEach();

}

if(gameState == "bullets"){

  textSize(100)
  fill("blue")
  text("you have ran out of bullets ",400,400)
  zombie_group.destroyEach();
  player.destroy();
  bullets_group.destroyEach();

}

//  textSize(80)
//  fill("white")
//  text("Score =  "+ score,350,80)

  textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)
  

  drawSprites();
}

function movement(){

if(keyDown("UP_ARROW"||touches.length>0)){
    player.y -= 10
}

if(keyDown("DOWN_ARROW"||touches.length>0)){
    player.y += 10
}

if(keyDown("LEFT_ARROW"||touches.length>0)){
    player.x -= 10
}

if(keyDown("RIGHT_ARROW"||touches.length>0)){
    player.x += 10
}
}

function spawnEnemies (){

    if(frameCount%100===0){
    zombie = createSprite (random(500,1500),random(370,750),40,40);
    zombie.addImage(zombie_img);
    zombie.scale = 0.3;
    zombie.velocityX = -10;
    zombie.lifetime = 300;
   // zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400);

    zombie_group.add(zombie);
    }  
}

function spawnBullets(){
    bullets = createSprite(player.x, player.y, 10, 10);
    bullets.velocityX = 40;
    bullets.addImage(bullets_img);
    bullets.scale = 0.3;
    bullets_group.add(bullets);

    player.depth = bullets.depth
    player.depth = player.depth+2
   // player.addImage(shooter_shooting)
}
 /*function keyReleased(){
    if(keyCode === 32){

      explosion.play();

        if(bullets > 0){

        spawnBullets();
        bullets = bullets-1;

        }
    }
 } */

