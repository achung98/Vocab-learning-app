pressed = false;
x = 400;
person = new Person(10, 240, 40, 60, 0);
bullet = new Bullet(55, 268, 20, 20);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

	stroke(255);
	line(0, 300, 400, 300);

	person.show();

	if(person.checkCollision(x)) {
		x = 500;
		console.log(person.money);
	}

	if(pressed) {
		bullet.show();
		bullet.shot();
		if(bullet.x >= x) {
			person.money++;
			bullet.x = 55;
			x = 500;
			console.log(person.money);
			pressed = false;
		}
	}

	ellipse(x, 270, 40, 40);
	x -= 1.6;

}

function keyPressed() {
	pressed = true;
}
