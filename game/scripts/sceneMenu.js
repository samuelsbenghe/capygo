function drawMenu() {
  noStroke(); // Remove the stroke in case you exited game during debug mode
  drawMenuBackground();
  drawMenuLogo();
  drawMenuHint();
}

function drawMenuLogo() {
  image(
    imgLogo,
    CONFIG.VIEWPORT.width / 3 - 100,
    CONFIG.VIEWPORT.height / 200,
    400,
    400
  );
}

function drawMenuBackground() {
  fill(255, 255, 204);
  rect(0, 0, CONFIG.VIEWPORT.width, CONFIG.VIEWPORT.height);
}

// Tells the player how to start the game
function drawMenuHint() {
  textFont(fontAtma);
  textSize(44);
  fill(0);
  textAlign(CENTER);
  text(
    'Press "Space" to start!',
    CONFIG.VIEWPORT.width / 2,
    CONFIG.VIEWPORT.height / 1.2
  );
}
