// Selecting elements
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Variables to store time values
let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
  interval = null,
  isRunning = false;

// Function to update the stopwatch display
function updateDisplay() {
  milliseconds += 10;

  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
  millisecondsElement.textContent = formatMilliseconds(milliseconds);
}

// Helper functions to format time
function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

function formatMilliseconds(time) {
  return time < 100 ? `0${Math.floor(time / 10)}` : `${Math.floor(time / 10)}`;
}

// Start button event listener
startButton.addEventListener('click', () => {
  if (!isRunning) {
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
});

// Pause button event listener
pauseButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  }
});

// Reset button event listener
resetButton.addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapsContainer.innerHTML = '';
});

// Lap button event listener
lapButton.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
      seconds
    )}:${formatMilliseconds(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.prepend(lapItem);
  }
});
