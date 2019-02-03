class Person {
	constructor(x, y, w, h, money, color, upgrades, power) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.money = money;
		this.color = color;
		this.upgrades = {velocity: 0, power: 0};
		this.power = 1;
	}

	show() {
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
		fill(255);
	}

	getUpgrades(keyStroke, price) {
		let cont;
		if(keyStroke < 3) {
			if(keyStroke == 1) {
				if(this.money >= price[0]) {
					this.upgrades.velocity += 1;
					cont = 0;
					this.money -= price[cont];
				}
			} else if(keyStroke == 2) {
				if(this.money >= price[1]) {
					this.upgrades.power += 1;
					cont = 1;
					this.money -= price[cont];
				}
			}
		}

		return cont;
	}
}
