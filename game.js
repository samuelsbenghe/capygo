// ----------------------------
// Using standard JavaScript naming convention:
// - Classes: PascalCase
// - Functions and Variables: camelCase
// - Constants: UPPERCASE
// ----------------------------

// ----------------------------
// Assets used and their sources:
// - Atma-Regular.ttf (https://fonts.google.com/specimen/Atma)
// - Knewave-Regular.ttf (https://fonts.google.com/specimen/Knewave)
// - Capybara Animation Frames (https://rainloaf.itch.io/capybara-sprite-sheet - by rainloaf)
// ----------------------------

// Configuration variables
const VIEWPORT_WIDTH = 640;
const VIEWPORT_HEIGHT = 480;
const FLOOR_Y = 360;

// Assets
let fontAtma, fontKnewave, imgLogo;

// Obstacle variables
let obstacleOptions, obstacleCactus1, obstacleCactus2;
let lastObstacleSpawn = 0;

// Global variables
let frameCount,
  score = 0;
let multiplier = 1;
let gameState = "menu";
let showDebug,
  starsDrawn = false;
let stars = [];
let obstacleGroup = [];
let fps;

// Animation variables
let jumpPressed = false;
let currentFrame;
let animationSpeed = 4;
let gameSpeed = 1;
let animationWalk, walk1, walk2, walk3, walk4, walk5;
let animationDeath, death1, death2, death3, death4, death5;

// Preload assets
function preload() {
  // Assets
  fontAtma = loadFont("assets/Atma-Regular.ttf");
  fontKnewave = loadFont("assets/Knewave-Regular.ttf");
  imgLogo = loadImage("assets/logo.png");

  // Obstacles
  obstacleCactus1 = loadImage("obstacles/cactus1.png");
  obstacleCactus2 = loadImage("obstacles/cactus2.png");

  // Frames
  walk1 = loadImage("frames/walk1.png");
  walk2 = loadImage("frames/walk2.png");
  walk3 = loadImage("frames/walk3.png");
  walk4 = loadImage("frames/walk4.png");
  walk5 = loadImage("frames/walk5.png");
}

// Classes
class Capybara {
  constructor() {
    this.x = 50;
    this.y = FLOOR_Y;
    this.width = 72;
    this.height = 60;
    this.grounded = false;
    this.gravity = 1;
    this.velocity = 0;
  }

  show() {
    // Because each frame has different sizes, I will adjust the width and height of the sprite based on the current frame.
    switch (currentFrame) {
      case walk1:
        this.width = 72;
        this.height = 60;
        break;
      case walk2:
        this.width = 66;
        this.height = 57;
      case walk3:
        this.width = 60;
        this.height = 60;
      case walk4:
        this.width = 66;
        this.height = 64;
      case walk5:
        this.width = 66;
        this.height = 63;
        break;
    }
    image(currentFrame, this.x, this.y, this.width, this.height);
  }

  die() {
    // TODO: Implement die method
  }

  walk() {
    // This code changes the sprite every 4 frames (division by 4)
    // For example, if the frame is between o and 3, this formula will output 0.
    // If the frame is between 4 and 7, it will output 1.
    // This continues up to frame 20, at which point it will output 0 again.
    currentFrame =
      animationWalk[floor(frameCount / animationSpeed) % animationWalk.length];
  }

  float() {
    currentFrame = animationWalk[0];
  }

  update() {
    // Positive velocity makes capybara fall down.
    // Negative velocity makes capybara go up
    this.y += this.velocity;
    this.velocity += this.gravity;

    // If grounded, set velocity to 0 and start walking animation. If not grounded, start floating animation.
    if (this.grounded) {
      this.velocity = 0;
      this.walk();
    } else {
      this.float();
    }

    // Simulate floor collision by not letting this.y go below floorY
    if (this.y >= FLOOR_Y) {
      this.y = FLOOR_Y;
      this.grounded = true;
    }

    // Jump, self-explanatory
    if (jumpPressed && this.grounded) {
      this.jump();
    }
  }

