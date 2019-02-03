pressed = false;
x = 400;
person = new Person(10, 540, 40, 60, 0, 255);
bullet = new Bullet(55, 350, 20, 20, 5);
let monsters = [];
let xMons, yMons;
let chase = false;

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

  xMons = monsters[0].x;
  yMons = monsters[0].y;

  if(bullet.x >= xMons && bullet.y >= yMons) {
    bullet.x = 55;
    bullet.y = 350;
    let temp = monsters.shift();
    temp.x = monsters[monsters.length-1].x+80;
    monsters.push(temp);
    chase = false;
  }

  textSize(30);
  fill(255);
  text(person.money, 300, 150);

  if(person.x >= xMons-50) {
    person.color = 150;
    let temp = monsters.shift();
    temp.x = monsters[monsters.length-1].x+80;
    monsters.push(temp);
  }

  monsters.forEach(e => {
    e.show();
    e.move();
  })

	/*if(person.checkCollision(x)) {
		x = 500;
		console.log(person.money);
	}*/
	if(frameCount%100 == 0 || chase) {
    bullet.show();
		chase = bullet.chase(xMons, yMons);
	}
}

function keyPressed() {
	pressed = true;
}
