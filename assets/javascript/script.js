// Colour to use in grid

let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd1", "#bffcc6", "#ffabab"];

// Change one div to random color

function changeBackground(boxId) {
    if (boxId === changedBox) {
        clearInterval(intervalId);
        alert('!');
    } else {
        clearInterval(intervalId);
        alert('!');
    }
}

// Get random color from array

function randomColor() {
    let randomColors = Math.floor(Math.random() * colors.length);
    return colors[randomColors];
}

// Make user click on correct div, and win


// Reset Game


// Start Game


