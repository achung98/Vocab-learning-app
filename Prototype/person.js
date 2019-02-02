class Person {
	constructor(x, y, w, h, money) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.money = money;
	}

	show() {
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}

	checkCollision(xWord) {
		if(this.x >= xWord-20) {
			this.money--;
			return true;
		}
	}
}
