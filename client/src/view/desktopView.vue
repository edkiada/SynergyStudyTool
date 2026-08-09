<script setup lang="ts">
  import { useMainStore } from '../stores/mainStore'
  import { onMounted, ref } from 'vue'
  import cHeader from '../components/calendarComponents/cHeader/cHeader.vue'
  import taskContent from '../components/taskComponents/taskContent/taskContent.vue'
  import addTask from '../components/taskComponents/addTask/addTask.vue'
  import timeLine from '../components/calendarComponents/timeLine/timeLine.vue'
  import dualTimer from '../components/focusComponents/dualTimer/dualTimer.vue'
  import focusTask from '../components/focusComponents/focusTask/focusTask.vue'
  import Header from '../components/globalComponents/header/header.vue'
  const mainStore = useMainStore()

  const Mode = ref('time');

  const switchMode = (mode: string) => {
    Mode.value = mode;
  }

  onMounted(() => {
    mainStore.nowView = 'task'
  })
</script>

<template>
  <header class="head" v-if="Mode === 'focus'">
    <Header />
  </header>
  <header class="head" v-if="Mode === 'time'">
    <cHeader />
  </header>
  <main>
    <div class="leftContainer">
      <div class="switchBtnList">
        <button class="switchBtn leftBtn" type="button" @click="switchMode('focus')" :class="{ 'selectedBtn': Mode === 'focus'}">Focus</button>
        <button class="switchBtn rightBtn" type="button" @click="switchMode('time')" :class="{ 'selectedBtn': Mode === 'time'}">Calendar</button>
      </div>
      <div class="focusMode" v-if="Mode === 'focus'">
        <dualTimer />
        <focusTask />
      </div>
      <div class="timeMode" v-else>
        <timeLine />
      </div>
    </div>
    <div class="taskMode">
      <taskContent />
      <addTask />
    </div>
  </main>
</template>

<style scoped>
  @import '../desktop.css';
</style>