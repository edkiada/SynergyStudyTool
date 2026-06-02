<script setup lang="ts">
  import { ref, computed } from 'vue';

  const isRunning = ref(false);
  const totalDuration = ref(25 * 60); 
  const secandsLeft = ref(25 * 60);
  const secand = ref(0);
  const countUpSecands = ref(0);
  const countUpHours = ref(0);
  const activeMode = ref('TimeTracker'); 
  const btnText = ref('START');


  let timerLoop: number | null = null;
  let targetEndTime: number | null = null;
  let targetTime: number | null = null;

  const startTimer = () => {
    if(isRunning.value) return;
    isRunning.value = true;
    if(activeMode.value === 'FocusBlock') {
      targetEndTime = Date.now() + secandsLeft.value * 1000;
      timerLoop = window.setInterval(() => {
        if(!targetEndTime) return;
        const remainingTime = targetEndTime - Date.now();
        if (remainingTime <= 0) {
          secandsLeft.value = 0;
          stopTimer();
        } else {
          secandsLeft.value = Math.ceil(remainingTime / 1000);
        }
      }, 200);
    } else if(activeMode.value === 'TimeTracker') {
      targetTime = Date.now();
      timerLoop = window.setInterval(() => {
        if(!targetTime) return;
        const elapsedTime = Date.now() - targetTime;
        countUpSecands.value = secand.value + Math.floor(elapsedTime / 1000);
      })
    }
  }
  const pauseTimer = () => {
    isRunning.value = false;
    if (timerLoop) {
      clearInterval(timerLoop);
      timerLoop = null;
    }
    if(activeMode.value === 'TimeTracker') {
      secand.value = countUpSecands.value;
    }
  }

  const stopTimer = () => {
    isRunning.value = false;
    secandsLeft.value = totalDuration.value;
    countUpSecands.value = 0;
    secand.value = 0;
    targetTime = null;
    targetEndTime = null;
    btnText.value = 'START';
  }

  const toggleTimer = () => {
    if (isRunning.value) {
      pauseTimer();
      btnText.value = 'START';
    } else {
      startTimer();
      btnText.value = 'PAUSE';
    }
  }

  const displayTime = computed(() => {
    if(activeMode.value === 'FocusBlock') {
      const minutes = Math.floor((activeMode.value === 'FocusBlock' ? secandsLeft.value : countUpSecands.value) / 60);
      const seconds = (activeMode.value === 'FocusBlock' ? secandsLeft.value : countUpSecands.value) % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else if(activeMode.value === 'TimeTracker') {
      countUpHours.value = Math.floor(countUpSecands.value / 3600);
      const minutes = Math.floor((countUpSecands.value % 3600) / 60);
      const seconds = countUpSecands.value % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  })

  const switchMode = (mode: string) => {
    if(isRunning.value) return;
    activeMode.value = mode;
    stopTimer();
  }
</script>

<template>
  <section class="timerContainer">
    <div class="timerItem timerMode">
      <button class="timerBtn modeBtn leftBtn" @click="switchMode('FocusBlock')" :class="{ 'selectBtn' : activeMode === 'FocusBlock' }"><span>FocusBlock</span></button>
      <button class="timerBtn modeBtn rightBtn" @click="switchMode('TimeTracker')" :class="{ 'selectBtn' : activeMode === 'TimeTracker' }"><span>TimeTracker</span></button>
    </div>
    <div class="timerItem timerDisplay">
      <p class="timeTextHour" :class="{ 'unSee' : activeMode === 'FocusBlock' }">{{ countUpHours }} H</p>
      <p class="timerTextMain">{{ displayTime }}</p>
    </div>
    <div class="timerItem timerControl">
      <button class="timerBtn controlBtn" @click="toggleTimer"><span>{{ btnText }}</span></button>
      <button class="timerBtn controlBtn" @click="stopTimer"><span>STOP</span></button>
    </div>
  </section>
</template>

<style scoped>
  @import './dualTimer.css';
</style>