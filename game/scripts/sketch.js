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
  sceneManager.add("game");
  sceneManager.add("menu");
  sceneManager.set("menu");
}

function draw() {
  sceneManager.draw();
}

function keyPressed() {}

function keyReleased() {}

function mousePressed() {}

function mouseReleased() {}
