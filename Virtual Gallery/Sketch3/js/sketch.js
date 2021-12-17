

// Sketch 3 // 

// The Spirograph. //

// Define the global variables. 

var path = [];

var angle = 0;

var resolution = 0.5;

var sun;

var end;

var r;

var g;

var b; 



function setup() { // Setup the sketch. 
  createCanvas(800, 800); // Create canvas size
  sun = new Orbit(width / 2, height / 2, width / 4.5, 0); // Center the spirograph vertically and horizontality. 
  var next = sun;
  for (var i = 0; i < 300; i++) { // For loop for the strokes. 
    next = next.addChild(); // This returns the loop by adding the child of the original. 
  }
  end = next; // When a loop segment ends, it repeats. 
}

function draw() {
  background(10, 3, 20); // Background color for canvas. 

  for (var i = 0; i < resolution; i++) {
    var next = sun;
    while (next != null) {
      next.update();
      next = next.child; // The child of the original stroke repeats when the original ends. 
    }
    path.push(createVector(end.x, end.y)); // Adds a new vector when the points at x and y end. 
  }

  beginShape(); // This function begins the animation for one continuous path. 
  stroke(r, g, b); // The color for the stroke of the spirograph. 
  noFill(); // No fill in order to give it the look of a spirogrpah. 
  for (var pos of path) { // This stores the positions of paths for the x and y positions. 
    vertex(pos.x, pos.y);
  }
  endShape(); // This function ends the animation for one continuous path and replays over and over again. 
}


var k = -8.6; // Changing this variable changes the parent spirograph's appearance. 



function Orbit(x_, y_, r_, n, p) {
  // Declaring variables for the orbit function.
  this.x = x_;
  this.y = y_;
  this.r = r_;
  this.parent = p;
  this.child = null;
  this.speed = pow(k, n - 1); // The formula for the power of the orbit. This allows it to continue making new points at different coordinates every time one segment is completed. 
  this.angle = -PI / 2; // Changes the angle of the spirograph starting location. 

  this.addChild = function() {
    var newr = this.r / 3; // Radius divided by 3. By changing the value the radius is divided by, new spirographs can be made with different patterns. 
    var newx = this.x + this.r + newr; // New x value is created based on the current x value, radius value, and new radius value that was created before (this.r / 3.0;). 
    var newy = this.y; // The y value does not change. 
    this.child = new Orbit(newx, newy, newr, n + 1, this); /*The formula for spriogrpah to repeat itself after the orginal ends. This allows it to keep
                                                            "spinning" at a slight offset and create an interesting shape after occuring multiple times. */
    return this.child; // Return to the beginning. 
  }

  this.update = function() { // This updates the position every frame. Equations are created to make this happen.  
    var parent = this.parent; // Create the parent variable for the current parent. 
    if (parent != null) {
      this.angle += this.speed;
      var rsum = this.r + parent.r;
      this.x = parent.x + rsum * cos(this.angle);
      this.y = parent.y + rsum * sin(this.angle);
    }
  }

  this.show = function() { // Add the attributes for the lines and ellipses.
    stroke(255, 100);  
    strokeWeight(0.5);
    noFill(); // Only want the stroke to be colored. 
    ellipse(this.x, this.y, this.r * 2, this.r * 2); // The dimensions for the ellipses that the stroke follows. 
  }
}


function mousePressed() { // Changes the color of the spirograph when the mouse is clicked.

  r = random(255);
  g = random(255);
  b = random(255);


}