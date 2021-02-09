const teachers = {
    "AB": "Amrita Bagchi",
    "ANM": "Ms. Anamika Mitra",
    "DAA": "Prof. Dr. Arun Prakash Agarwal",
    "DGR": "Dr. Gaurav Raj",
    "DHR": "Mr. Dharm Raj",
    "DIV": "Ms. Divya Rathi",
    "DNR": "Prof. (Dr.) Nitin Rakesh",
    "DSI": "Mr. Divyanshu Sinha",
    "GSM": "Dr. Gouri Shankar Mishra",
    "JAY": "Mr. Jayraj Singh",
    "MEC": "Ms. Megha Chhabra",
    "MKG": "Dr. Mayank Kumar Goyal",
    "NB": "Naveen Bhatnagar",
    "VIJ": "Dr. Vijendra singh"
};

const subjects = {
    "ARP302": "Higher Order Mathematics and Advanced People Skills",
    "CAL302": "Pattern Recognition Lab",
    "CSA041": "Introduction to Natural Language Processing",
    "CSA301": "Soft Computing",
    "CSA302": "Pattern Recognition",
    "CSE031": "Digital Image Processing",
    "CSE032": "Cryptography and Network Security",
    "CSE041": "Software Project Management",
    "CSE352": "Web Technologies",
    "CSP352": "Web Technologies Lab",
    "CSP392": "Project Based Learning (PBL) -4",
    "CSP396": "Technical Skill Enhancement Course-2(Application Development Lab)",
    "HMM305": "Management for Engineers",
    "MTR": "mentoring"
};

let defaultlikedSubjects = [
    "CAL302",
    "CSA302",
    "CSE352",
    "CSP352",
    "CSP396",
    "MTR"
];

const slots = [
    {
        sh: 8,
        sm: 45,
        eh: 9,
        em: 35
    },
    {
        sh: 9,
        sm: 40,
        eh: 10,
        em: 30
    },
    {
        sh: 10,
        sm: 35,
        eh: 11,
        em: 25
    },
    {
        sh: 11,
        sm: 30,
        eh: 12,
        em: 20
    },
    {
        sh: 12,
        sm: 25,
        eh: 13,
        em: 15
    },
    {
        sh: 13,
        sm: 20,
        eh: 14,
        em: 10
    },
    {
        sh: 14,
        sm: 15,
        eh: 15,
        em: 5
    },
    {
        sh: 15,
        sm: 10,
        eh: 16,
        em: 0
    },
];

const currentClassEl = document.getElementsByClassName("current").item(0);

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const allData = document.getElementsByClassName("data");
const body = document.getElementsByTagName("body").item(0);


let indexes = new Array(allData.length).fill("");

function fetchIndexes() {
    for (let i = 0; i < indexes.length; i++) {
        let t = localStorage.getItem(`index${i}`);
        if (t) indexes[i] = t;
        else indexes[i] = "";
    }
}
function cursortoPointers(element) {
    element.classList.add("pointer");
};
function addLabels(element) {
    let subjectspan = element.getElementsByTagName("span").item(0);
    if (!subjectspan) return;
    let subject = subjectspan.textContent.trim();
    let title = subjects[subject];
    if (title) {
        subjectspan.setAttribute("title", title);
    }
    let teacherDiv = element.getElementsByClassName("right bottom").item(0);
    if (!teacherDiv) return;
    let teacher = teacherDiv.textContent.trim();
    if (teacher) {
        let name = teachers[teacher];
        if (name) {
            teacherDiv.setAttribute("title", name);
        }
    }
};
function colorSubjects(element) {
    let subjectspan = element.getElementsByTagName("span").item(0);
    if (!subjectspan) return;
    let subject = subjectspan.textContent.trim();
    if (element.classList.contains("liked")) element.classList.remove("liked");
    if (element.classList.contains("unliked")) element.classList.remove("unliked");
    if (defaultlikedSubjects.includes(subject)) {
        element.classList.add("liked");
    } else {
        element.classList.add("unliked");
    }
};

function save(note, index) {
    localStorage.setItem(`index${index}`, `${note}`);
    fetchIndexes();
}

let active = false;


function removeNotes() {
    let notes = document.getElementsByClassName("note");
    let length = notes.length;
    Array.from(notes).forEach(el => {
        let index = el.getAttribute("index");
        if (index) {
            index = parseInt(index);
            if (index) {
                let textarea = el.getElementsByTagName("textarea").item(0);
                if (textarea) {
                    let val = textarea.value;
                    save(val, index);
                }
            }
        }
        el.remove();
    });
    return length === 0;
};

document.onclick = (ev) => {
    if (!active) return;
    removeNotes();
    active = false;
}

function refresh() {
    let liked = localStorage.getItem("liked");
    liked = JSON.parse(liked);
    if (liked) defaultlikedSubjects = liked;
    initialise();
}

