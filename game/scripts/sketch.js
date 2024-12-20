let sceneManager;

function preload() {
  // Load Assets
  fontAtma = loadFont("assets/Atma-Regular.ttf");
  fontKnewave = loadFont("assets/Knewave-Regular.ttf");
  imgLogo = loadImage("assets/logo.png");
}

function setup() {
  createCanvas(CONFIG.VIEWPORT.width, CONFIG.VIEWPORT.height);
  frameRate(60);

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
  // START GAME (SPACE)
  if (sceneManager.getScene() === "menu" && keyCode === 32) {
    gameReset();
    sceneManager.setScene("game");
  }

  // STOP GAME (ESC)
  if (sceneManager.getScene() === "game" && keyCode === 27) {
    sceneManager.setScene("menu");
  }
}

function keyReleased() {}

function mousePressed() {}

function mouseReleased() {}
