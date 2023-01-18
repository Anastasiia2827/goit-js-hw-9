import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from "notiflix";

const startBtn = document.querySelector('[data-start]');
let dateChosen = null;
startBtn.setAttribute("disabled", "true");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // зробити деструктуризацію selectedDates done
  onClose([selectedDates]) {      
   const inputDate = selectedDates.getTime();
       if (inputDate <= Date.now()) {
  Notify.failure("Please choose a date in the future")
 }
 else {
     startBtn.removeAttribute("disabled");
     dateChosen = selectedDates;
}
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
        countdown(convertTime);
          // звернення до дом дерева винести в окрему функцію
            // days.textContent = convertTime.days.toString().padStart(2, "0");
            // hours.textContent = convertTime.hours.toString().padStart(2, "0");
            // minutes.textContent = convertTime.minutes.toString().padStart(2, "0");
            // seconds.textContent = convertTime.seconds.toString().padStart(2, "0");
        } else {
            Notify.success("The countdown is complete!")
            clearInterval(timer);
            }
        
    }, 1000); 
startBtn.setAttribute("disabled", "true");  
}

function countdown({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
const days = addZero(Math.floor(ms / day));
// Remaining hours
const hours = addZero(Math.floor((ms % day) / hour));
// Remaining minutes
const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
// Remaining seconds
const seconds = addZero(
  Math.floor((((ms % day) % hour) % minute) / second)
);
  return { days, hours, minutes, seconds };
}