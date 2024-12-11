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

// Assets
let font_atma;
let font_knewave;
let img_logo;

// Global variables
let frame_count = 0;
let score = 0;
let multiplier = 1;
let game_state = "menu";
let floor_y = 360;

// Animation handler
let jump_pressed = false;
let current_frame;
let animation_walk;
let walk1;
let walk2;
let walk3;
let walk4;
let walk5;

// Preload assets
function preload() {
  // Normal assets
  font_atma = loadFont("assets/Atma-Regular.ttf");
  font_knewave = loadFont("assets/Knewave-Regular.ttf");
  img_logo = loadImage("assets/logo.png");

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
    this.y = floor_y;
    this.width = 72;
    this.height = 60;
    this.grounded = false;
    this.gravity = 1;
    this.velocity = 0;
    this.horizontal_speed = 5;
    this.animation_walk = [walk1, walk2, walk3];
  }

  show() {
    switch (current_frame) {
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
    image(current_frame, this.x, this.y, this.width, this.height);
  }

  die() {
    // TODO: Implement die method
  }

  walk() {
    current_frame = animation_walk[floor(frame_count / 4) % 5];
  }

  float() {
    current_frame = walk1;
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

    if (this.y >= floor_y) {
      this.y = floor_y;
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

let player = new Capybara();

function setup() {
  // Animation setup
  current_frame = walk1;
  animation_walk = [walk1, walk2, walk3, walk4, walk5];

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
    textFont(font_atma);
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
  textFont(font_atma);
  textSize(44);
  fill(0);
  textAlign(CENTER);
  text('Press "Space" to start!', viewport_width / 2, viewport_height / 1.2);
}

function drawMenuTitle() {
  textFont(font_knewave);
  textSize(96);
  fill((v1 = 191), (v2 = 124), (v3 = 73));
  textAlign(CENTER);
  text("Capy Go!", viewport_width / 2, viewport_height / 5);
}

function drawMenuLogo() {
  image(img_logo, viewport_width / 3 - 100, viewport_height / 200, 400, 400);
}

function drawMenuBackground() {
  fill(255, 255, 204);
  rect(0, 0, viewport_width, viewport_height);
}

// ----------------------------
// GAME HANDLER

function drawDebugStats() {
  textAlign(RIGHT);
  textFont(font_atma);
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
