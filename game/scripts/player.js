let jumpPressed = false;
let animationWalk, walk1, walk2, walk3, walk4, walk5;
let animationSpeed = 4;
let currentFrame;

class Player {
  constructor() {
    this.x = 50;
    this.y = CONFIG.FLOOR_Y;
    this.width = 72;
    this.height = 60;
    this.grounded = true;
    this.gravity = 1;
    this.velocity = 0;
  }
  show() {
    switch (currentFrame) {
      case walk1:
        this.width = 72;
        this.height = 60;
        break;
      case walk2:
        this.width = 66;
        this.height = 57;
      case walk3:
        this.width = 60;
        this.height = 60;
      case walk4:
        this.width = 66;
        this.height = 64;
      case walk5:
        this.width = 66;
        this.height = 63;
        break;
    }
    image(currentFrame, this.x, this.y, this.width, this.height);
  }
  walk() {
    currentFrame =
      animationWalk[floor(frameCount / animationSpeed) % animationWalk.length];
  }
  float() {
    currentFrame = animationWalk[0];
  }
  // Set negative velocity to make capybara accelerate upwards
  jump() {
    this.velocity = -20;
    this.y += this.velocity;
    this.grounded = false;
  }
  reset() {
    this.x = 50;
    this.y = CONFIG.FLOOR_Y;
    this.grounded = true;
    this.velocity = 0;
  }
  update() {
    this.y += this.velocity;
    this.velocity += this.gravity;

    // If grounded, set velocity to 0 and start walking animation. If not grounded, start floating animation.
    if (this.grounded) {
      this.velocity = 0;
      this.walk();
    } else {
      this.float();
    }
    // Simulate floor collision by not letting this.y go below floorY
    if (this.y >= CONFIG.FLOOR_Y) {
      this.y = CONFIG.FLOOR_Y;
      this.grounded = true;
    }

    // Jump, self-explanatory
    if (jumpPressed && this.grounded) {
      this.jump();
    }
    this.show();
  }
}

let player = new Player();