function changeLike(subject) {
    let liked = defaultlikedSubjects.includes(subject);
    if (liked) {
        defaultlikedSubjects = defaultlikedSubjects.filter(x => x !== subject);
    } else {
        defaultlikedSubjects.push(subject);
    }
    localStorage.setItem("liked", JSON.stringify(defaultlikedSubjects));
    refresh();
};

function createNoteElement(posx, posy, note, index, subject) {
    let elem = document.createElement("div");
    elem.className = "note";
    elem.setAttribute("style", `left:${posx}px;top:${posy}px`);
    elem.onclick = (ev) => {
        ev.stopPropagation();
    };
    elem.setAttribute("index", `${index}`);
    let head = document.createElement("div");
    head.className = "notehead cursive";
    let headspan = document.createElement("span");
    headspan.textContent = "NOTE";
    let subjectName = subjects[subject];
    head.appendChild(headspan);
    let like = document.createElement("i");
    let liked = defaultlikedSubjects.includes(subject);
    console.log(subject);
    if (subjectName) {
        console.log(subjectName);
        like.className = liked ? "fas fa-heart" : "far fa-heart";
        like.onclick = (likeevent) => {
            let curclass = likeevent.target.className;
            likeevent.target.className = curclass === "far fa-heart" ? "fas fa-heart" : "far fa-heart";
            changeLike(subject);
        };
        head.appendChild(like);
    }
    elem.appendChild(head);
    let textarea = document.createElement("textarea");
    textarea.value = note;
    textarea.spellcheck = false;
    textarea.maxLength = 100;
    elem.append(textarea);
    body.appendChild(elem);
};

function getNow(time) {
    let date = new Date();
    let day = days[date.getDay()];
    if (!time) time = {
        hour: date.getHours(),
        min: date.getMinutes()
    };
    let slot = slots.find(x => {
        if (x.sh === time.hour) {
            if (x.sm > time.min) return false;
        }
        if (x.sh <= time.hour && x.eh > time.hour) return true;
        if (x.sh <= time.hour && x.eh === time.hour) {
            if (x.em >= time.min) return true;
            else return false;
        }
        return false;
    });
    if (!slot) return null;
    return [day, slot];
};

function onElementClick(ev) {
    let notRemoved = removeNotes();
    if (!notRemoved) return;
    let index = ev.target.getAttribute("id");
    if (!index) return;
    let num = parseInt(index.substring(5));
    if (!index) return;
    let note = indexes[num];
    console.log(ev.target);
    let text = '';
    try {
        let subject = ev.target.getElementsByTagName("span").item(0);
        text = subject.textContent.trim();
    } catch (err) { };
    createNoteElement(ev.target.offsetLeft + 50, ev.target.offsetTop + 50, note, num, text);
    active = true;
    ev.stopPropagation();
};

fetchIndexes();

function initialise() {
    Array.from(allData).forEach((element, index) => {
        element.setAttribute("id", `index${index}`);
        element.setAttribute("onclick", "onElementClick(event)");
        cursortoPointers(element);
        addLabels(element);
        colorSubjects(element);
    });
}

function setCurrentClassInfo(info) {
    currentClassEl.innerHTML = `${info}`;
}

function animateEl(td) {
    Array.from(document.getElementsByClassName("light")).forEach(el => el.classList.remove("light"));
    console.log(td);
    let el = td.getElementsByClassName("data").item(0);
    if (el.innerHTML !== "") {
        el.classList.add("light");
        let subject = el.getElementsByTagName("span").item(0);
        if (!subject) return;
        subject = subject.getAttribute("title");
        if (!subject || subject.length === 0) return;
        let teacher = el.getElementsByClassName("right bottom").item(0);
        if (!teacher) return;
        teacher = teacher.getAttribute("title");
        if (!teacher || teacher.length === 0) return;
        let info = `Current Class : ${subject}<br/>Teacher : ${teacher}`;
        setCurrentClassInfo(info);
    };
};

function animate(day, slot) {
    console.log(day,slot);
    let index = days.indexOf(day);
    let slotindex = slots.indexOf(slot);
    console.log(index,slotindex);
    if (index <= 0 || index >= 7) return;
    if (slotindex < 0 || slotindex >= 8) return;
    let row = document.getElementsByTagName("tr").item(index);
    let cols = Array.from(row.getElementsByTagName("td"));
    cols.shift();
    let curcol = 0;
    for (let i = 0; i < cols.length; i++) {
        let col = cols[i];
        if (col.colSpan === 2) {
            if (slotindex === curcol || slotindex === (curcol + 1)) {
                animateEl(col);
                return;
            }
            curcol += 2;
            continue;
        }
        if (slotindex === curcol) {
            animateEl(col);
            return;
        }
        curcol += 1;
    };
};

function getCurrentClass(time) {
    let data = getNow(time);
    console.log(data);
    if (data) animate(data[0], data[1]);
    else setCurrentClassInfo("");
}

refresh();
getCurrentClass();