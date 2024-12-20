let sceneManager;

function preload() {
  // Load Assets
  fontAtma = loadFont("assets/Atma-Regular.ttf");
  fontKnewave = loadFont("assets/Knewave-Regular.ttf");
  imgLogo = loadImage("assets/logo.png");

  // Load Obstacles
  obstacle1 = loadImage("assets/cactus1.png");
  obstacle2 = loadImage("assets/cactus1.png");

  // Load Sprites
  walk1 = loadImage("assets/walk1.png");
  walk2 = loadImage("assets/walk2.png");
  walk3 = loadImage("assets/walk3.png");
  walk4 = loadImage("assets/walk4.png");
  walk5 = loadImage("assets/walk5.png");
}

function setup() {
  createCanvas(CONFIG.VIEWPORT.width, CONFIG.VIEWPORT.height);
  frameRate(60);

  // Setup Animations
  animationWalk = [walk1, walk2, walk3, walk4, walk5];
  currentFrame = walk1;

  // Setup Scenes
  sceneManager = new SceneManager();
  sceneManager.addScene("game", drawGame);
  sceneManager.addScene("menu", drawMenu);
  sceneManager.setScene("menu");
}

function draw() {
  sceneManager.draw();
}

function keyPressed() {
  // START GAME (space)
  if (sceneManager.getScene() === "menu" && keyCode === 32) {
    gameReset();
    sceneManager.setScene("game");
  }

  // STOP GAME (esc)
  if (sceneManager.getScene() === "game" && keyCode === 27) {
    sceneManager.setScene("menu");
  }

  // JUMP (up arrow or space or w)
  if (
    sceneManager.getScene() === "game" &&
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
  if (
    sceneManager.getScene() === "game" &&
    (keyCode == 38 || keyCode == 32 || keyCode == 87)
  ) {
    jumpPressed = false;
  }
}

function mousePressed() {
  // JUMP (mouse click)
  if (sceneManager.getScene() === "game") {
    jumpPressed = true;
  }
}

function mouseReleased() {
  // STOP JUMP (mouse click)
  if (sceneManager.getScene() === "game") {
    jumpPressed = false;
  }
}
