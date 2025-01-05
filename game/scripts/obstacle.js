let obstacleGroup = [];
let lastObstacleSpawn = 0;

class Obstacle {
  constructor(sprite, scale = 1) {
    this.x = CONFIG.VIEWPORT.width;
    this.y = CONFIG.FLOOR_Y - 70;
    this.width = 55;
    this.height = 156;
    this.speed = 7 * gameSpeed;
    this.sprite = sprite;
    this.scale = scale;
  }

  show() {
    const offsetY = (1 - this.scale) * this.height;
    image(
      this.sprite,
      this.x,
      this.y + offsetY,
      this.width * this.scale,
      this.height * this.scale
    );
  }

  update() {
    this.x -= this.speed;
  }

  getCollisionBox() {
    const offsetY = (1 - this.scale) * this.height;
    return {
      x: this.x,
      y: this.y + offsetY,
      width: this.width * this.scale,
      height: this.height * this.scale,
    };
  }
}
