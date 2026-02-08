import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector("button");
const values = document.querySelectorAll(".value");
const picker = document.querySelector("#datetime-picker");
let userSelectedDate = null;
let intervalId = null;
btn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}

function render({ days, hours, minutes, seconds }) {
  values[0].innerHTML = addLeadingZero(days);
  values[1].innerHTML = addLeadingZero(hours);
  values[2].innerHTML = addLeadingZero(minutes);
  values[3].innerHTML = addLeadingZero(seconds);
}

function startTimer() {
  intervalId = setInterval(() => {
    const now = Date.now();
    const ms = userSelectedDate.getTime() - now;

    if (ms<=0) {
      stopTimer();
       render({ days:0, hours:0, minutes:0, seconds:0})
      return
    }
    const result = convertMs(ms);
    

  render(result)
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  picker.disabled = false;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        iziToast.error({
    message: "Please choose a date in the future"
});
        btn.disabled = true;
      } else {
        userSelectedDate = selectedDates[0];
        btn.disabled = false;
      }
  },
};

flatpickr("#datetime-picker", options);

btn.addEventListener("click", () => {
  startTimer()
  btn.disabled = true;
  picker.disabled = true;
 })