// ----------------------------
// Naming conventions:
// - Classes: PascalCase
// - Functions: camelCase
// - Variables: snake_case
// - Constants: UPPERCASE
// ----------------------------

// Configuration variables
let viewport_width = 640;
let viewport_height = 480;

// CONSTANTS
let ATMAFONT;
let KNEWAVEFONT;
let LOGO;

// Animation
let jump_pressed = false;
let walk1;

// Preload assets
function preload() {
  // Normal assets
  ATMAFONT = loadFont("assets/Atma-Regular.ttf");
  KNEWAVEFONT = loadFont("assets/Knewave-Regular.ttf");
  LOGO = loadImage("assets/logo.png");

  // Frames
  walk1 = loadImage("frames/walk1.png");
}

// Animation handler
let current_frame = walk1;

// Classes
class Capybara {
  constructor() {
    this.x = 50;
    this.y = 380;
    this.width = 72;
    this.height = 60;
    this.grounded = false;
    this.gravity = 1;
    this.velocity = 0;
  }

  show() {
    image(current_frame, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.velocity;
    this.velocity += this.gravity;

    if (this.grounded) {
      this.velocity = 0;
    }

    if (this.y >= 380) {
      this.y = 380;
      this.grounded = true;
    }

    if (jump_pressed && this.grounded) {
      this.jump();
    }
  }

  jump() {
    this.velocity = -20;
    this.y += this.velocity;
    this.grounded = false;
  }
}

// Global variables
let frame_count = 0;
let score = 0;
let multiplier = 1;
let player = new Capybara();
let game_state = "menu";

function setup() {
  // Set the initial frame
  current_frame = walk1;
  walk1.filter;

  createCanvas(viewport_width, viewport_height);
  frameRate(60);
}

function draw() {
  if (game_state == "playing") {
    gameScoreManager();

    // Draw static elements
    drawGameStatic();

    // Draw score
    textAlign(LEFT);
    textFont(ATMAFONT);
    textSize(32);
    fill(255);
    text("Score: " + score + " x" + multiplier, 10, 40);

    // Draw debug stats
    drawDebugStats();

    // Draw player
    player.show();
    player.update();
  } else if (game_state == "menu") {
    drawMenu();
  }
}

// ----------------------------
// MENU HANDLER

function drawMenu() {
  drawMenuBackground();
  drawMenuLogo();
  //drawMenuTitle(); // Add the title back later if I find a good place for it
  textFont(ATMAFONT);
  textSize(44);
  fill(0);
  textAlign(CENTER);
  text('Press "Space" to start!', viewport_width / 2, viewport_height / 1.2);
}

function drawMenuTitle() {
  textFont(KNEWAVEFONT);
  textSize(96);
  fill((v1 = 191), (v2 = 124), (v3 = 73));
  textAlign(CENTER);
  text("Capy Go!", viewport_width / 2, viewport_height / 5);
}

function drawMenuLogo() {
  image(LOGO, viewport_width / 3 - 100, viewport_height / 200, 400, 400);
}

function drawMenuBackground() {
  fill(255, 255, 204);
  rect(0, 0, viewport_width, viewport_height);
}

// ----------------------------
// GAME HANDLER

function drawDebugStats() {
  textAlign(RIGHT);
  textFont(ATMAFONT);
  textSize(24);
  fill(255);
  text("Frame: " + frame_count, viewport_width - 10, 40);
  text("Player Y: " + player.y, viewport_width - 10, 70);
  text("Player Vel: " + player.velocity, viewport_width - 10, 100);
  text("Player Grounded: " + player.grounded, viewport_width - 10, 130);
}

function drawGameStatic() {
  drawGameBackground();
  drawGameSun();
  drawGameGround();
}

function drawGameGround() {
  fill(255, 255, 204);
  rect(0, 380, viewport_width, 100);
}

function drawGameSun() {
  let sunX = viewport_width / 2;
  let sunY = 380;
  fill(255, 204, 0);
  noStroke();
  ellipse(sunX, sunY, 160, 160);
}

function drawGameBackground() {
  fill(135, 206, 235);
  rect(0, 0, viewport_width, 380);
}

function gameScoreManager() {
  frame_count += 1;
  score += multiplier;
  if (frame_count % 120 == 0) {
    multiplier += 1;
  }
}

// ----------------------------
// INPUT HANDLER

function keyPressed() {
  // START GAME (space)
  if (game_state == "menu" && keyCode == 32) {
    player.y = 380;
    game_state = "playing";
    score = 0;
    multiplier = 1;
    frame_count = 0;
  }

  // EXIT GAME (esc)
  if (game_state == "playing" && keyCode == 27) {
    game_state = "menu";
  }

  // JUMP (up arrow or space or w)
  if (
    game_state == "playing" &&
    (keyCode == 38 || keyCode == 32 || keyCode == 87) &&
    frame_count > 10
  ) {
    jump_pressed = true;
  }
}

function keyReleased() {
  // STOP JUMP (up arrow or space or w)
  if (keyCode == 38 || keyCode == 32 || keyCode == 87) {
    jump_pressed = false;
  }
}

function mousePressed() {
  // JUMP (mouse click)
  if (game_state == "playing") {
    jump_pressed = true;
  }
}

function mouseReleased() {
  // STOP JUMP (mouse click)
  if (game_state == "playing") {
    jump_pressed = false;
  }
}
