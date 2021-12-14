

// Create the array of cat images. 
var comicImages = ["Screen1.png", "Screen2.png", "Screen3.png", "Screen4.png", "Screen5.png"];

var counter = 0; // Set the counter to 0. 

var audio = new Audio('audio/catpurr.mp3') // Add the variable for the cat purr sound. 

var audio1 = new Audio('audio/knock.mp3') // Add the variable for the knock knock sound. 

function changeImage () { // Create the function to change images. 

	document.getElementById("comic").src = "Images/" + comicImages[counter]; // Grabs the comic ID and changes it so it sorts through the comicImages array.

} 


var mouseX; // Create variable.

var mouseY; // Create variable.

function checkXY() { // Create the function that will check for X and Y coordinates. 

	mouseX = event.clientX; // Checking the X coordinates of the mouse cursor and storing them in this variable. 

	mouseY = event.clientY; // Checking the Y coordinates of the mouse cursor and storing them in this variable.

	if (counter >=3) {  // If the image number in the array is greater than or equal to 3, the next image
						// is three or four in the array. 
		threeOrFour(); // Calling the threeOrFour function. 
	}

	
}
function mouseDown () { // Create the mouseDown function. 

	if(counter == 1) {  // If the counter = 1, then image will change to 2 if the left mouse button is pressed.
		counter = 2;
		changeImage(); // This will change to the next image in the array. 
		document.getElementById("h1").innerHTML = "Your cat rushes to the door in excitement! Hit your up arrow key to walk inside."; // Changes the header text when the counter changes.

	}
}

function reset() { // Adding a reset button to start over. 
	counter = 0; // This sets the counter back to 0. 
	changeImage(); // This will change the image to the first image in the array. 
	document.getElementById("h1").innerHTML = "Your cat waits patiently for you at home. Knock on the door by hitting space bar!" // First header text. 
}

function threeOrFour() { // Create the threeOrFour function. 
	if (counter == 3||4) { // If the counter is equal to 3 or four, the following code is executed. 
		if ( counter = 3 && mouseX >853 && mouseX < 1038 && mouseY < 426  && mouseY > 371  ) { // If the counter equals 3, and the X and Y coordinates are between these variables, the following
																							   // code is executed. 
	
			counter = 4; // When the mouse is hovered over these coordinates, the image will change to the next in the array. 
			changeImage(); // Calling the function to change the image over. 
			audio.play(); // Plays audio when hovering over the cat's head. 
			document.getElementById("h1").innerHTML = "Your cat is happy and purring!"; // Changes header text when hovered. 
	
		} else { // When mouse is not hovered over the specified coorindates, the following code is executed. 
	
			counter = 3; // This allows the previous image to return when the mouse is not being hovered over the cat's forehead. 
			changeImage(); // Calling the function to change to the next image. 
			audio.pause(); // Stopping the audio from playing when you are not hovering on the cat.  
			document.getElementById("h1").innerHTML = "Your cat demands pets! Hover your mouse over your cat's head."; // Changes header text. 
		}
	} 
}


function myFunction(event) { // Create the function that looks for keypresses. 

	var x = event.key; // Listen for keypress. 

	var y = event.keyCode; // Listen for keypress. 


if (counter == 0) { // Spacebar image change.

	if (x == " ") { // If spacebar is pressed, the following occurs. 

		counter = 1; // Counter changes to the second image in the array. 

		changeImage(); // Change image. 
		audio1.play(); // Play knock knock sound. 
		document.getElementById("h1").innerHTML = "Your cat hears the door and looks over. Click the image with your mouse to open the door."; // Change header text. 
		
	}

} else if (counter == 2) { // If counter is equal to 2, the following occurs. 

	if (y == 38) { // If up arrow key is pressed, the following occurs. 

		counter = 3; // When the up arrow is pressed, counter changes to 3. 

		changeImage(); // Calling the function to change the image. 

	}

} else if (counter == 3) { // If the counter is equal to 3, it calls the checkXY function, and if the specified coordinates are hovered, the image changes to the cat purring. 
							
			checkXY();

}

if (counter == 3) { // If the counter is equal to three, the following text appears. 

	document.getElementById("h1").innerHTML = "Your cat demands pets! Hover your mouse over your cat's head."; // Changes the header text. 

	}

}