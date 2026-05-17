<script setup lang="ts">
  import { useTaskStore } from '../../stores/taskStore';
  import { onMounted } from 'vue';
  import clock from "../../assets/icons/clock.svg"
  const dataStore = useTaskStore();

  onMounted(() => {
    dataStore.fetchTasks();
  })

  let touchStartX = 0;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  }

  const handleTouchEnd = (event: TouchEvent, item: any) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      item.isSwiped = true;
    } else if (deltaX < -50) {
      item.isSwiped = false;
    }
  }
</script>

<template>
  <section class="taskContent">
    <div v-for="(item, index) in dataStore.tasks" :key="index" class="temp">
      <div class="taskItem" :class="{ 'swipped' : item.isSwiped }"@touchstart="handleTouchStart($event)" @touchend="handleTouchEnd($event, item)">
        <div class="task">
          <button type="button" class="checkBtn"></button>
          <div class="taskText">
            <p>{{ item.title }}</p>
            <p>tag</p>
          </div>
        </div>
        <div class="focusBtnItem">
          <button type="button" class="focusBtn"><img :src="clock"></button>
          <p>start</p>
        </div>
      </div>
      <div v-if="item.isSwiped" class="deleteBtnItem">
        <button type="button" class="deleteBtn" @touchstart.stop @click.stop="dataStore.deleteTask(item.id)">Delete</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import "./taskContent.css";
</style>