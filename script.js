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

// ===== Helpers =====

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function getSecondsFromInput() {
  const minutesValue = Number(minutesInput.value);

  if (Number.isNaN(minutesValue) || minutesValue <= 0) {
    return 0;
  }

  return minutesValue * 60;
}

function updateButtons() {
  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;
  resetBtn.disabled = remainingSeconds === 0 && !isRunning;
}

// ===== Timer logic =====

function startTimer() {
  if (isRunning) return;

  if (remainingSeconds <= 0) {
    remainingSeconds = getSecondsFromInput();
    if (remainingSeconds === 0) {
      updateDisplay();
      updateButtons();
      return;
    }
  }

  isRunning = true;
  updateButtons();
  intervalId = setInterval(tick, 1000);
}

function tick() {
  remainingSeconds -= 1;
  updateDisplay();

  if (remainingSeconds <= 0) {
    stopTimer();
    remainingSeconds = 0;
    updateDisplay();
    updateButtons();
    alert('Время вышло!');
  }
}

function pauseTimer() {
  if (!isRunning) return;
  stopTimer();
  updateButtons();
}

function resetTimer() {
  stopTimer();
  remainingSeconds = 0;
  updateDisplay();
  updateButtons();
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
}

// ===== Events =====

minutesInput.addEventListener('input', function () {
  if (isRunning) return;
  remainingSeconds = getSecondsFromInput();
  updateDisplay();
  updateButtons();
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// ===== Init =====

remainingSeconds = getSecondsFromInput();
updateDisplay();
updateButtons();
