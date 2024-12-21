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

function gameReset() {
  // Variables
  score = 0;
  multiplier = 1;
  frameCount = 0;
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
  for (let i = 0; i < obstacleGroup.length; i++) {
    // Obstacle collision box
    let offset = 10;
    let obstacleTopRight = obstacleGroup[i].x + obstacleGroup[i].width - offset;
    let obstacleBottomRight = obstacleGroup[i].y + obstacleGroup[i].height;
    let obstacleTopLeft = obstacleGroup[i].x + offset;
    let obstacleBottomLeft = obstacleGroup[i].y;
    // Player collision box
    let playerTopRight = player.x + player.width;
    let playerBottomRight = player.y + player.height;
    let playerTopLeft = player.x;
    let playerBottomLeft = player.y;
    if (
      playerTopRight > obstacleTopLeft &&
      playerBottomRight > obstacleBottomLeft &&
      playerTopLeft < obstacleTopRight &&
      playerBottomLeft < obstacleBottomRight
    ) {
      sceneManager.setScene("menu");
    }
    // draw obstacle collision box
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
  // draw player collision box
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

function drawGameScore() {
  textAlign(LEFT);
  textFont(fontAtma);
  textSize(32);
  fill(255);
  text("Score: " + score + " x" + multiplier, 10, 40);
}

function drawGameEscHint() {
  textFont(fontAtma);
  textSize(24);
  fill(255);
  textAlign(RIGHT);
  text("Press 'Esc' to exit", CONFIG.VIEWPORT.width - 10, 25);
}

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
  if (frameCount % 10 == 0) {
    fps = floor(frameRate());
  }
}

// =============== ENVIRONMENT ===============

function drawGameBackground() {
  let startColor = color(
    CONFIG.COLORS.secondary.r,
    CONFIG.COLORS.secondary.g,
    CONFIG.COLORS.secondary.b
  );
  let endColor = color(
    CONFIG.COLORS.primary.r,
    CONFIG.COLORS.primary.g,
    CONFIG.COLORS.primary.b
  );
  for (let i = 0; i < CONFIG.VIEWPORT.width; i++) {
    let inter = map(i, 0, CONFIG.VIEWPORT.height, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(0, i, CONFIG.VIEWPORT.width, i);
  }
}

function drawGameSun() {
  noStroke();
  fill(191, 124, 73);
  arc(width / 1.3, height / 6, 60, 60, 0, HALF_PI * 3);
  noStroke();
  fill(255, 255, 204);
  arc(width / 1.3, height / 6, 40, 40, 0, HALF_PI * 4);
}

function drawGameGround() {
  fill(255, 255, 204);
  rect(0, 380, CONFIG.VIEWPORT.width, 100);
}

// =============== STARS ===============
function setupStars() {
  for (let i = 0; i < 15; i++) {
    let x = random(10, CONFIG.VIEWPORT.width - 10);
    let y = random(10, CONFIG.VIEWPORT.height / 3);
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
