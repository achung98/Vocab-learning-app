var target = new Target(500,200);
var cop = new Cop(100,100,5);
var cops = [cop];
var nCops = 0;

var xC = 100;
var yC = 100;

function setup(){
    var canvas = createCanvas(600,600);
    for(var i=0; i < nCops; i++){
      cops.push(new Cop(random(width),random(height),random(1,10)));
    }


}
function draw(){
    background(0);
    target.show();

    var xT = target.x;
    var yT = target.y;

    cops.forEach(function(c){
      c.show();
      c.chase(xT,yT);
    })



    //ellipse(xC,yC,20,20);

    //console.log("xC " + xC + " yC: " + yC);
    //frameRate(0.5);

}

function Cop(x,y,speed){
  this.x = x;
  this.y = y;
  this.r = 20;
  //this.type =

  this.show = function(){
    fill(0,255,0);
    noStroke();
    ellipse(this.x,this.y,this.r,this.r);
  }

  this.chase = function(xT,yT){
    var xC = this.x;
    var yC = this.y;

    var offX = 0;
    var offY = 0;

/*
    if(dist(xC,yC,xT,yT) < 100){
      offX = 0;
      offY = 0;

    }
    */


    var a = findSlope(xC + offX,yC +offY,xT,yT);

    var x_step = 0;
    var y_step = 0;

    //console.log(line.length);
    var x_step_1 = getXStep(a,speed)[0];
    var y_step_1 = getYStep(a,x_step_1);
    var x_step_2 = getXStep(a,speed)[1];
    var y_step_2 = getYStep(a,x_step_2);


    //console.log("x_step_1 " + x_step_1 + " y_step_1: " + y_step_1);
    //console.log("x_step_2 " + x_step_2 + " y_step_2: " + y_step_2);
    var d1 = dist(xC+x_step_1,yC+y_step_1,xT,yT);
    var d2 = dist(xC+x_step_2,yC+y_step_2,xT,yT);
    if(d1 < d2){
      x_step = x_step_1;
      y_step = y_step_1;
    }
    else {
      x_step = x_step_2;
      y_step = y_step_2;
    }
    console.log("x_step " + x_step + " y_step: " + y_step);
    //console.log(x_step + ":" + y_step);

    this.x += x_step;
    this.y += y_step;

  }

}


function Target(x,y){
  this.x = x;
  this.y = y;
  this.r = 20;

  this.show = function(){
    fill(255,0,0);
    noStroke();
    ellipse(this.x,this.y,this.r,this.r);
  }

}

function findSlope(x1,y1,x2,y2){
  var a = (y1-y2)/(x1-x2);
  return a;
}
function getXStep(a,speed){
  //ax = y st x^2+y^2 = speed^2
  //x^2 + (ax)^2 = speed^2
  //x^2 + a^2 x^2 - speed^2 = 0
  //(1+a^2) x^2 - speed^2 = 0

  var A = (1+Math.pow(a,2));
  var B = 0;
  var C = -Math.pow(speed,2);
  var delta = Math.sqrt(Math.pow(B,2) - 4*A*C);

  see([A,B,C,delta],['A','B','C','delta'])
  var x1 = (B*(-1) + delta)/(2*A);
  var x2 = (B*(-1) - delta)/(2*A);
  console.log("x1: " + x1 + " x2: " + x2);

  return [x1,x2];

}
function getYStep(a,x){
  //console.log()
  return a*x;
}

function mouseMoved(){
  target.x = mouseX;
  target.y = mouseY;
}
function mouseClicked(){
  noLoop();
}

function see(args,argNames){
  var out = "";
  for(var i=0; i < args.length;i++){
    out += argNames[i] + ": " + args[i] + " ";
  }
  console.log(out);
}
