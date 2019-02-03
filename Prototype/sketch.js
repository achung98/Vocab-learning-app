//find pictures/gif for monsters [x]
//fix when words go past [x]
//add pictures for person and gun[x]
//add more words and pictures [x]
//add bomb sound [x]
//add solution
//monster hits person => go back [x]
//reward sound (after "killing" the word) [x]
//remove bulletWord, just kill it when say the word
//make spanish?
let pos = 0;
let bg;
pressed = false;
x = 800;
person = new Person(10, 540, 40, 60, 0, 255);
bullet = new Bullet(55, 350, 20, 20, 5);
bulletWord = new Bullet(55, 268, 20, 20);

let monsters = [];
let xMons, yMons;
let price = [5, 3];
let move = 0.75;
let health = 1;
let chase = false;

var img;
var song_sound;
var reward_sound;
var k = 0;
var images = ['assets/apple.png','assets/banana.png',
  'assets/computer.png','assets/house.png',
  'assets/glasses.png','assets/dog.png',
  'assets/chair.png','assets/watch.png',
  'assets/truck.png','assets/fire.png',
  'assets/car.png','assets/icecream.png',
  'assets/shoes.png','assets/pencil.png','assets/tiger.png'
  ];



//var gif;
function setup() {
  createCanvas(1000, 700);
  //shot_sound = loadSound('assets/shot.mp3');
  reward_sound = loadSound('assets/reward.mp3');
  
  for(let i = 0; i < 20; i++) {
  var mybird ;
  mybird = createImg("assets/trump.gif");
  mybird.size(80,80);
  mybird.position(800+i*80,520);


  monsters.push(new Monster(800+i*80, 520, 20, 20, health,mybird));
}



  img = loadImage(images[0]);

  bg = loadImage('assets/bg.png');


  var words = ['apple','banana','computer','house','glasses','dog','chair','watch','truck','fire','car','ice cream','shoes','pencil','tiger'];

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

 


  xMons = monsters[0].look.x;
  yMons = monsters[0].look.y;

  if(bullet.x >= xMons-15 && bullet.y >= yMons-15) {
    //shot_sound.play();
    bullet.x = 55;
    bullet.y = 350;
    monsters[0].health--;
    if(!monsters[0].health) {
      monsters[0].health = health;
      console.log(monsters[0].health);
      let temp = monsters.shift();
      //temp.x = monsters[monsters.length-1].x+80;
      temp.look.position(monsters[monsters.length-1].look.x+80,monsters[monsters.length-1].look.y);
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
    temp.look.position(monsters[monsters.length-1].look.x+80,monsters[monsters.length-1].y);
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
    reward_sound.play()
      //if (k == images.length) k = 0;
      img = loadImage(images[k]);
      person.money++;
      //bulletWord.x = 55;
      x = 1000;
      console.log(person.money);
      pressed = false;
    //bulletWord.show();
    //bulletWord.shot();
    //if(bulletWord.x >= x) {}
  }
  else if(x < 0){
    if(k == images.length-1) k =0;
    else k++;
    img = loadImage(images[k]);
    x = 1000;
  }

  //reward_sound.stop();

  image(img, x,250,60,60);
  //ellipse(x, 270, 40, 40);
  x -= 7.6;
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
