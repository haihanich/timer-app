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

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Инициализация дисплея
function initTimerDisplay() {
  const minutesValue = Number(minutesInput.value) || 0;
  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
}

// Синхронизация с инпутом (если таймер не запущен)
minutesInput.addEventListener('input', function () {
  if (isRunning) return;

  const minutesValue = Number(minutesInput.value);

  if (Number.isNaN(minutesValue) || minutesValue < 0) {
    remainingSeconds = 0;
    timerDisplay.textContent = '00:00';
    return;
  }

  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
});

// Запуск таймера
startBtn.addEventListener('click', function () {
  if (isRunning) return;

  // Если таймер ещё не был запущен или был сброшен
  if (remainingSeconds <= 0) {
    const minutesValue = Number(minutesInput.value);

    if (Number.isNaN(minutesValue) || minutesValue <= 0) {
      remainingSeconds = 0;
      timerDisplay.textContent = '00:00';
      return;
    }

    remainingSeconds = minutesValue * 60;
    timerDisplay.textContent = formatTime(remainingSeconds);
  }

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

// Пауза таймера
pauseBtn.addEventListener('click', function () {
  if (!isRunning) return;

  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
});

// При загрузке
initTimerDisplay();
