
// Sketch 2 // 

// Galaxy Wave (push+pop) // 

// Create the global variables.

let angle = 0; // Create the variable for the box's angles. 
let w = 20; // Create the variable for the width of the of boxse. 
let maxD; // Create variable for max distance of boxes. 

function setup() { // Setup the canvas.
  createCanvas(700, 700, WEBGL); // Create the canvas and add WEBGL (this allows it to be 3D).

  maxD = dist(0, 0, 250, 210);  // Sets the max distance boxes will travel on each axis. 
}

function draw() { // Create the draw function. 
  background(10, 3, 20); // Create the background.
  let dx = mouseX - width / 2; // Create the variable for dx with mouseX coordinates minus width divided by 2. 
  let dy = mouseY - height / 2; // Create the variable for dy with mouseY coordinates minus height divided by 2. 
  let v = createVector(dx, dy, 0); // Create variable to create new vectors. 

  pointLight(189, 102, 255, dx, dy, 0); // Adding a light to effect both x and y axis when mouse is moved. 
  pointLight(255, 3, 150, 0, dy, 0); // Adding a light to effect only the y axis when mouse is moved. 
  pointLight(189, 89, 2, 0, dy, 0); // Add another light to effect only the y axis when mouse is moved. 
  pointLight(166, 102, 0, dx, 0, 0); // Add an orange light that is effected by x mouse movements. 

  ortho(-600, 600, 600, -600, 0, 1000); // The dimensions for the sketch to achieve orthographic perspective. 
  directionalLight(97, 0, 237, v); // Adding a purple directional light controlled with mouse movements. 
  rotateY(-QUARTER_PI); // Rotates the boxes along the Y-axis.
  rotateX(angle * 0.1); // Rotates the boxes along the X-axis and slowes down the speed. 

  for (let z = 0; z < height; z += w) { // Create for loop to z values. 

    for (let x = 0; x < width; x += w) { // Create for loop to x values.

      push(); // Add push function. 
      let d = dist(x, z, width  / 2, height / 2); /* This is is the equation for distance values. The animation can be altered by changing these values through width and height. */
      let offset = map(d, 200, maxD, -PI, PI); // Creates an offset so that each row moves differently. 
      let a = angle + offset; // Let the angle equal the angle plus the offset value. 
      let h = floor(map(sin(a), -1, 1, 150, 350)); // This changes the overal size of the boxes. By changing these values, it can be stretched, shortened, etc. 
      translate(x - width / 2, 0, z - height / 2); // The equation of for the box translations. 


      

      box(w, h, w); // Add 3D boxes. These are different than rectangles, as rectangles are 2D. This is done through width,
      				// height, and depth (w)

      pop(); // Add pop function, this closes the push/pop function. 
    }
  }

  angle -= 0.08; // Changes the speed of the animation. 
}