// Change colour of button fuction - button one
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");

function changeBackground() {
    one.style.backgroundColor = "#ff9e1d";
    two.style.backgroundColor = "#ff9e1d";
    three.style.backgroundColor = "#ff9e1d";
}
one.addEventListener("click", changeBackground);
two.addEventListener("click", changeBackground);
three.addEventListener("click", changeBackground);



