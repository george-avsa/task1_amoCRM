const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// для придерживания формата, когда число становится от 0 до 9 
const digitToString = (num) => (num < 10) ? `0${num}` : num.toString();

// функция преобразования секунл в время формата hh:mm:ss
function secondsToFormat(seconds) {
  const hours = digitToString(Math.trunc(seconds / 3600));
  const minutes = digitToString(Math.trunc(seconds / 60) % 60);
  const secondsStringified = digitToString(seconds % 60);
  return `${hours}:${minutes}:${secondsStringified}`
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  
  // setInterval возращает id, я его сохраняю, чтобы потом по завершению работы - очистить его
  let intervalId;
  
  // замыкание
  return (seconds) => {
    // secondsRemained нужен для создания выхода из setInterval
    let secondsRemained = seconds;
    // если ранее setInteval был - очищается
    clearInterval(intervalId);
    
    timerEl.innerText = secondsToFormat(secondsRemained);
    intervalId = setInterval(() => {
      if (secondsRemained > 0) {
        --secondsRemained;
        timerEl.innerText = secondsToFormat(secondsRemained);
      } else {
        // конец работы setIterval
        clearInterval(intervalId);
        timerEl.innerText = 'hh:mm:ss';
      }

    }, 1000)
  };

};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  const currentValue = inputEl.value;
  inputEl.value = Number.parseInt(currentValue) || '';
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
