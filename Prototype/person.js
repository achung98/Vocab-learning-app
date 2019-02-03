class Person {
	constructor(x, y, w, h, money, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.money = money;
		this.color = color;
	}

	show() {
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
		fill(255);
	}

	checkCollision(xWord) {
		if(this.x >= xWord-20) {
			this.money--;
			return true;
		}
	}
}
