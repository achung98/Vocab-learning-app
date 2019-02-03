correct = false;
x = 400;
person = new Person(10, 240, 40, 60, 0);
bullet = new Bullet(55, 268, 20, 20);
var img;
var k = 0;
var images = ['https://images.vexels.com/media/users/3/147164/isolated/lists/6bf92415c7b2651f512aa0db5a3e1aba-red-apple-icon-fruit.png',
  'https://images.vexels.com/media/users/3/143061/isolated/lists/aaf71ed4e387a6838e1c521fbecde77a-banana-icon-fruit.png',
  'https://images.vexels.com/media/users/3/158482/isolated/lists/03e067e4661b8a4171216df0ef8dbd4e-computer-illustration.png',
  'https://images.vexels.com/media/users/3/137378/isolated/lists/c54a6e8d091727d3a9c470bb209688a7-home-city-house.png',
  'https://images.vexels.com/media/users/3/159332/isolated/lists/c6b86ab959891c74b8d556c1e022c795-glasses-flat.png',
  'https://images.vexels.com/media/users/3/158509/isolated/lists/e6a3a6c0c9ee65435e3b5cb2aef9693f-dog-puppy-flat.png'];
function setup() {
  createCanvas(400, 400);
  img = loadImage(images[0]); 

  
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
          	correct = true;
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
  background(0);

	stroke(255);
	line(0, 300, 400, 300);

	person.show();

	if(person.checkCollision(x)) {
		x = 500;
		k++;
		console.log(person.money);
	}

	if(correct) {
		bullet.show();
		bullet.shot();
		if(bullet.x >= x) {
			console.log(k);
			//if (k == images.length) k = 0;
			img = loadImage(images[k]);
			person.money++;
			bullet.x = 55;
			x = 500;
			console.log(person.money);
			correct = false;
		}
	}

	//img = loadImage(images[k]);
    // if (k == images.length-1) {
    // 	img = loadImage(images[0])
    // }
    image(img, x,250,50,50); 
	//ellipse(x, 270, 40, 40);
	x -= 1.6;

}

function keyPressed() {
	correct = true;
}
