// Colour to use in grid

let colors = ["#ffb5e8", "#d5aaff", "#6eb5ff", "#fffd1", "#bffcc6", "#ffabab"];

// Change colour of buttons on game
let clickedBox = {};

function changeBackground(divId) {
    let div = document.getElementById(divId);

    if (clickedBox[divId]) {
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    } else {
        div.style.backgroundColor = "#ff9e1d";
        clickedBox[divId] = true;
    }
}

// Generate random colour of grid to change

function generateRandomColor() {
    let;
}
