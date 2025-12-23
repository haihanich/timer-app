'use strict';

// DOM-элементы
const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Состояние
let remainingSeconds = 0;
let intervalId = null;
let isRunning = false;

// Форматирование времени MM:SS
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Инициализация дисплея из инпута
function initTimerDisplay() {
  const minutesValue = Number(minutesInput.value) || 0;
  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
}

// Обновление дисплея при изменении инпута (если таймер НЕ запущен)
minutesInput.addEventListener('input', function () {
  if (isRunning) {
    return;
  }

  const minutesValue = Number(minutesInput.value);

  if (Number.isNaN(minutesValue) || minutesValue < 0) {
    remainingSeconds = 0;
    timerDisplay.textContent = '00:00';
    return;
  }

  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
});

// Кнопка Start: запускает обратный отсчёт
startBtn.addEventListener('click', function () {
  // Защита от повторного запуска (чтобы не создать второй setInterval)
  if (isRunning) {
    return;
  }

  // Берём текущее значение минут из инпута в момент старта
  const minutesValue = Number(minutesInput.value);

  if (Number.isNaN(minutesValue) || minutesValue <= 0) {
    remainingSeconds = 0;
    timerDisplay.textContent = '00:00';
    return;
  }

  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);

  isRunning = true;

  intervalId = setInterval(function () {
    remainingSeconds -= 1;
    timerDisplay.textContent = formatTime(remainingSeconds);

    if (remainingSeconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      isRunning = false;

      timerDisplay.textContent = '00:00';
      alert('Время вышло!');
    }
  }, 1000);
});

// При загрузке
initTimerDisplay();
