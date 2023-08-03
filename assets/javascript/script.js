// Variables

let levelOne = 1;
let timeLimit = 30;
let intervalId;
let changedBox;

// Colour to use in grid

let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd1", "#bffcc6",
    "#ffabab", "#ff9cee", "#ffcf9", "#b28dff", "#c4faf8", "#fff5ba", "#ffbebc"];

// Change one div to random color

function changeBackground(boxId) {
    if (boxId === changedBox) {
        clearInterval(intervalId);
        levelOne++;
        timeLimit = 30 - (levelOne - 1) * 2;
        startGame();
    } else {
        clearInterval(intervalId);
        alert('Sorry Wrong Box, Try again!');
        levelOne = 1;
        timeLimit = 30;
        startGame();
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
    intervalId = setInterval(() => {
        clearInterval(intervalId);
        alert('Times Up! Reset to begin the game again');
        levelOne = 1;
        timeLimit = 30;
        startGame();
    }, timeLimit * 3000);
}

// Start Game Click

document.getElementById("start-game").addEventListener("click", () => {
    startGame();
});

// Make user click on correct div, and win


// Reset Game





