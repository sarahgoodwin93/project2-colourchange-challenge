// Variables

let levelOne = 1;
let timeLimit = 10;
let intervalId;
let changedBox = null;
let level = 1;
let clicks = 0;


// Colour to use in grid
/**
 * List of colours that the game can choose from to keep the site design with pastel colours
 */
let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd1", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc"];

// Change one div to random color

/**
 * This if statement checks if the box that has been clicked matches the box that has changed colour
 * If the correct box is clicked, the increaseClicks function is called 
 */
function changeBackground(boxId) {
    if (boxId === changedBox) {
        clearInterval(intervalId);
        increaseClicks();
        startGame();
        console.log('box clicked');
        /**
         * If user clicks on the wrong box the below message will appear
         */
    } else {
        clearInterval(intervalId);
        alert('Sorry Wrong Box, Try again!');
        console.log('wrong box');
    }
}

// Get random color from array
/**
 * 
 * This function runs through the array of colours outlined in the variable 'colors'
 * So that they are randomly selected
 */
function randomColor() {
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}

// Start Game button

/**
 * This function begins by making sure the changedBox is resert to null at the beginning of each round
 */
function startGame() {
    changedBox = null;
    let allBoxes = document.getElementsByClassName("box");
    /**
     * The for loop goes through each box and makes sure its background is set to the original pink colour
     */
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
    /**
     * This generates which random box will change colour, and calls the randomColor function written above
     */
    let randomBox = Math.floor(Math.random() * allBoxes.length);
    changedBox = allBoxes[randomBox].id;
    document.getElementById(changedBox).style.backgroundColor = randomColor();

    /**
     * The clear interval clears any exisiting timer and ensures 
     * that the previouis internal is stoped before starting a new one.
     * This was impliments so that the colours did not all change together 
     */
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        let randomBox = Math.floor(Math.random() * allBoxes.length);
        changedBox = allBoxes[randomBox].id;
        document.getElementById(changedBox).style.backgroundColor = randomColor();
        /**
         * This time means that the boxes change colour every 2 seconds.
         */
    }, 2000);
}

// Start Game Click

/**
 * This function begins the game once the user clicks on the start game button
 */

let startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);
console.log('start game');

// Score section

function increaseClicks() {
    let currentClicks = parseInt(document.getElementById("clicks").innerText);
    let newClicks = currentClicks + 1;
    document.getElementById("clicks").innerText = newClicks;
}
console.log('Add click');

// Level section

function addLevel() {
    let currentLevel = parseInt(document.getElementById("level").innerText);
    let newLevel = currentLevel + 1;
    document.getElementById("level").innerText = newLevel;
}
console.log('add new level');

// Reset Game

function resetGame() {
    clearInterval(intervalId);
    clicks = 0;
    level = 1;
    document.getElementById("clicks").innerText = 0;
    document.getElementById("level").innerText = level;

    let allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
}

// Click Reset Button

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
console.log('reset game');





