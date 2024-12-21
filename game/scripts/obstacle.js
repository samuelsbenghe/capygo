let obstacleGroup = [];
let lastObstacleSpawn = 0;
let obstacleOptions, obstacle1, obstacle2;

class Obstacle {
  constructor(sprite) {
    this.x = CONFIG.VIEWPORT.width;
    this.y = CONFIG.FLOOR_Y - 70;
    this.width = 55;
    this.height = 156;
    this.speed = 7 * gameSpeed;
    this.sprite = sprite;
  }

  show() {
    image(this.sprite, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }
}
