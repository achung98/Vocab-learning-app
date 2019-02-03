let bg;
pressed = false;
x = 400;
person = new Person(10, 540, 40, 60, 0, 255);
bullet = new Bullet(55, 350, 20, 20, 5);

bulletWord = new Bullet(55, 268, 20, 20);
let monsters = [];
let xMons, yMons;
let chase = false;

var img;
var k = 0;
var images = ['assets/apple.png',
  'assets/banana.png',
  'assets/computer.png',
  'assets/house.png',
  'assets/glasses.png',
  'assets/dog.png'];

for(let i = 0; i < 20; i++) {
  monsters.push(new Monster(450+i*80, 560, 20, 20));
}

function setup() {
  createCanvas(700, 700);

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

  if(pressed) {
    bulletWord.show();
    bulletWord.shot();
    if(bulletWord.x >= x) {
      console.log(k);
      //if (k == images.length) k = 0;
      img = loadImage(images[k]);
      person.money++;
      bulletWord.x = 55;
      x = 500;
      console.log(person.money);
      pressed = false;
    }
  }

  image(img, x,250,50,50); 
  //ellipse(x, 270, 40, 40);
  x -= 1.6;
}

function keyPressed() {
	pressed = true;
}
