<script setup lang="ts">
  import { useMainStore } from "../../../stores/mainStore";
  import taskIcon from "../../../assets/icons/task.svg"
  import taskIconChecked from "../../../assets/icons/task(check).svg"
  import calendar from "../../../assets/icons/calendar.svg"
  import calendarChecked from "../../../assets/icons/calendar(check).svg"
  import focusIcon from "../../../assets/icons/focus.svg"
  import focusIconChecked from "../../../assets/icons/focus(check).svg"
  import Note from "../../../assets/icons/note.svg"
  import NoteChecked from "../../../assets/icons/note(check).svg"
  const mainStore = useMainStore()
</script>

<template>
  <section class="navContainer">
    <div class="btnContainer">
      <RouterLink to="/">
        <button type="button" class="appBtn" @click="mainStore.switchView('task')">
          <img :src="mainStore.nowView === 'task' ? taskIconChecked : taskIcon" alt="taskIcon">
        </button>
      </RouterLink>
      <p>Task</p>
    </div>
    <div class="btnContainer">
      <RouterLink to="/calendar">
        <button type="button" class="appBtn" @click="mainStore.switchView('calendar')"><img :src="mainStore.nowView === 'calendar' ? calendarChecked : calendar" alt="taskIcon"></button>
      </RouterLink>
      <p>Calendar</p>
    </div>
    <div class="btnContainer">
      <RouterLink to="/focus">
        <button type="button" class="appBtn" @click="mainStore.switchView('focus')"><img :src="mainStore.nowView === 'focus' ? focusIconChecked : focusIcon" alt="taskIcon"></button>
      </RouterLink>
      <p>Focus</p>
    </div>
    <div class="btnContainer">
      <button type="button" class="appBtn" @click="mainStore.switchView('note')"><img :src="mainStore.nowView === 'note' ? NoteChecked : Note" alt="taskIcon"></button>
      <p>Note</p>
    </div>
  </section>
</template>

<style scoped>
  @import './navBar.css';
</style>