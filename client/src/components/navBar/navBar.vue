<script setup lang="ts">
  import { ref } from "vue";
  import taskIcon from "../../assets/icons/task.svg"
  import taskIconChecked from "../../assets/icons/task(check).svg"
  import calendar from "../../assets/icons/calendar.svg"
  import calendarChecked from "../../assets/icons/calendar(check).svg"
  import focusIcon from "../../assets/icons/focus.svg"
  import focusIconChecked from "../../assets/icons/focus(check).svg"
  import Note from "../../assets/icons/note.svg"
  import NoteChecked from "../../assets/icons/note(check).svg"
  const nowView = ref('note')

  const switchView = (view: string) => {
    nowView.value = view
  }
</script>

<template>
  <section class="navContainer">
    <div class="btnContainer">
      <button type="button" class="appBtn" @click="switchView('task')"><img :src="nowView === 'task' ? taskIconChecked : taskIcon" alt="taskIcon"></button>
      <p>Task</p>
    </div>
    <div class="btnContainer">
      <button type="button" class="appBtn" @click="switchView('calendar')"><img :src="nowView === 'calendar' ? calendarChecked : calendar" alt="taskIcon"></button>
      <p>Calendar</p>
    </div>
    <div class="btnContainer">
      <button type="button" class="appBtn" @click="switchView('focus')"><img :src="nowView === 'focus' ? focusIconChecked : focusIcon" alt="taskIcon"></button>
      <p>Focus</p>
    </div>
    <div class="btnContainer">
      <button type="button" class="appBtn" @click="switchView('note')"><img :src="nowView === 'note' ? NoteChecked : Note" alt="taskIcon"></button>
      <p>Note</p>
    </div>
  </section>
</template>

<style scoped>
  @import './navBar.css';
</style>