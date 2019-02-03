let bg;
pressed = false;
x = 800;

let monsters = [];
let xMons, yMons;
let price = [5, 3];
let move = 0.75;
let health = 1;
let chase = false;

// mic variables
var mic;
var volHistory = [];

var img;
var k = 0;
var images = ['assets/apple.png',
  'assets/banana.png',
  'assets/computer.png',
  'assets/house.png',
  'assets/glasses.png',
  'assets/dog.png'];

for(let i = 0; i < 20; i++) {
  monsters.push(new Monster(450+i*80, 560, 20, 20, health));
}

function setup() {
  createCanvas(1000, 700);

  // mic setup
  mic = new p5.AudioIn();
  mic.start();

  person = new Person(loadImage('assets/Castle.png'), loadImage('assets/Cannon.png'), 0, 255);

  bullet = new Bullet(260, 470, 20, 20, 5);
  bulletWord = new Bullet(55, 268, 20, 20);

  img = loadImage(images[0]);

  bg = loadImage('assets/bg.png'); 

  var words = ['apple','banana','computer','house','glasses','dog'];

  startConverting();

    //var r = document.getElementById('result');

    function startConverting () {

      if('webkitSpeechRecognition' in window){
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-US';
        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
          //var k;
          //alert(k);
          var interimTranscripts = '';
          for(var i = event.resultIndex; i < event.results.length; i++){
            var transcript = event.results[i][0].transcript;
            transcript.replace("\n", "<br>");
            finalTranscripts += transcript;
            //alert(finalTranscripts);
            // if(event.results[i].isFinal){
            //   finalTranscripts += transcript;
            // }else{
            //   interimTranscripts += transcript;
            // }
          }
          //alert(finalTranscripts);

          if(finalTranscripts.toLowerCase().includes(words[k])){
            pressed = true;
            console.log(k);
            if(k==words.length-1)  k = 0;
            else k++;


            console.log(finalTranscripts);
          }
          finalTranscripts = "";


          //r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
        };
        speechRecognizer.onerror = function (event) {
        };
      }else{
        //r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
      }
    }


}

function draw() {
  background(bg);
	person.show();

  xMons = monsters[0].x;
  yMons = monsters[0].y;

  if(bullet.x >= xMons-15 && bullet.y >= yMons-15) {
    bullet.x = 260;
    bullet.y = 470;
    monsters[0].health--;
    if(!monsters[0].health) {
      let temp = monsters.shift();
      temp.x = monsters[monsters.length-1].x+80;
      monsters.push(temp);
      person.money++;
    }
    chase = false;
  }

  textSize(30);
  fill(255);
  text(`Money: ${person.money}`, 40, 70);
  text(`Upgrades: 1. Velocity: ${person.upgrades.velocity} 2. Power: ${person.upgrades.power}`, 40, 110);

  if(person.x >= xMons-50) {
    person.color = 150;
    person.money--;
    let temp = monsters.shift();
    temp.x = monsters[monsters.length-1].x+80;
    monsters.push(temp);
  }

  monsters.forEach(e => {
    e.show();
    e.move(move);
  })

	/*if(person.checkCollision(x)) {
		x = 500;
		console.log(person.money);
	}*/
	if(frameCount%100 == 0 || chase) {
    bullet.show();
		chase = bullet.chase(xMons, yMons);
	}

  if(pressed) {
    bulletWord.show();
    bulletWord.shot();
    if(bulletWord.x >= x) {
      console.log(k);
      //if (k == images.length) k = 0;
      img = loadImage(images[k]);

      person.money++;
      bulletWord.x = 550;
      x = 800;
      console.log(person.money);
      pressed = false;
    }
  }

  image(img, x,250,50,50);
  x -= 1.6;
   var vol = mic.getLevel();
   volHistory.push(vol);
   stroke(0, 0, 0, 90);
   strokeWeight(4);
   noFill();
   beginShape();
   for (var i = 0; i < volHistory.length; i++) {
     var y = map(volHistory[i], 0, 1, height / 1.4, 0);
     vertex(i, y);
   }
   endShape();

   if (volHistory.length > width) {
     volHistory.splice(0, 1);
   }
}

function keyPressed() {
	let cont = person.getUpgrades(key, price);
  if(cont == 0) {
    price[0] += 2;
    bullet.speed += 1;
  } else if(cont == 1) {
    price[1] += 2;
    bullet.damage += 1;
  }
    checkUpgrades();
}

function checkUpgrades() {
  let monsterUpgrades = person.upgrades.velocity+person.upgrades.power;
  /*if(person.upgrades.velocity == 2)
    move += 0.25;*/
    console.log(monsterUpgrades%3);
  if(monsterUpgrades%3 == 0) {
    move += 0.25;
    health += 1;
    monsters.map(e => e.health = health);
  }
}
