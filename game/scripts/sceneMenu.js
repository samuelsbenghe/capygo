function drawMenu() {
  drawMenuBackground();
  drawMenuLogo();
  //drawMenuTitle(); // Add the title back later if I find a good place for it
  drawMenuHint();
}

function drawMenuTitle() {
  textFont(fontKnewave);
  textSize(96);
  fill((v1 = 191), (v2 = 124), (v3 = 73));
  textAlign(CENTER);
  text("Capy Go!", CONFIG.VIEWPORT.width / 2, CONFIG.VIEWPORT.height / 5);
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
