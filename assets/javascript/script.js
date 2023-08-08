// Variables

let intervalId;
let changedBox = null;
let level = 1;
let clicks = 0;
let seconds = 20;
let countDown;
let totalClicks = 0;


/** COLOUR ARRAY
 * List of colours that the game can choose from to keep the site design with pastel colours
 */
let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd01", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc"];


/** WHICH BOX HAS CHANGED
 * This if statement checks if the box that has been clicked matches the box that has changed colour
 * If the correct box is clicked, the increaseClicks function is called.
 * If user clicks on the wrong box the below message will appear
 */
function changeBackground(boxId) {
    if (intervalId) {
        if (boxId === changedBox) {
            clearInterval(intervalId);
            increaseClicks();
            startGame();
            console.log('box clicked');
        } else {
            clearInterval(intervalId);
            alert('Sorry Wrong Box, Try again!');
            console.log('wrong box');
        }
    }
}

/** RANDOM COLOURS
 * This function runs through the array of colours outlined in the variable 'colors'
 * So that they are randomly selected
 */
function randomColor() {
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}


/** START GAME FUNCTION
 * This function begins by making sure the changedBox is resert to null at the beginning of each round.
 * The for loop goes through each box and makes sure its background is set to the original pink colour.
 * The randomBox will change colour, and calls the randomColor function written above.
 * The clear interval clears the previouis internal is stoped before starting a new one.
 * This was impliments so that the colours did not all change together.
 * An internvial is set to change the boxes every 2 seconds
 */
function startGame() {
    changedBox = null;
    let allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
    let randomBox = Math.floor(Math.random() * allBoxes.length);
    changedBox = allBoxes[randomBox].id;
    document.getElementById(changedBox).style.backgroundColor = randomColor();
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        let randomBox = Math.floor(Math.random() * allBoxes.length);
        changedBox = allBoxes[randomBox].id;
        document.getElementById(changedBox).style.backgroundColor = randomColor();
    }, 2000);
}

/** SCORE SECTION
 * This function changed the number of clicks by 1 each time the correct box is clicked.
 * Once the game timer is done, the number of clicks for that round will be added to the total clicks.
 */

function increaseClicks() {
    let currentClicks = parseInt(document.getElementById("clicks").innerText);
    let newClicks = currentClicks + 1;
    document.getElementById("clicks").innerText = newClicks;
    totalClicks++;
    document.getElementById("total-clicks").innerText = totalClicks;
}
console.log('Add click');

/** START GAME WITH CLICK
 * This function begins the game once the user clicks on the start game button.
 * It then also begins the timer once the button has been clicked.
 * Countdown timer to start once the start game button has been clicked
 */

let startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
    startGame();
    countDown = setInterval(function () {
        document.getElementById("timer").innerHTML = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(countDown);
            document.getElementById("timer").innerHTML = "Times up!";
            resetGame();
        }
    }, 1000);
});
console.log('start game');

/** RESET GAME
 * Clears the interval timer and resets clicks to 0 and the level to 1.
 * Returns clicks to 0 and level to 1.
 * Add previous clicks to total clicks
 * Changes all the boxes back to pink (#e7014c)
 */

function resetGame() {
    clearInterval(intervalId);
    clearInterval(countDown);
    clicks = 0;
    level = 1;
    seconds = 20;
    document.getElementById("clicks").innerText = 0;
    document.getElementById("level").innerText = level;
    let allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
}

/** LEVEL
 * Increase the level by 1
 */

function addLevel() {
    let currentLevel = parseInt(document.getElementById("level").innerText);
    let newLevel = currentLevel + 1;
    document.getElementById("level").innerText = newLevel;
}
console.log('add new level');

/** RESET BUTTON
 * Once the reset button is clicked, the resetGame function will be called.
 */
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
console.log('reset game');



