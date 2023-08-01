// Change colour of button fuction
let one = document.getElementById("one");

function changeBackground() {
    one.style.backgroundColor = "#ff9e1d";
}
one.addEventListener("click, changeBackground");

// Change colour back button fuction
function revertToPink() {
    one.style.backgroundColor = '#e7014c';
    one.removeEventListener("click, revertToPink");
}

one.addEventListener("click, revertToPink");

