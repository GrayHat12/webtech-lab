let body = document.getElementsByTagName("body")[0];
let val1 = document.getElementById("val1");
let val2 = document.getElementById("val2");
let x = document.getElementById("x");
let mul = document.getElementById("mul");
let div = document.getElementById("div");
let clear = document.getElementById("clear");

function removeClasses() {
    let currentClasses = Array.from(body.classList.values());
    if (!currentClasses || currentClasses.length === 0) return;
    body.classList.remove(currentClasses);
}

window.onhashchange = (ev => {
    let hash = window.location.hash;
    removeClasses();
    if (hash.endsWith("white")) {
        body.classList.add("white");
    }
    else if (hash.endsWith("red")) {
        body.classList.add("red");
    }
    else if (hash.endsWith("blue")) {
        body.classList.add("blue");
    }
    else if (hash.endsWith("pink")) {
        body.classList.add("pink");
    }
});

function getValues() {
    let v1 = parseFloat(val1.value);
    let v2 = parseFloat(val2.value);
    return [v1, v2];
}

mul.onclick = (ev) => {
    ev.preventDefault();
    try {
        let [v1, v2] = getValues();
        console.log(v1, v2);
        let ans = v1 * v2;
        if (isNaN(ans)) {
            x.value = "Not a number supplied";
        } else {
            x.value = ans;
        }
    }
    catch (err) {
        alert("Invalid values");
    }
}
div.onclick = (ev) => {
    ev.preventDefault();
    try {
        let [v1, v2] = getValues();
        console.log(v1, v2);
        let ans = v1 / v2;
        if (isNaN(ans)) {
            x.value = "Not a number supplied";
        } else {
            x.value = ans;
        }
    }
    catch (err) {
        alert("Invalid values");
    }
}
clear.onclick = (ev) => {
    ev.preventDefault();
    val1.value = 0;
    val2.value = 0;
}