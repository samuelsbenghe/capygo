// Store the current obstacles in the game. Remove obstacle when it goes offscreen.
let obstacleGroup = [];
let lastObstacleSpawn = 0; // Frames since last obstacle spawn

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
    // Compute how much to offset the obstacle vertically based on the scale
    const offsetY = (1 - this.scale) * this.height;
    image(
      this.sprite,
      this.x,
      this.y + offsetY,
      this.width * this.scale,
      this.height * this.scale
    );
  }

  // Move the obstacle to the left every frame
  update() {
    this.x -= this.speed;
  }

  // Get the (imaginary) collision box of the obstacle
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
