let before = document.getElementById("bef");
let after = document.getElementById("aft");
let area = document.getElementById("area");

before.onclick = () => {
    area.innerText = "BEFORE CLICK";
}
after.onclick = () => {
    area.innerText = "AFTER CLICK";
}