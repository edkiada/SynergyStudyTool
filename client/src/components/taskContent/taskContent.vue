<script setup lang="ts">
  import { useTaskStore } from '../../stores/taskStore';
  import { onMounted } from 'vue';
  import clock from "../../assets/icons/clock.svg"
  const dataStore = useTaskStore();

  onMounted(() => {
    dataStore.fetchTasks();
  })
</script>

<template>
  <section class="taskContent">
    <div v-for="(item, index) in dataStore.tasks" :key="index" class="taskItem">
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
  </section>
</template>

<style scoped>
  @import "./taskContent.css";
</style>