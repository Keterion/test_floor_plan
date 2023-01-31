function roomHover(roomName) {
    document.getElementById("Message").innerHTML = roomName;
}

function checkCommand(command) {
    if (command.startsWith("cd ")) {
        let directory = command.replace("cd ", "");
        console.log(directory);
        gotoDirectory(directory);
    } else if (command.startsWith("clear")) {
        clearHistory();
    } else if (command.startsWith("map")) {
        toggleMap();
    }
}

/*
Room changing
*/

function showRoom(room) {
    document.getElementById(room.toLowerCase()).style.setProperty("--display", "block");
}
function hidePrevRoom(currRoom) {
    document.getElementById(currRoom).style.setProperty("--display", "none");
}
function gotoDirectory(directory) {
    if (directory == "..") {
        hidePrevRoom(currRoom);
        showRoom(prevRoom);
        currRoom = prevRoom;
        prevRoom = "none";
        return;
    }
    prevRoom = currRoom;
    currRoom = directory;
    hidePrevRoom(prevRoom);
    showRoom(currRoom);
}


/*
The command history logic
*/
function commandToHistory(command) {
    //console.log("logging '" + command + "' to history");
    let historyEntry = document.createElement("p");
    historyEntry.innerHTML = (document.getElementById("promptText").innerHTML + command);
    historyEntry.setAttribute("class", "history_command");
    document.getElementById("terminal").insertBefore(historyEntry, document.getElementById("promptText"));
    /*
    cascadeHistory();
    document.getElementById("history_1").innerHTML = (document.getElementById("promptText").innerHTML + command);
    */
}
function clearHistory(){
    var elements = document.getElementsByClassName("history_command");
    var iterlength = elements.length;
    for(var i = 0; i < iterlength; i++) {
        elements[0].remove(); // you delete something from the array, the array shrinks -> always pos 0
    }
}
/*
function cascadeHistory() {
    let history1 = document.getElementById("history_1").innerHTML;
    let history2 = document.getElementById("history_2").innerHTML;
    console.log(history1);
    document.getElementById("history_2").innerHTML = history1;
    document.getElementById("history_3").innerHTML = history2;
}
*/
/*
Map-stuff
*/
function toggleMap(){
    if(map) {
        map = false;
        hideMap();
        return;
    } else {
        map = true;
        showMap();
        return;
    }
}
function showMap() {
    document.getElementById("map").style.setProperty("--display", "block");
}
function hideMap() {
    document.getElementById("map").style.setProperty("--display", "none");
}
/*
LocalStorage interfacing
*/

function getKey(key) {
    if(checkKey(key)) {
        return localStorage.getItem(key);
    }
}
function saveKey(key, value) {
    localStorage.setItem(key, value);
    console.log("Saved " + value + " to " + key);
}
function checkKey(key) {
    if (localStorage.getItem(key) === null) { // if there is no key found
        return false;
    } // if there is a key
    return true;
}

/*
Init functions
*/


function init() {
    initKeys();
    currRoom = "office";
    prevRoom = "none";
    map = false;
    showRoom("office");
    let input = document.getElementById("terminalInput");
    input.addEventListener("keydown", (e) => {
        if(e.key==="Enter") {
            commandToHistory(input.value);
            try {
                checkCommand(input.value);
            } catch {}
            input.value = "";
            document.getElementById("terminalInput").scrollIntoView();
        }
    })
}

function initKeys() {
    return;
}