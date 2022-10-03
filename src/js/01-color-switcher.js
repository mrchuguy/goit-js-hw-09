const startBut = document.querySelector('button[data-start]');
const stopBut = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

stopBut.disabled = true;

const startBgColorChange = () => {
  changeButtonsState();
  body.style.background = getRandomHexColor();
  intervalId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
};

const stopBgColorChange = () => {
  changeButtonsState();
  clearInterval(intervalId);
};

const changeButtonsState = () => {
  startBut.disabled = !startBut.disabled;
  stopBut.disabled = !stopBut.disabled;
};

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBut.addEventListener('click', startBgColorChange);
stopBut.addEventListener('click', stopBgColorChange);
