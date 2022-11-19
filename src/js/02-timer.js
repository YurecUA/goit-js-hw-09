import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('[data-start]');
const selector = document.querySelector('#datetime-picker');
startBtnEl.addEventListener('click', onClickStart);
startBtnEl.setAttribute('disabled', true);
let intervalId = null;
let calendarDate = null;

function onClickStart() {
  startBtnEl.setAttribute('disabled', true);
  selector.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const deltaTime = calendarDate - Date.now();

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    calendarDate = selectedDates[0];

    if (calendarDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        clickToClose: true,
        timeout: 2000,
      });
      startBtnEl.setAttribute('disabled', true);
      return;
    } else {
      startBtnEl.removeAttribute('disabled');
      selector.setAttribute('disabled', true);
      // console.log(calendarDate);
      clearInterval(intervalId);
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(selector, options);

// class countDownTimer {
//   constructor({ selector, targetDate }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.selector = selector;
//     this.targetDate = targetDate;
//     this.onTick = this.updateTimeMarkup;
//     this.inputEl = document.querySelector(['#datetime-picker']);
//     this.daysValueField = document.querySelector(`${this.selector} [data-days]`);
//     this.hoursValueField = document.querySelector(`${this.selector} [data-hours]`);
//     this.minutesValueField = document.querySelector(`${this.selector} [data-minutes]`);
//     this.secondsValueField = document.querySelector(`${this.selector} [data-seconds]`);
//     this.init();
//   }
//   // инициализирую оставшееся время
//   init() {
//     const zeroTime = this.convertMs(this.targetDate.getTime() - Date.now());
//     this.onTick(zeroTime);
//   }
//   //Конвертирую UNIX-время в миллисекунды
//   convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }
//   addLeadingZero(value) {
//     return String(value).padStart(2, '0');
//   }
//   startTimer() {
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = this.targetDate.getTime() - currentTime;
//       const time = this.convertMs(deltaTime);
//       this.onTick(deltaTime);
//     }, 1000);
//   }
//   updateTimeMarkup({ days, hours, minutes, seconds }) {
//     this.daysValueField.textContent = days;
//     this.daysValueField.textContent = hours;
//     this.daysValueField.textContent = minutes;
//     this.daysValueField.textContent = seconds;
//   }
// }

// const timer = new countDownTimer({ selector: '.value', options: new Date('Jan 1, 2023') });
// timer.startTimer.call(timer);

// flatpickr(inputEl, options);