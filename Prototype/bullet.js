class Bullet {
	constructor(x, y, r1, r2) {
		this.x = x;
		this.y = y;
		this.r1 = r1;
		this.r2 = r2;
	}

	show() {
		ellipse(this.x, this.y, this.r1, this.r2);
	}

	shot() {
		this.x += 1;
	}

}
