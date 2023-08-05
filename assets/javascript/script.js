// Variables

let levelOne = 1;
let timeLimit = 10;
let intervalId;
let changedBox = null;
let lives = 5;
let level = 0;


// Colour to use in grid

let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd1", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc"];

// Change one div to random color

function changeBackground(boxId) {
    if (boxId === changedBox) {
        clearInterval(intervalId);
        startGame();
    } else {
        clearInterval(intervalId);
        alert('Sorry Wrong Box, Try again!');
    }
}

// Get random color from array

function randomColor() {
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}

// Start Game button

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

// Start Game Click

let startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

// Score section

function loseLives() {
    let oldLives = parseInt(document.getElementById("lives").innerText);
    let newLives = oldLives - 1;
    document.getElementById("lives").innerText = newLives;
}

// Level section

function addLevel() {
    let currentLevel = parseInt(document.getElementById("level").innerText);
    let newLevel = currentLevel + 1;
    document.getElementById("level").innerText = newLevel;
}







