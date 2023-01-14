const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function color() {
    document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener("click", () => {
    timerId = setInterval(color, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
})

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
})
  
