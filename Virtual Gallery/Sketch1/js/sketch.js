

// Setch 1 // 

// The Lorenz Attractor. //

// Define the global variables. 

let x = 0.1; // The starting position on the x-axis.
let y = 0; // The starting position on the y-axis. 
let z = 0; // The starting position on the z-axis. 

let a = 9; // Changes these variables will alter the positions of the points for the attractor.
let b = 24; // Increasing this variable will change how far the attractor comes out to the user.
let c = 13 / 3;

let points = new Array(); // This stores all the points' values from the attractor in an array. 

function setup() { // Create setup function. 
  createCanvas(1200, 800, WEBGL); // Creates canvas and allows the artwork to be 3D. 
  colorMode(HSB); // Changes the color from RGB to HSB. 
}

function draw() { // Create draw funtion.
  background(265, 85, 8);

  // These are variables and equations that are orthogonal. 
  let dt = 0.01; /* This changes the distance from the center to the front of the screen. If the number is increased, the 
                    attractor comes in closer to the user. */
  let dx = a * (y - x) * dt; // The formula to get the results for dx. (a value multiplied by (y value- x value) multiplied by the value of dt)
  let dy = (x * (b - z) + y) * dt; // The formula to get the results for dy. 
  let dz = (x * y - c * z) * dt; // The formula to get the results for dz. 
  x = x + dx; // x equals the value of x + the value of dx.
  y = y + dy; // y equals the value of x + the value of dy.
  z = z + dz; // z equals the value of x + the value of dz.

  points.push(new p5.Vector(x, y, z)); // This adds a new vector to the array list every time a point is added. 

  translate(0, 0, -80);
  let camX = map(mouseX, 0, width, -500, 500); // Creates the camera movements that are usable by moving your mouse. This is for the X-axis. 
  let camY = map(mouseY, 0, height, -500, 500); // Creates the camera movements usable by mouse for the Y-axis.
  camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 1, 1, 0, 10, 0); // This centers the camera and drawing at the center of the canvas. 
  scale(7); // This transforms the size of the drawing. 
  stroke(255); // Stroke color. 
  noFill();

  let hu = 0; // The variable for the hue color of the attractor, starting at 0. 
  beginShape(); // Begin the continuous shape. 

  for (let v of points) { // Create a for loop that adds points after points are stored in the array list. 
    stroke(hu, 255, 255); // Stroke color. 
    vertex(v.x, v.y, v.z); // For every vector (v) in the array list, points will be drawn at these coordinates. 
    var offset = p5.Vector.random3D(); // This adds an offset to the vectors that results in jagged lines and edges. 
    offset.mult(0.03); // This allows you to lower or increase the offset.  
    v.add(offset); // This adds the vectors in regard to the offset. 

    hu += 0.4; // Increases the hue of the attractor for every vertex. 
    if (hu > 255) { // If hue color exceeds 255, it resets to 0.
      hu = 0;
    }
  }
  endShape(); // End the shape and repeat. 

}

