import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBut = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
let inputDate = null;
let remainingDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputDate = selectedDates[0].getTime();
    checkCorrectDate();
  },
};

const checkCorrectDate = () => {
  remainingDate = inputDate - new Date().getTime();
  if (remainingDate <= 0) {
    Notify.failure('Please choose a date in the future', {
      timeout: 4000,
    });
  } else {
    startBut.disabled = false;
  }
};

const updateTimerValue = () => {
  remainingDate = inputDate - new Date().getTime();
  if (remainingDate > 0) {
    fillTimerValues(convertMs(remainingDate));
  } else {
    clearTimeout(intervalId);
    input.disabled = false;
  }
};

const startTimer = () => {
  remainingDate = inputDate - new Date().getTime();
  if (remainingDate > 0) {
    startBut.disabled = true;
    input.disabled = true;
    fillTimerValues(convertMs(remainingDate));
    intervalId = setInterval(updateTimerValue, 1000);
  } else {
    Notify.failure('Please choose a date in the future', {
      timeout: 4000,
    });
  }
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => String(value).padStart(2, '0');

const fillTimerValues = ({ days, hours, minutes, seconds }) => {
  daysValue.innerHTML = days;
  hoursValue.innerHTML = addLeadingZero(hours);
  minutesValue.innerHTML = addLeadingZero(minutes);
  secondsValue.innerHTML = addLeadingZero(seconds);
};

startBut.addEventListener('click', startTimer);
startBut.disabled = true;
flatpickr(input, options);
