class Monster {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    ellipse(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= 1;
  }
}