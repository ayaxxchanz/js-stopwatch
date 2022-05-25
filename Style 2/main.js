//Global variables

const time_el = document.querySelector('.watch .time');
const startStop_btn = document.getElementById('startStop');
const reset_btn = document.getElementById('reset');

[milliseconds,seconds,minutes,hours] = [0,0,0,0];
let interval = null;
let timestatus = "stopped";

//Event listeners
startStop_btn.addEventListener('click', startStop);
reset_btn.addEventListener('click', reset);

//Update timer
function timer() {
    const ms = (time) => {
        while (time.length < 2) { 
          time = '0' + time; 
        } 
        return time;
    }

    let time = new Date(milliseconds);

    milliseconds+=10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let hrs = hours < 10 ? "0" + hours : hours;
    let mins = minutes < 10 ? "0" + minutes : minutes;
    let secs = seconds < 10 ? "0" + seconds : seconds;
    //Display only 2 digits for milliseconds
    let millisecs = ms('' + (time.getMilliseconds() / 10 | 0));

    time_el.innerText = `${hrs} : ${mins} : ${secs}.${millisecs}`;
}

function ms(time) {
    return time < 10 ? '0' + time : '' + time;
}

function startStop() {
    //If not running
    if(timestatus === "stopped") {
        startStop_btn.innerText = 'Stop';
        interval = setInterval(timer,10);
        timestatus = "started";
    }
    //If already running
    else {
        startStop_btn.innerText = 'Start';
        clearInterval(interval);
        interval = null;
        timestatus = "stopped";
    }
}

function reset() {
    startStop_btn.innerText = 'Start';
    timestatus = "stopped";
    clearInterval(interval);
    interval = null;
    seconds = 0;
    time_el.innerText = '00 : 00 : 00.00';
}