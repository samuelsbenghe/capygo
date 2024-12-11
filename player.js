export class Capybara {
    constructor() {
      this.x = 50;
      this.y = 50;
      this.size = 50;
      this.grounded = false;
    }
  
    display() {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }