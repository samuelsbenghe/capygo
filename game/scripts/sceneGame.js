// Variables
let frameCount = 0;
let score = 0;
let multiplier = 1;
let showDebug = false;

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
  // Game Logic
  gameScoreManager();
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

function gameReset() {
  score = 0;
  multiplier = 1;
  frameCount = 0;
  starsDrawn = false;
  stars = [];
  player.reset();
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
