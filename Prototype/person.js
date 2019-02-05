class Person {
	constructor(castleIcon, cannonIcon, money, color, upgrades, power) {
		this.castleIcon = castleIcon;
		this.cannonIcon = cannonIcon;
		this.money = money;
		this.color = color;
		this.upgrades = {velocity: 0, power: 0};
	}

	show() {
		// Displays the castle and cannon
		image(this.cannonIcon, 90, 380, this.castleIcon.width / 7, this.castleIcon.height / 7);
		image(this.castleIcon, 10, 350, this.castleIcon.width / 5, this.castleIcon.height / 5);
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
