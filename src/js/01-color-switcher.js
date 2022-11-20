function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let itemID = null;
let changeBgnColorBtnOn = false;

const onStartBtnClick = () => {
  if (changeBgnColorBtnOn) {
    return;
  }
  startBtn.disabled = true;
  stopBtn.disabled = false;
  changeBgnColorBtnOn = true;
  itemID = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopBtnClick = () => {
  clearInterval(itemID);
  changeBgnColorBtnOn = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
