// Variables
let frameCount = 0;
let fps = 0;
let score = 0;
let multiplier = 1;
let showDebug = false;
let gameSpeed = 1;

// Stars
let starsDrawn = false;
let stars = [];

// High Score
let highScore = localStorage.getItem("highScore") || 0;

// Update every frame
function drawGame() {
  // Static Elements
  drawGameBackground();
  if (!starsDrawn) {
    setupStars();
    starsDrawn = true;
  } else {
    drawStars();
  }
  drawGameSun();
  drawGameGround();
  // UI
  drawGameEscHint();
  drawGameScore();
  drawDebugStats();
  drawGameHighScore();
  // Game Logic
  gameScoreManager();
  drawObstacles();
  collisionManager();
  // Player
  player.update();
}

// =============== GAME LOGIC ===============

function gameScoreManager() {
  frameCount += 1;
  score += multiplier;
  if (frameCount % 120 == 0) {
    multiplier += 1;
  }
}

function drawObstacles() {
  // Read the obstacleGroup array and draw each obstacle in it, as well as update each of them every frame.
  for (let i = 0; i < obstacleGroup.length; i++) {
    obstacleGroup[i].show();
    obstacleGroup[i].update();
  }
  // After drawing and updating all obstacles, check if obstacles need to be added or removed in next frame.
  obstacleManager();
}

