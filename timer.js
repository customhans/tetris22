let minutes = 00;
let seconds = 00;
let tens = 00;
let appendMinutes = document.getElementById("minutes");
let appendSeconds = document.getElementById("seconds");
let timerInterval;

const timer = {
  start() {
    clearInterval(timerInterval);
    timerInterval = setInterval(this.update, 10);
  },

  update() {
    tens++;
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      seconds = 0;
      minutes++;
      appendSeconds.innerHTML = "0" + seconds;
      appendMinutes.innerHTML = "0" + minutes;
    }
  },

  stop() {
    clearInterval(timerIntervaltimerInterval);
  },

  clear() {
    tens = seconds = minutes = 0;
    appendSeconds.innerHTML = "00";
    appendMinutes.innerHTML = "00";
  },
};
