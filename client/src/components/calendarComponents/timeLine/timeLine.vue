<script setup lang="ts">

</script>

<template>
  <section>
    <div class="timeContainer">
      <div v-for="time in 18" :key="time" class="timeItem">
        <p class="timeText">{{ time + 5 }} : 00</p>
        <div class="test"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import './timeLine.css'
</style>