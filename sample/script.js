let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = ('0' + date.getUTCMinutes()).slice(-2);
  let seconds = ('0' + date.getUTCSeconds()).slice(-2);
  let milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startPauseStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      display.innerText = formatTime(difference);
    }, 10);
    startPauseButton.innerText = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.innerText = "Start";
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  difference = 0;
  display.innerText = "00:00:00.000";
  startPauseButton.innerText = "Start";
  laps.innerHTML = "";
  lapCounter = 0;
}

function recordLap() {
  if (isRunning) {
    lapCounter++;
    const lapTime = document.createElement("li");
    lapTime.innerText = `Lap ${lapCounter}: ${formatTime(difference)}`;
    laps.appendChild(lapTime);
  }
}

startPauseButton.addEventListener("click", startPauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
