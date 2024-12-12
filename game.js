// ----------------------------
// Naming conventions:
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
let viewportWidth = 640;
let viewportHeight = 480;

// Assets
let fontAtma;
let fontKnewave;
let imgLogo;

// Global variables
let frameCount = 0;
let score = 0;
let multiplier = 1;
let gameState = "menu";
let showDebug = false;
let starsDrawn = false;
let stars = [];
let floorY = 360;

// Animation handler
let jumpPressed = false;
let currentFrame;
let animationWalk;
let walk1;
let walk2;
let walk3;
let walk4;
let walk5;

// Preload assets
function preload() {
  // Normal assets
  fontAtma = loadFont("assets/Atma-Regular.ttf");
  fontKnewave = loadFont("assets/Knewave-Regular.ttf");
  imgLogo = loadImage("assets/logo.png");

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
    this.y = floorY;
    this.width = 72;
    this.height = 60;
    this.grounded = false;
    this.gravity = 1;
    this.velocity = 0;
    this.horizontalSpeed = 5;
  }

  show() {
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
    currentFrame = animationWalk[floor(frameCount / 4) % 5];
  }

  float() {
    currentFrame = walk1;
  }

  update() {
    this.y += this.velocity;
    this.velocity += this.gravity;

    if (this.grounded) {
      this.velocity = 0;
      this.walk();
    } else {
      this.float();
    }

    if (this.y >= floorY) {
      this.y = floorY;
      this.grounded = true;
    }

    if (jumpPressed && this.grounded) {
      this.jump();
    }
  }

  jump() {
    this.velocity = -20;
    this.y += this.velocity;
    this.grounded = false;
  }
}

let player = new Capybara();

function setup() {
  // Animation setup
  currentFrame = walk1;
  animationWalk = [walk1, walk2, walk3, walk4, walk5];

  createCanvas(viewportWidth, viewportHeight);
  frameRate(60);
}

function draw() {
  if (gameState == "playing") {
    gameScoreManager();

    // Draw static elements
    drawGameStatic();

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
  } else if (gameState == "menu") {
    drawMenu();
  }
}

// ----------------------------
// MENU HANDLER

function drawMenu() {
  drawMenuBackground();
  drawMenuLogo();
  //drawMenuTitle(); // Add the title back later if I find a good place for it
  textFont(fontAtma);
  textSize(44);
  fill(0);
  textAlign(CENTER);
  text('Press "Space" to start!', viewportWidth / 2, viewportHeight / 1.2);
}

function drawMenuTitle() {
  textFont(fontKnewave);
  textSize(96);
  fill((v1 = 191), (v2 = 124), (v3 = 73));
  textAlign(CENTER);
  text("Capy Go!", viewportWidth / 2, viewportHeight / 5);
}

function drawMenuLogo() {
  image(imgLogo, viewportWidth / 3 - 100, viewportHeight / 200, 400, 400);
}

function drawMenuBackground() {
  fill(255, 255, 204);
  rect(0, 0, viewportWidth, viewportHeight);
}

// ----------------------------
// GAME HANDLER

function drawDebugStats() {
  textAlign(RIGHT);
  textFont(fontAtma);
  textSize(24);
  fill(255);
  text("Frame: " + frameCount, viewportWidth - 10, 40);
  text("Player Y: " + player.y, viewportWidth - 10, 70);
  text("Player Vel: " + player.velocity, viewportWidth - 10, 100);
  text("Player Grounded: " + player.grounded, viewportWidth - 10, 130);
}

function drawGameStatic() {
  drawGameBackground();
  if (!starsDrawn) {
    setupStars();
    starsDrawn = true;
  } else {
    drawStars();
  }
  drawGameSun();
  drawGameGround();
}

function setupStars() {
  for (let i = 0; i < 15; i++) {
    let x = random(10, viewportWidth - 10);
    let y = random(10, viewportHeight / 3);
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
  rect(0, 380, viewportWidth, 100);
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
  for (let i = 0; i < viewportHeight; i++) {
    let inter = map(i, 0, viewportHeight, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(0, i, viewportWidth, i);
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
