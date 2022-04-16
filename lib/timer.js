const appendSeconds =  document.getElementById("seconds");
const appendMinutes =  document.getElementById("minutes");

const timer = {
  attr: {
    minutes: "00",
    tens: "00",
    seconds: "00",
    timerInterval: undefined,
  },

  start() {
    if (timer.attr.timerInterval) this.clearDisplay();
    clearInterval(timer.attr.timerInterval);
    timer.attr.timerInterval = setInterval(this.update, 10);
  },

  update() {
    timer.attr.tens++;
    if (timer.attr.tens > 99) {
      timer.attr.seconds++;
      appendSeconds.innerHTML = "0" + timer.attr.seconds;
      timer.attr.tens = 0;
    }

    if (timer.attr.seconds > 9) {
      appendSeconds.innerHTML = timer.attr.seconds;
    }

    if (timer.attr.seconds > 59) {
      timer.attr.seconds = 0;
      timer.attr.minutes++;
      appendSeconds.innerHTML = "0" + timer.attr.seconds;
      appendMinutes.innerHTML = "0" + timer.attr.minutes;
    }
  },

  stop() {
    clearInterval(timer.attr.timerInterval);
  },

  clearDisplay() {
    timer.attr.tens = timer.attr.seconds = timer.attr.minutes = 0;
    appendSeconds.innerHTML = "00";
    appendMinutes.innerHTML = "00";
  },
}

export default timer;
