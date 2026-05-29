<script setup lang="ts">

</script>

<template>
  <section class="timerContainer">
    <div class="timerItem timerMode">
      <button class="timerBtn modeBtn leftBtn"><span>FocusBlock</span></button>
      <button class="timerBtn modeBtn rightBtn"><span>TimeTracker</span></button>
    </div>
    <div class="timerItem timerDisplay">
      <p class="timeTextHour">1H</p>
      <p class="timerTextMain">25 : 00</p>
    </div>
    <div class="timerItem timerControl">
      <button class="timerBtn controlBtn"><span>START</span></button>
      <button class="timerBtn controlBtn"><span>STOP</span></button>
    </div>
  </section>
</template>

<style scoped>
  @import './dualTimer.css';
</style>