class Monster {
  constructor(x, y, w, h, health,look) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = health;
    this.look = look;
  }

  show() {
    //ellipse(this.x, this.y, this.w, this.h);
  }

  move(move) {
    this.look.x = this.look.x - move;
    //var temp = this.look.position.x - move;
    this.look.position(this.look.x,this.y);
  }
}
