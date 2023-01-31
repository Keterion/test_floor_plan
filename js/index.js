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
    }
}


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


function init() {
    currRoom = "office";
    prevRoom = "none";
    showRoom("office");
    let input = document.getElementById("terminalInput");
    input.addEventListener("keydown", (e) => {
        if(e.key==="Enter") {
            try {
                checkCommand(input.value);
            } catch {}
            commandToHistory(input.value);
            input.value = "";
            document.getElementById("terminalInput").scrollIntoView();
        }
    })
}