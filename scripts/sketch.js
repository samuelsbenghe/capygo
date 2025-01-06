function preload() {
  AssetPreload();
}

function setup() {
  createCanvas(CONFIG.VIEWPORT.width, CONFIG.VIEWPORT.height);
  frameRate(60);

  // Setup Assets
  AssetSetup();

  // Setup Scenes
  sceneManager = new SceneManager();
  sceneManager.addScene("game", drawGame);
  sceneManager.addScene("menu", drawMenu);
  sceneManager.setScene("menu"); // Start game in menu scene
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
