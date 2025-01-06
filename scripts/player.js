let jumpPressed = false;
let animationSpeed = 4;

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
    // Adjust width and height based on current frame, as different frames have different dimensions.
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
    // Draw the current frame.
    image(currentFrame, this.x, this.y, this.width, this.height);
  }
  // Set animation to "walk".
  walk() {
    // Cycle through the walk animation frames every animationSpeed (4) frames.
    currentFrame =
      animationWalk[floor(frameCount / animationSpeed) % animationWalk.length];
  }
  // Set animation to "float".
  float() {
    // Set current frame to the first frame of the walk animation and keep it like that for as long as the capybara is floating.
    currentFrame = animationWalk[0];
  }
  // Set negative velocity to make capybara accelerate upwards
  jump() {
    this.velocity = -20;
    this.y += this.velocity;
    this.grounded = false;
  }
  // Reset capybara state to default values
  reset() {
    this.x = 50;
    this.y = CONFIG.FLOOR_Y;
    this.grounded = true;
    this.velocity = 0;
  }
  // Execute every frame, update capybara position and animation
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
