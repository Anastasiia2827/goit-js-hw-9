import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from "notiflix";

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let dateChosen = null;
startBtn.setAttribute("disabled", "true");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
       if (selectedDates[0] <= options.defaultDate) {
  Notify.failure("Please choose a date in the future")
 }
 else {
     startBtn.removeAttribute("disabled");
     dateChosen = selectedDates[0];
}
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", onStartClick)

function onStartClick() {
  const timer =
    setInterval(() => {
        const currentDate = Date.now();
        const leftTime = dateChosen.getTime() - currentDate;
        const convertTime = convertMs(leftTime);
        if (leftTime >= 0) {
            days.textContent = convertTime.days.toString().padStart(2, "0");
            hours.textContent = convertTime.hours.toString().padStart(2, "0");
            minutes.textContent = convertTime.minutes.toString().padStart(2, "0");
            seconds.textContent = convertTime.seconds.toString().padStart(2, "0");
        } else {
            Notify.success("The countdown is complete!")
            clearInterval(timer);
            }
        
    }, 1000); 
startBtn.setAttribute("disabled", "true");  
}

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