function roomHover(roomName) {
    document.getElementById("Message").innerHTML = roomName;
}

function checkCommand(command) {
    if (command.startsWith("cd ")) {
        let directory = command.replace("cd ", "");
        console.log(directory);
        gotoDirectory(directory);
    } else if(command.startsWith("ls")) {
        showTree();
    } else if (command.startsWith("clear")) {
        hideTree();
        clearHistory();
    } else if (command.startsWith("map")) {
        toggleMap();
    }
}

/*
Directory changing
*/

function showDir(dir) {
    document.getElementById(dir.toLowerCase()).style.setProperty("--display", "block");
}
function hidePrevDir(currDir) {
    document.getElementById(currDir).style.setProperty("--display", "none");
}
function gotoDirectory(directory) {
    if (directory == "..") {
        hidePrevDir(currDir);
        showDir(prevDir);
        currDir = prevDir;
        prevDir = "none";
        changeTerminalDir(currDir);
        return;
    }
    prevDir = currDir;
    currDir = directory;
    hidePrevDir(prevDir);
    showDir(currDir);
    changeTerminalDir(directory);
}
function changeTerminalDir(directory) {
    document.getElementById("promptText").innerHTML = "~/" + directory + "/: ";
}
/*
Dir Listing
*/
function toggleTree() {
    if(fileTree) {
        fileTree = false;
        hideTree();
        return;
    }
    fileTree = true;
    showTree();
    return;
}
function hideTree() {
    var elements = document.getElementsByTagName("files");
    for(var i = 0; i<elements.length; i++) {
        elements[i].style.setProperty("--display", "none");
    }
}
function showTree() {
    var elements = document.getElementsByTagName("files");
    for(var i = 0; i<elements.length; i++) {
        elements[i].style.setProperty("--display", "block");
    }
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
IO
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
    currDir = "office";
    prevDir = "none";
    map = false;
    fileTree = false;
    hideTree();
    showDir("office");
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