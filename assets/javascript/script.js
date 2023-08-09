// Variables

let colorChangeInterval;
let changedBox = null;
let level = 1;
let clicks = 0;
let missed = 0;
let seconds = 10;
let countDown;
let totalClicks = 0;
let timer = 10;
let gameActive = false;


/** COLOUR ARRAY
 * List of colours that the game can choose from to keep the site design with pastel colours
 */
let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#faf99d", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9e", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc", "#c4faf8"];

/** WHICH BOX HAS CHANGED
 * This if statement checks if the box that has been clicked matches the box that has changed colour.
 * The first if statement is checking if the game is not active using a Logical Operator and the return stops any further actions.
 * The next if statement checks if the timer has reached 0 and exists the function with the reutrn if it has.
 * If the game is active and the timer is not at 0, the boxes will begin to change.
 * If the correct box is clicked, the increaseClicks function is called.
 * If user clicks on the wrong box the below message will appear.
 */
function changeBackground(boxId) {
    if (!gameActive) {
        return;
    }
    if (seconds <= 0) {
        stopBoxes();
        return;
    }
    if (colorChangeInterval) {
        if (boxId === changedBox) {
            clearInterval(colorChangeInterval);
            increaseClicks();
            if (seconds > 0) {
                startGame();
            } else {
                stopBoxes();
            }
        } else {
            clearInterval(colorChangeInterval);
            alert('Sorry Wrong Box, Try again!');
            missingBoxes();
        }
    }
}

/** STOP BOXES
 * This function clears the colourChangeInterval so that the boxes stop changing colour.
 */

function stopBoxes() {
    clearInterval(colorChangeInterval);
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
 * An internvial is set to change the boxes every 2 seconds.
 * The final if statement checks if the timer is less than or = to 0 and resets the game.
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

    clearInterval(colorChangeInterval);
    colorChangeInterval = setInterval(function () {
        let randomBox = Math.floor(Math.random() * allBoxes.length);
        changedBox = allBoxes[randomBox].id;
        document.getElementById(changedBox).style.backgroundColor = randomColor();
    }, 2000);
    if (seconds <= 0) {
        resetGame();
        return;
    }
}

/** START GAME WITH CLICK
 * This function begins the game once the user clicks on the start game button.
 * It then also begins the timer once the button has been clicked.
 * Countdown timer to start once the start game button has been clicked.
 * If the timer = 0 then the timers up words will appear.
 */

let startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
    clicks = 0;
    document.getElementById("clicks").innerText = 0;
    startGame();
    gameActive = true;
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


/** RESET GAME
 * Clears the colour change interval and coundDown timer.
 * Resets clicks to 0 and the level to 1.
 * Add previous clicks to total clicks.
 * Changes all the boxes back to pink (#e7014c)
 */

function resetGame() {
    clearInterval(colorChangeInterval);
    clearInterval(countDown);
    level = 1;
    missed = 0;
    seconds = 10;
    timer = 10;
    gameActive = false;
    document.getElementById("level").innerText = level;
    document.getElementById("missed").innerText = 0;
    document.getElementById("timer").innerText = seconds;
    let allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
}


/** INCREASE CLICKS
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

/** INCREASE MISSING BOXES
 * This function changed the number of clicks by 1 each time the correct box is clicked.
 * Once the game timer is done, the number of clicks for that round will be added to the total clicks.
 */

function missingBoxes() {
    let missedBox = parseInt(document.getElementById("missed").innerText);
    let newMissedBox = missedBox + 1;
    document.getElementById("missed").innerText = newMissedBox;
}

/** RESET BUTTON
 * Once the reset button is clicked, the resetGame function will be called.
 */
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);

/** LEVEL TWO
 * 
 */

function levelTwo() {
    clearInterval(colorChangeInterval);
    addLevel();
    startGame(1000);
}

/** NEXT LEVEL BUTTON
 * 
 */

let nextLevelButton = document.getElementById("next-level");
nextLevelButton.addEventListener("click", levelTwo);

/** LEVEL
 * Increase the level by 1
 */

function addLevel() {
    let currentLevel = parseInt(document.getElementById("level").innerText);
    let newLevel = currentLevel + 1;
    document.getElementById("level").innerText = newLevel;
}