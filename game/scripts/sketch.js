let sceneManager;

function preload() {}

function setup() {
  createCanvas(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
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
