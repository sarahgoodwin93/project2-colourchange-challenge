// Variables

let colorChangeInterval;
let changedBox = null;
let clicks = 0;
let missed = 0;
let seconds = 10;
let countDown;
let totalClicks = 0;
let timer = 10;
let gameActive = false;
let levelOneSpeed = 2000;
let gameSpeed = levelOneSpeed;
let correctClick = false;
let intervalPaused = false;

/** COLOUR ARRAY
 * List of colours that the game can choose from to keep the site design with pastel colours
 */
let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#faf99d", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9e", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc", "#c4faf8"];

/** BOX HAS BEEN CLICKED
 * This if statement checks if the box that has been clicked matches the box that has changed colour.
 * The first if statement is checking if the game is not active and the return stops any further actions.
 * The next if statement checks if the timer has reached 0 and exists the function with the reutrn if it has.
 * The next if statement checks if the colourChangeInterval is active.
 * If the game is active and the timer is not at 0, the boxes will begin to change colour.
 * If the correct box is clicked, the increaseClicks function is called.
 * If user clicks on the wrong box the below message will appear and the missingBoxes function is called.
 * A message will display to the user to let them know they missed the box.
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
            correctClick = true;
            if (seconds > 0) {
                startGame();
            } else {
                stopBoxes();
            }
        } else {
            clearInterval(colorChangeInterval);
            displayMessage();
            missingBoxes();
        }
    }
}


/** Display Message
 * Pauses the interval responsible for changing the colors of the boxes.
 * This sets the `intervalPaused` to true, indicating that the interval should be paused.
 */
function displayMessage(message) {
    let messageAlert = document.getElementById('message');
    messageAlert.textContent = "Opps wrong box! Try again to keep playing";
    messageAlert.style.display = "block";

    setTimeout(function() {
        messageAlert.style.display = 'none';
    }, 1000);

}


/** Pause Interval
 * Pauses the interval responsible for changing the colors of the boxes.
 * This sets the `intervalPaused` to true, indicating that the interval should be paused.
 */
function pauseInterval() {
    intervalPaused = true;
}


/** STOP BOXES
 * This function clears the colourChangeInterval so that the boxes stop changing colour.
 */

function stopBoxes() {
    clearInterval(colorChangeInterval);
}

/** RANDOM COLOURS
 * This function runs through the array of colours outlined in the variable 'colors'
 * It then choosen a random colour through the Math.floor(Math.random() method so that they are randomly selected
 */
function randomColor() {
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}

/** START GAME FUNCTION
 * This function begins by making sure the changedBox is reset to null at the beginning of each round.
 * The for loop goes through each box and makes sure its background is set to the original pink colour.
 * The randomBox will change colour, and calls the randomColor function written above.
 * The clearInterval clears the previouis colourChangeinternal to make sure it is stoped before starting a new one.
 * This was impliments so that the colours did not all change together.
 * A new interval is set to change the boxes every 2 seconds, as defined by gameSpeed.
 * The final if statement checks if the timer is less than or = to 0 and calles the resetGame function to resets the game.
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
        if (!correctClick && !intervalPaused) {
            let randomBox = Math.floor(Math.random() * allBoxes.length);
            changedBox = allBoxes[randomBox].id;
            document.getElementById(changedBox).style.backgroundColor = randomColor();
        }
    }, gameSpeed);
}


/** START GAME WITH CLICK
 * This function begins the game once the user clicks on the start game button.
 * It then also begins the timer once the button has been clicked, through the event listener
 * The number of clicks are set to 0, ready for the new game to begin with the startGame function.
 * If the game is active, the interval will begin the timer to countdown every 1 second
 * If the timer = 0 then the timers up words will appear, and the resetGame function will be called to stop the game.
 * Once resetGame is called the timer will go back to its original state of 00:00
 */

let startButton = document.getElementById("start-game");
startButton.addEventListener("click", function () {
    clicks = 0;
    document.getElementById("clicks").innerText = 0;
    pauseInterval();
    startGame();
    gameActive = true;
    countDown = setInterval(function () {
        document.getElementById("timer").innerHTML = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(countDown);
            document.getElementById("timer").innerHTML = "Times up!";
        }
    }, 1000);
});


/** RESET GAME
 * The function resets the game once the timer runs out.
 * It first clears the colourChangeInterval and coundDown timer.
 * Then it resets seconds to 10, timer to 00:00, clicks to 0, missed boxes to 0 and keeps total clicks so the user can still view them.
 * It then runs through all the boxes and makes sure they are all changed back to pink (#e7014c)
 */

function resetGame() {
    clearInterval(colorChangeInterval);
    clearInterval(countDown);
    seconds = 10;
    timer = 10;
    clicks = 0;
    missed = 0;
    totalClicks = 0;
    gameActive = false;
    correctClick = false;
    changeBackground();
    document.getElementById("clicks").innerText = 0;
    document.getElementById("missed").innerText = 0;
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("total-clicks").innerText = totalClicks;
    let allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.backgroundColor = "#e7014c";
    }
}

/** RESET BUTTON
 * Once the reset button is clicked, the resetGame function will be called.
 */
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);


/** INCREASE CLICKS
 * This function changed the number of clicks by 1 each time the correct box is clicked.
 * Once the game timer is done, the number of clicks for that round will be added to the total clicks.
 * The total clicks are a sum of the number of correct clicks minus the number of missed boxes.
 */

function increaseClicks() {
    let currentClicks = parseInt(document.getElementById("clicks").innerText);
    let newClicks = currentClicks + 1;
    document.getElementById("clicks").innerText = newClicks;
    totalClicks = newClicks - parseInt(document.getElementById("missed").innerText);
    document.getElementById("total-clicks").innerText = totalClicks;
}

/** INCREASE MISSING BOXES
 * This function changes the number of missed boxes when a user clicks on the wrong box
 * The number of missed boxes will go up by 1 for every missed box.
 */

function missingBoxes() {
    let missedBox = parseInt(document.getElementById("missed").innerText);
    let newMissedBox = missedBox + 1;
    document.getElementById("missed").innerText = newMissedBox;
}