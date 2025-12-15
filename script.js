'use strict';

// DOM-элементы
const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Состояние таймера
let remainingSeconds = 0;
let intervalId = null;
let isRunning = false;

/**
 * Преобразует количество секунд в строку формата MM:SS
 * @param {number} totalSeconds
 * @returns {string}
 */
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// --- начальная инициализация ---

function initTimerDisplay() {
  const minutesValue = Number(minutesInput.value) || 0;
  remainingSeconds = minutesValue * 60;
  timerDisplay.textContent = formatTime(remainingSeconds);
}

// Инициализируем отображение при загрузке страницы
initTimerDisplay();
