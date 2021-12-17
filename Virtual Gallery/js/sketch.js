
// Home page background. //


let stars = [] // Create an array to store the values of the stars. 

function setup() {
  createCanvas(windowWidth, windowHeight); // Makes the canvas size fit the full screen size of the browser. 
	
	 
	for (i = 0; i < 500; i++){ // For loop for the stars.
			
		let star = { // This will store the x and y values. 
			x:random(0,width), // This allows the stars to take random location within the sketch. 
			y:random(0,height)
		};
		

		stars.push(star); // This adds the star's values to the stars array. 	
	}
}

function draw() {
	

	for (i = 0; i < 500; i++){ // Create a for loop for the stars that loop through the array. 
		
		let x = stars[i].x; // Define local variable based on the X values of the star. 
		let y = stars[i].y; // Define local variable based on the Y values of the star. 
		

		fill(255); // Color of the star. 
		
		
		ellipse(x,y,random(1,3),random(1,3)); // Draw the ellipse used for the stars that uses the X and Y values,
											  // and a random number for the frame that makes the glitter effect. 

	}
	
	
}