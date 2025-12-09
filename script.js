'use strict';

const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

startBtn.addEventListener('click', function () {
    console.log('start');
});

pauseBtn.addEventListener('click', function () {
    console.log('pause');
});

resetBtn.addEventListener('click', function () {
    console.log('reset');
});