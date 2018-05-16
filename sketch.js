var mic = undefined; var eyes_left = undefined; var eyes_right = undefined; var placeholder = { w: undefined, h: undefined };

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  placeholder.w = window.innerWidth; placeholder.h = window.innerHeight;
  
  mic = new p5.AudioIn();
  mic.start();
  
  eyes_right = new Eye(width / 2 - 125, height / 2 - 100, 75);
  eyes_left = new Eye(width / 2 + 125, height / 2 - 100, 75);
}

function draw() {
 
 if(window.innerWidth != placeholder.w || window.innerHeight != placeholder.h) {
  eyes_right.change(width / 2 - 125, height / 2 - 100); eyes_left.change(width / 2 + 125, height / 2 - 100)
 }
 
  var micLevel = mic.getLevel();
  adjustedMicLevel = micLevel * 750;
  
  noStroke();
  fill(255, 255, 0);
  ellipse(width / 2, height / 2, 500, 500);
  eyes_right.update(mouseX, mouseY); eyes_right.display();
  eyes_left.update(mouseX, mouseY); eyes_left.display();
  if(adjustedMicLevel < 225) {
    fill(255, 0, 0);
    ellipse(width / 2, height / 2 + 100, 350, adjustedMicLevel);
  } else {
    ellipse(width / 2, height / 2 + 100, 350, 225);
  }
}

function windowResized() { resizeCanvas(window.innerWidth, window.innerHeight); }

function Eye(tx, ty, ts) {
 this.x = tx; this.y = ty; this.size = ts; this.angle = 0;

  this.update = function(mx, my) { this.angle = atan2(my - this.y, mx - this.x); }
  this.display = function() {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    rotate(this.angle);
    fill(66, 244, 178);
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  }
  this.change = function(x, y) { this.x = x; this.y = y }
}
