let button = document.getElementById("hide");
let div = document.getElementById("block");

button.onclick = () => {
    if (div.classList.contains("hide")) {
        div.classList.remove("hide");
    } else {
        div.classList.add("hide");
    }
}