class Monster {
  constructor(x, y, w, h, health) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = health;
  }

  show() {
    ellipse(this.x, this.y, this.w, this.h);
  }

  move(move) {
    this.x -= move;
  }
}
