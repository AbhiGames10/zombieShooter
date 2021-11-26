var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heartImg1, heartImg2, heartImg3;
var heart1, heart2, heart3;
var zombieImg, zombie, zombieGroup;
var bullets = 50;
var bulletGroup, bullet;
var gameState = "fight";
var score = 0;
var lives = 3;


function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  heartImg1 = loadImage("assets/heart_1.png");
  heartImg2 = loadImage("assets/heart_2.png");
  heartImg3 = loadImage("assets/heart_3.png");
  zombieImg = loadImage("assets/zombie.png");
};

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
  player = createSprite(displayWidth-1450, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle",0,0,300,300)

  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heartImg1);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heartImg2);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.addImage("heart3", heartImg3);
  heart3.scale = 0.4;

  zombieGroup = new Group();
  bulletGroup = new Group();
};

function draw() {
  background(0); 

  if (gameState === "fight") {

    if (lives === 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if (lives === 2) {
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }

    if (lives === 1) {
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }

    if (lives === 0) {
      gameState = "lost";
      heart1.visible = false;
    }
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
};
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
};

if (score === 50) {
  gameState = "won"
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting);
  bullet = createSprite(displayWidth - 1350, player.y - 30, 20, 10);
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth + 2;
  bullets = bullets - 1;
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}

if (bullets === 0) {
  gameState = "bullet";
}

if (zombieGroup.isTouching(bulletGroup)) {
  for (var i = 0; i < zombieGroup.length; i++) {
    if (zombieGroup[i].isTouching(bulletGroup)) {
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      score = score + 2;
    }
  }
}

if (zombieGroup.isTouching(player)) {
  for (var i = 0; i < zombieGroup.length; i++) {
    if (zombieGroup[i].isTouching(player)) {
      zombieGroup[i].destroy();
      lives = lives - 1;
    };
  };
};

spawnZombies();
}
drawSprites();

textSize(20);
fill("white");
text("Bullets = " + bullets, displayWidth - 210, displayHeight / 2 - 250);
text("Score = " + score, displayWidth - 200, displayHeight / 2 - 220);
text("Lives = " + lives, displayWidth - 200, displayHeight / 2 - 280);

if (gameState === "lost") {
  textSize(100);
  fill("red");
  text("You Lost!!!", 700, 700);
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState === "won") {
  textSize(100);
  fill("yellow");
  text("You Won!!!", 700, 700);
  zombieGroup.destroyEach();
  player.destroy();
}

else if (gameState === "bullet") {
  textSize(50);
  fill("white");
  text("You ran out of bullets!", 500, 700);
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.destroy();
}
}

function spawnZombies() {
  if(frameCount % 80 === 0) {
    zombie = createSprite(random(1000,1500), random(300,700), 40, 40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;

    zombie.lifetime = 400;
    zombie.setCollider("rectangle", 0, 0, 400, 400);
    zombie.debug = true;

    zombieGroup.add(zombie);
  };
};
