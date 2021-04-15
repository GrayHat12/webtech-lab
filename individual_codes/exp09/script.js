let body = document.getElementsByTagName("body")[0];

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