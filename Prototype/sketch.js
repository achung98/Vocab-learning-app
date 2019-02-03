pressed = false;
x = 400;
person = new Person(10, 540, 40, 60, 0);
bullet = new Bullet(55, 268, 20, 20);
let monsters = [];

for(let i = 0; i < 20; i++) {
  monsters.push(new Monster(450+i*80, 560, 20, 20));
}

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);

	stroke(255);
	line(0, 600, 1000, 600);

	person.show();

  monsters.forEach(e => {
    e.show();
    e.move();
  })

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
}

function keyPressed() {
	pressed = true;
}