// Function that removes or adds obstacles. Called every frame in the function above.
function obstacleManager() {
  let spawnIntervalOptions = [30, 40, 50, 60];
  // spawnInterval = random number between 0 and 3 inclusive
  let spawnInterval =
    spawnIntervalOptions[floor(random(0, spawnIntervalOptions.length))];
  if (frameCount % spawnInterval == 0 && frameCount - lastObstacleSpawn > 60) {
    randomObstacleIndex = floor(random(0, obstacleOptions.length));
    randomObstacleScale = random(0.7, 1);
    let obstacle = new Obstacle(
      (sprite = obstacleOptions[randomObstacleIndex]),
      (scale = randomObstacleScale)
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

function gameReset() {
  // P5.js
  noStroke();
  // Variables
  score = 0;
  multiplier = 1;
  frameCount = 0;
  gameSpeed = 1;
  // Stars
  starsDrawn = false;
  stars = [];
  // Obstacles
  obstacleGroup = [];
  lastObstacleSpawn = 0;
  // Player
  player.reset();
  // Debug
  showDebug = false;
}

function collisionManager() {
  // Player collision box
  let playerTopRight = player.x + player.width;
  let playerBottomRight = player.y + player.height;
  let playerTopLeft = player.x;
  let playerBottomLeft = player.y;
  for (let i = 0; i < obstacleGroup.length; i++) {
    // Obstacle collision box
    let offset = 10; // Offset to make the collision box width smaller
    let obstacleTopRight =
      obstacleGroup[i].getCollisionBox().x +
      obstacleGroup[i].getCollisionBox().width -
      offset;
    let obstacleBottomRight =
      obstacleGroup[i].getCollisionBox().y +
      obstacleGroup[i].getCollisionBox().height;
    let obstacleTopLeft = obstacleGroup[i].getCollisionBox().x + offset;
    let obstacleBottomLeft = obstacleGroup[i].getCollisionBox().y;
    // Check if player and obstacle collide, if so, reset the game
    if (
      playerTopRight > obstacleTopLeft &&
      playerBottomRight > obstacleBottomLeft &&
      playerTopLeft < obstacleTopRight &&
      playerBottomLeft < obstacleBottomRight
    ) {
      sceneManager.setScene("menu");
    }
    // For each obstacle, draw collision box (red)
    if (showDebug) {
      stroke(255, 0, 0);
      noFill();
      rect(
        obstacleTopLeft,
        obstacleBottomLeft,
        obstacleTopRight - obstacleTopLeft,
        obstacleBottomRight - obstacleBottomLeft
      );
    }
  }
  // Draw player collision box (green)
  if (showDebug) {
    stroke(0, 255, 0);
    noFill();
    rect(
      playerTopLeft,
      playerBottomLeft,
      playerTopRight - playerTopLeft,
      playerBottomRight - playerBottomLeft
    );
  }
}

// =============== UI ===============

// Print score at top left corner
function drawGameScore() {
  textAlign(LEFT);
  textFont(fontAtma);
  textSize(32);
  fill(255);
  text("Score: " + score + " x" + multiplier, 10, 40);
}

// Print "Press 'Esc' to exit" at top right corner
function drawGameEscHint() {
  textFont(fontAtma);
  textSize(24);
  fill(255);
  textAlign(RIGHT);
  text("Press 'Esc' to exit", CONFIG.VIEWPORT.width - 10, 25);
}

// Print high score at top left corner, under score
function drawGameHighScore() {
  textAlign(LEFT);
  textFont(fontAtma);
  textSize(24);
  fill(255);
  text("High Score: " + highScore, 10, 65);
  updateHighScore();
}

// Print debug stats at top right corner, under esc hint
function drawDebugStats() {
  if (!showDebug) return;
  textAlign(RIGHT);
  textFont(fontAtma);
  textSize(24);
  fill(255);
  text("Frame: " + frameCount, CONFIG.VIEWPORT.width - 10, 50);
  text("Player Y: " + player.y, CONFIG.VIEWPORT.width - 10, 80);
  text("Player Vel: " + player.velocity, CONFIG.VIEWPORT.width - 10, 110);
  text("Player Grounded: " + player.grounded, CONFIG.VIEWPORT.width - 10, 140);
  text("FPS: " + fps, CONFIG.VIEWPORT.width - 10, 170);
  text("Obstacles: " + obstacleGroup.length, CONFIG.VIEWPORT.width - 10, 200);
  text("Game Speed: " + gameSpeed, CONFIG.VIEWPORT.width - 10, 230);
  // Update FPS every 10 frames to reduce flickering
  if (frameCount % 10 == 0) {
    fps = floor(frameRate());
  }
}

// =============== ENVIRONMENT ===============

function drawGameBackground() {
  // Color starting from the top of the screen
  let startColor = color(
    CONFIG.COLORS.secondary.r,
    CONFIG.COLORS.secondary.g,
    CONFIG.COLORS.secondary.b
  );
  // Color ending at the bottom of the screen
  let endColor = color(
    CONFIG.COLORS.primary.r,
    CONFIG.COLORS.primary.g,
    CONFIG.COLORS.primary.b
  );
  // Simulate gradient background by drawing lines from top to bottom.
  for (let i = 0; i < CONFIG.VIEWPORT.width; i++) {
    let inter = map(i, 0, CONFIG.VIEWPORT.height, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(0, i, CONFIG.VIEWPORT.width, i);
  }
}

function drawGameSun() {
  // Draw shadow of the sun
  noStroke();
  fill(191, 124, 73);
  arc(width / 1.3, height / 6, 60, 60, 0, HALF_PI * 3);
  // Draw sun on top of shadow
  noStroke();
  fill(255, 255, 204);
  arc(width / 1.3, height / 6, 40, 40, 0, HALF_PI * 4);
}

function drawGameGround() {
  fill(255, 255, 204);
  rect(0, 380, CONFIG.VIEWPORT.width, 100);
}

// =============== STARS ===============
// Run at the start of the game to generate stars
function setupStars() {
  for (let i = 0; i < 15; i++) {
    let x = random(10, CONFIG.VIEWPORT.width - 10);
    let y = random(10, CONFIG.VIEWPORT.height / 3);
    stars.push({ x, y });
  }
}

// Run every frame to draw the stars
function drawStars() {
  noStroke();
  fill(255, 255, 204);
  for (let star of stars) {
    ellipse(star.x, star.y, 5, 5);
  }
}

// =============== SETUP HIGH SCORE ===============
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}