  // Set negative velocity to make capybara accelerate upwards
  jump() {
    this.velocity = -20;
    this.y += this.velocity;
    this.grounded = false;
  }
}

class Obstacle {
  constructor(sprite) {
    this.x = VIEWPORT_WIDTH;
    this.y = FLOOR_Y - 70;
    this.width = 55;
    this.height = 156;
    this.speed = 7 * gameSpeed;
    this.sprite = sprite;
  }

  show() {
    image(this.sprite, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
    this.timeAlive += 1;
  }
}

let player = new Capybara();

function setup() {
  // Animation setup
  animationWalk = [walk1, walk2, walk3, walk4, walk5];
  currentFrame = animationWalk[0];

  // Obstacle setup
  obstacleOptions = [obstacleCactus1, obstacleCactus2];

  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  frameRate(60);
}

function draw() {
  switch (gameState) {
    case "playing":
      gameScoreManager();
      collisionManager();

      // Draw static elements
      drawGame();

      // Draw obstacles
      drawObstacles();

      // Draw score
      textAlign(LEFT);
      textFont(fontAtma);
      textSize(32);
      fill(255);
      text("Score: " + score + " x" + multiplier, 10, 40);

      // Draw debug stats
      if (showDebug) {
        drawDebugStats();
      }

      // Draw player
      player.show();
      player.update();
      break;

    case "menu":
      drawMenu();
      break;
    default:
      break;
  }
}

// ----------------------------
// MENU HANDLER

function drawMenu() {
  drawMenuBackground();
  drawMenuLogo();
  //drawMenuTitle(); // Add the title back later if I find a good place for it
  drawMenuHint();
}

function drawMenuTitle() {
  textFont(fontKnewave);
  textSize(96);
  fill((v1 = 191), (v2 = 124), (v3 = 73));
  textAlign(CENTER);
  text("Capy Go!", VIEWPORT_WIDTH / 2, VIEWPORT_HEIGHT / 5);
}

function drawMenuLogo() {
  image(imgLogo, VIEWPORT_WIDTH / 3 - 100, VIEWPORT_HEIGHT / 200, 400, 400);
}

function drawMenuBackground() {
  fill(255, 255, 204);
  rect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}

function drawMenuHint() {
  textFont(fontAtma);
  textSize(44);
  fill(0);
  textAlign(CENTER);
  text('Press "Space" to start!', VIEWPORT_WIDTH / 2, VIEWPORT_HEIGHT / 1.2);
}

// ----------------------------
// GAME HANDLER

function drawDebugStats() {
  textAlign(RIGHT);
  textFont(fontAtma);
  textSize(24);
  fill(255);
  text("Frame: " + frameCount, VIEWPORT_WIDTH - 10, 50);
  text("Player Y: " + player.y, VIEWPORT_WIDTH - 10, 80);
  text("Player Vel: " + player.velocity, VIEWPORT_WIDTH - 10, 110);
  text("Player Grounded: " + player.grounded, VIEWPORT_WIDTH - 10, 140);
  text("FPS: " + fps, VIEWPORT_WIDTH - 10, 170);
  text("Obstacles: " + obstacleGroup.length, VIEWPORT_WIDTH - 10, 200);
  text("Game Speed: " + gameSpeed, VIEWPORT_WIDTH - 10, 230);
  if (frameCount % 10 == 0) {
    fps = floor(frameRate());
  }
}

function drawGame() {
  drawGameBackground();
  if (!starsDrawn) {
    setupStars();
    starsDrawn = true;
  } else {
    drawStars();
  }
  drawGameSun();
  drawGameGround();
  drawGameEscHint();
}

function drawGameEscHint() {
  textFont(fontAtma);
  textSize(24);
  fill(255);
  textAlign(RIGHT);
  text("Press 'Esc' to exit", VIEWPORT_WIDTH - 10, 25);
}

function setupStars() {
  for (let i = 0; i < 15; i++) {
    let x = random(10, VIEWPORT_WIDTH - 10);
    let y = random(10, VIEWPORT_HEIGHT / 3);
    stars.push({ x, y });
  }
}

function drawStars() {
  noStroke();
  fill(255, 255, 204);
  for (let star of stars) {
    ellipse(star.x, star.y, 5, 5);
  }
}

function drawGameGround() {
  fill(255, 255, 204);
  rect(0, 380, VIEWPORT_WIDTH, 100);
}

function drawGameSun() {
  noStroke();
  fill(191, 124, 73);
  arc(width / 1.3, height / 6, 60, 60, 0, HALF_PI * 3);
  noStroke();
  fill(255, 255, 204);
  arc(width / 1.3, height / 6, 40, 40, 0, HALF_PI * 4);
}

function drawGameBackground() {
  let startColor = color(226, 169, 116);
  let endColor = color(255, 255, 204);
  for (let i = 0; i < VIEWPORT_HEIGHT; i++) {
    let inter = map(i, 0, VIEWPORT_HEIGHT, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(0, i, VIEWPORT_WIDTH, i);
  }
}

function drawObstacles() {
  for (let i = 0; i < obstacleGroup.length; i++) {
    obstacleGroup[i].show();
    obstacleGroup[i].update();
  }
  obstacleManager();
}

function obstacleManager() {
  let spawnIntervalOptions = [30, 40, 50, 60];
  let spawnInterval =
    spawnIntervalOptions[floor(random(0, spawnIntervalOptions.length))];
  if (frameCount % spawnInterval == 0 && frameCount - lastObstacleSpawn > 60) {
    randomObstacleIndex = floor(random(0, obstacleOptions.length));
    let obstacle = new Obstacle(
      (sprite = obstacleOptions[randomObstacleIndex])
    );
    obstacleGroup.push(obstacle);
    lastObstacleSpawn = frameCount;
  }
  if (obstacleGroup.length > 0 && obstacleGroup[0].x < -50) {
    obstacleGroup.shift();
  }
  gameSpeed >= 2.5
    ? (gameSpeed = 2.5)
    : (gameSpeed = round(gameSpeed + 0.0003, 4));
}

function collisionManager() {
  for (let i = 0; i < obstacleGroup.length; i++) {
    if (
      player.x < obstacleGroup[i].x + obstacleGroup[i].width &&
      player.x + player.width > obstacleGroup[i].x &&
      player.y < obstacleGroup[i].y + obstacleGroup[i].height &&
      player.y + player.height > obstacleGroup[i].y
    ) {
      gameState = "menu";
    }
  }
}

function gameScoreManager() {
  frameCount += 1;
  score += multiplier;
  if (frameCount % 120 == 0) {
    multiplier += 1;
  }
}

// ----------------------------
// INPUT HANDLER

function keyPressed() {
  // START GAME (space)
  if (gameState == "menu" && keyCode == 32) {
    player.y = 380;
    gameState = "playing";
    score = 0;
    multiplier = 1;
    frameCount = 0;
    // Reset stars
    starsDrawn = false;
    stars = [];
    // Reset obstacles
    lastObstacleSpawn = 0;
    obstacleGroup = [];
    gameSpeed = 1;
  }

  // EXIT GAME (esc)
  if (gameState == "playing" && keyCode == 27) {
    gameState = "menu";
  }

  // JUMP (up arrow or space or w)
  if (
    gameState == "playing" &&
    (keyCode == 38 || keyCode == 32 || keyCode == 87) &&
    frameCount > 10
  ) {
    jumpPressed = true;
  }

  // DEBUG (d)
  if (keyCode == 68) {
    showDebug = !showDebug;
  }
}

function keyReleased() {
  // STOP JUMP (up arrow or space or w)
  if (keyCode == 38 || keyCode == 32 || keyCode == 87) {
    jumpPressed = false;
  }
}

function mousePressed() {
  // JUMP (mouse click)
  if (gameState == "playing") {
    jumpPressed = true;
  }
}

function mouseReleased() {
  // STOP JUMP (mouse click)
  if (gameState == "playing") {
    jumpPressed = false;
  }
}
