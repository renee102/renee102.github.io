

/* This DOM event listener makes it so that all of the html is read before the js file, 
this will make sure that all the events happen in order. */
document.addEventListener('DOMContentLoaded', () => {

/* Creating the constants for the  game board. */

	const grid = document.querySelector('.grid') /* This tells the the js file to look at the html file, and find the element with the class name for .grid */
	const scoreDisplay = document.getElementById('score') /* Allow the score board to be constantly displayed for the player */
	const width = 8 /* There a re 8 squares across the board, horizontally and vertically. */
	const squares = []   /* Each time a div is created, it will be stored in this array. */
	let score = 0 /* Setting the base score for the game. */

	const cuteAnimals = [ /* Add the different animals that will be used on the game board, this will be a constant as they will not change. */

	'url(images/turtle.jpg)',
	'url(images/butterflies.jpg',
	'url(images/fox.jpg',
	'url(images/rabbit.jpg',
	'url(images/raccoon.jpg',
	'url(images/frog.jpg)'

	]


/* Creating the board */

	function createBoard() { 

		for (let i = 0; i < width*width; i++) { /* Use a for loop to create the board, and since the board is 8 by 8 squares, 
			I will do width multiplied by width (8x8). There will be 64 squares, incremenenting by 1 each time from 0, and looping over. */

			const square = document.createElement('div') /* Creating the div element. Every time the for loop loops over, a new div element (square) will be created */

			square.setAttribute('draggable', true)	/* Makes it possible to drag the newly created colored animals across the game board. */

			square.setAttribute('id', i) /* Gives an ID to each square. When squares are moved, we will know exactly which square in the grid is being moved.
			There are ids from 0-63 on the board, totalling 64 squares. */

			let randomColor = Math.floor(Math.random() * cuteAnimals.length)	/* Squares will be given a random color after being created.
			This will be done using math.random and multiplying it by the arrays(*) 
			since math.random only gives a value of 0-1, I used math.floor to give full numbers rounded between 0-5, since there are 6 animal colors in the constant animal array. 
			The game starts from 0, as the index is set to 0 (let i = 0;) */

			square.style.backgroundImage = cuteAnimals[randomColor] /* This will filter the random number through the cuteAnimals array to assign a random color to a square. */

			grid.appendChild(square) /* Putting the square into the div with the class of .grid. The new square will go into the grid const. */

			squares.push(square) /* This will push the squares into the square array and store them. */

	}
  }



 createBoard()

/* Creating the drag features functions for the animals.
This will be done using event listeners, which listen to each stage of 'dragging'.
Each stage of dragging consists of five events. 
This will be done using in-built functions. 
For each square(animal) in the square array, the event listeners will listen for events which are in-built and in greentext.
When these events are triggered, a function will occur. */



let colorBeingDragged /* Define the color being picked up and dragged. This will be stored in this variable. */
let colorBeingReplaced /* Define the colored square being replaced by another colored square. */
let squareIdBeingDragged /* Store the id of the squares being selected and dragged. */
let squareIdBeingReplaced /* Store the id of the square we are dropping animals in. */

squares.forEach(square => square.addEventListener('dragstart', dragStart)) //dragStart is an in-built function
squares.forEach(square => square.addEventListener('dragend', dragEnd)) // Similar to dragStart
squares.forEach(square => square.addEventListener('dragover', dragOver))  //^^
squares.forEach(square => square.addEventListener('dragenter', dragEnter)) //^^
squares.forEach(square => square.addEventListener('dragleave', dragLeave)) //^^
squares.forEach(square => square.addEventListener('drop', dragDrop)) //^^




/* Write the functions for what happens when the events are triggered.
These functions will be written for each individual event. */

	function dragStart() {

		colorBeingDragged = this.style.backgroundImage /* Saving to a variable to be used again */
		squareIdBeingDragged = parseInt(this.id) /* To replace the colors in the correct squares, 
		I am using the in-built method of 'parseInt', this tells us the id of the squares being dragged, for example, square 47. */
		console.log(colorBeingDragged)	
		console.log(this.id, 'dragstart') /* Filter through the id of the squares being listened to, using (this.id)
		'this' will pick up on the element that is being listened to in its .id, which is set using the setAttribute in the createBoard function. */

	}

	function dragOver(event) {

		event.preventDefault()
		console.log(this.id, 'dragover')

	}

	function dragEnter(event) {

		event.preventDefault()
		console.log(this.id, 'dragenter')

	}

	function dragLeave() {


		console.log(this.id, 'dragleave')

	}


	function dragDrop() {

		console.log(this.id, 'dragdrop')
		colorBeingReplaced = this.style.backgroundImage /* When an element is dropped, the original color of the square will be stored */
		squareIdBeingReplaced = parseInt(this.id) /* Assign the ID using parseInt, which will assign a number and store it. */
		this.style.backgroundImage = colorBeingDragged /* Changes the color of the square to the color being dragged. */
		squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced /* This will give the original square the color of the square being dropped. */

	}


	function dragEnd() {

		console.log(this.id, 'dragend')

		/* In order to swap animals, these two animals need to be directly in a square above, below, to the left or to the right
		 of the current animal in order to be swapped. Javascript needs to know this, and therefore valid moves must be defined */

		let validMoves = [
		squareIdBeingDragged -1, /* Allows player to switch out squares with a square of less value (for example, switch square 32 with square 31). */
		squareIdBeingDragged -width, /* Allows player to switch out squares with a square visually above the one being dragged. */
		squareIdBeingDragged +1, /* Allows player to switch out squares with a square of higher value (switching square 12 with 13). */
		squareIdBeingDragged +width /* Allows player to switch out squares with a square that is visually below the one being dragged. */
		]


		let validMove = validMoves.includes(squareIdBeingReplaced) /* This is an in-built javascript method called 'includes' that filters through the value of square.
		This means that if the number filtered through is included in the valid moves array, the statement is true and the boolean of true is stored for the valid moves variable. */

		 if (squareIdBeingReplaced && validMove) { /* If the id of square being replaced exists, and if the move is valid, then the code is executed. */
			squareIdBeingReplaced = null
		}  else if (squareIdBeingReplaced && !validMove) { /* If there is a square that the dragged square can be dropped into, but there is no valid move, then the square does not move
			and returns to its original spot. */
			squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced // ^^
			squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged /* Similar method for the original square, to assign it to the color being dragged. */
		} else squares[squareIdBeingDragged].style.backgroundImage =  colorBeingDragged /* If none of these statements are true, then the square is returned to its original spot. */


	}

/* Drop animals when some have cleared from valid matches */

	function moveDown() { /* The function to move down animals when matches are made */
		for (i = 0;  i < 55; i ++ ) { /* Using a for loop to check all squares up to square 55, this is up to the first 7 rows. */

			if (squares[i + width].style.backgroundImage === '') { /* This will check the squares below each index for an empty square.
				This if statement takes the index number + the width and filters it through the squares array.  */

				squares[i + width].style.backgroundImage = squares[i].style.backgroundImage /* Once in the square, we want to check the square's
				background color. If the square has no background color, we want this statement to be true. Therefore, if the square directly
				below the square it is looping has no background color, then this code will execute. */
				squares[i].style.backgroundImage = '' /* This will remove any color from the square to make it look empty. */


				/* Create the function for more animals to drop down when matches are found until the first row is full again. */
				const firstRow = [0, 1, 2, 3, 4, 5, 6, 7] /* Create an array putting an index of 0-7, as there are 8 squares in a row. */
				const isFirstRow = firstRow.includes(i) /* To check if something is in the first row, we attach 'includes' that filters through i. If i is in
				the first array, the statement will come back as true. */
				if (isFirstRow && squares[i].style.backgroundImage === '') { /* If isFirstRow comes back as true, and the square has no background color, 
					this will fill the square with a background color. */

					let randomColor = Math.floor(Math.random() * cuteAnimals.length) /* This will give the square a random color for its background, from the 
					cuteAnimals array of 0-5. */
					squares[i].style.backgroundImage = cuteAnimals[randomColor] /* This color must be filtered through the array to get a string for a color name
					that will be assigned to a square in the first row. */
				}
			}
		}
	}





/* Check for matches (left, right, above, below) */

/* Check for row of three */
	function checkRowThree() {

		for (i = 0; i < 61; i++) { /* Square Id 61 is the last square that a row of 3 can be created without being cutoff, as there is exactly 3 square ids available
			from this point, (61, 62, and 63). After this, the row would be cut off. That's why javascript must be informed that square id 61 is the last index
			a row of three can be formed. */
			let rowOfThree = [i, i + 1, i + 2]
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55] /* This tells javascript that these are invalid indexes for valid moves.
			All of these numbers are the square ids for the far right side. If javascript is not informed that rows of three cannot be formed at these indexes
			the rows will be cut off, resulting in one or two squares being cleared, and not a complete row of three. */
			if (notValid.includes(i)) continue

			if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 3 /* Add a score of 3 every time a row of three is found */
				scoreDisplay.innerHTML = score
				rowOfThree.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkRowThree()

/* Check for column of three */
	function checkColumnThree() {

		for (i = 0; i < 47; i++) { /* The loop will end at 47 for a column of 3. If javascript is not informed about this, then columns will be cut off, 
			similar to the invalid indexes for the rows of three. 47 is the last square id in which a complete column of 3 can be shown on the board. */
			let columnOfThree = [i, i + width, i + width * 2] /* Change the array to be a column using width, and width multiplied by 2 */
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 3 /* Add a score of 3 every time a column of three is found */
				scoreDisplay.innerHTML = score
				columnOfThree.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkColumnThree()

/* Check for row of four */
	function checkRowFour() {

		for (i = 0; i < 60; i++) { /* Square Id 60 is the last square that a row of 4 can be created without being cutoff, as there is exactly 4 square ids available
			from this point, (60, 61, 62, and 63). After this, the row would be cut off. */
			let rowOfFour = [i, i + 1, i + 2, i + 3] /* Adding another item (i + 3) to make it a row of four. */
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55] /* This tells javascript that these are invalid indexes for valid moves.
			All of these numbers are the square ids for the far right side. If javascript is not informed that rows of four cannot be formed at these indexes
			the rows will be cut off, resulting in squares being cleared, and not a complete row of four. */
			if (notValid.includes(i)) continue

			if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 4 /* Add a score of 4 every time a row of four is found */
				scoreDisplay.innerHTML = score
				rowOfFour.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkRowFour()

/* Check for column of four */
	function checkColumnFour() {

		for (i = 0; i < 39; i++) { /* The loop will end at 39 for a column of 4. If javascript is not informed about this, then columns will be cut off, 
			similar to the invalid indexes for the rows of four. 39 is the last square id in which a complete column of 4 can be shown on the board. */
			let columnOfFour = [i, i + width, i + width * 2, i + width * 3] /* Making the array a column of four by adding (i + width * 3). */
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 4 /* Add a score of 4 every time a column of four is found */
				scoreDisplay.innerHTML = score
				columnOfFour.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkColumnFour()


/* Check for row of five */
	function checkRowFive() {

		for (i = 0; i < 59; i++) { /* Square Id 59 is the last square that a row of 5 can be created without being cutoff */
			let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4] /* Adding another item (i + 4) to make it a row of five. */
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55] /* This tells javascript that these are invalid indexes for valid moves.
			All of these numbers are the square ids for the far right side. If javascript is not informed that rows of five cannot be formed at these indexes
			the rows will be cut off, resulting in squares being cleared, and not a complete row of five. */
			if (notValid.includes(i)) continue

			if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 5 /* Add a score of 5 every time a row of five is found */
				scoreDisplay.innerHTML = score
				rowOfFive.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkRowFive()

/* Check for column of five */
	function checkColumnFive() {

		for (i = 0; i < 31; i++) { /* The loop will end at 31 for a column of 5. 31 is the last square id in which a complete column of 5 can be shown on the board. */
			let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4] /* Making the array a column of five by adding (i + width * 4). */
			let decidedColor = squares[i].style.backgroundImage
			const isBlank = squares[i].style.backgroundImage === ''

			if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
				score += 5 /* Add a score of 5 every time a column of five is found */
				scoreDisplay.innerHTML = score
				columnOfFive.forEach(index => {
					squares[index].style.backgroundImage = ''
				})
			}
		}
	}

checkColumnFive()



/* Add the valid moves functions into a set interval. This repeatedly calls the functions within the window with a time delay.  */
window.setInterval(function(){

	moveDown()
	checkRowFive()
	checkColumnFive()
	checkRowFour()
	checkColumnFour()
	checkRowThree()
	checkColumnThree()

}, 100)



})