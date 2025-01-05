let fontAtma, imgLogo;

let obstacle1, obstacle2;
let obstacleOptions;

let walk1, walk2, walk3, walk4, walk5;
let animationWalk;
let currentFrame;

function AssetPreload() {
  // Load Assets
  fontAtma = loadFont("assets/Atma-Regular.ttf");
  imgLogo = loadImage("assets/logo.png");

  // Load Obstacles
  obstacle1 = loadImage("assets/cactus1.png");
  obstacle2 = loadImage("assets/cactus2.png");

  // Load Sprites
  walk1 = loadImage("assets/walk1.png");
  walk2 = loadImage("assets/walk2.png");
  walk3 = loadImage("assets/walk3.png");
  walk4 = loadImage("assets/walk4.png");
  walk5 = loadImage("assets/walk5.png");
}

function AssetSetup() {
  // Setup Animations
  animationWalk = [walk1, walk2, walk3, walk4, walk5];
  currentFrame = walk1;

  // Setup Obstacles
  obstacleOptions = [obstacle1, obstacle2];
}
