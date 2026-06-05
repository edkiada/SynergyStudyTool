<script setup lang="ts">
  import dropdown from '../../../assets/icons/dropdown.svg'
  import { useTaskStore } from '../../../stores/taskStore';
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  
  const taskStore = useTaskStore();
  const isTaskListOpen = ref(false);
  const toggleTaskList = () => {
    isTaskListOpen.value = !isTaskListOpen.value;
  };

  const updateNowTask = (title: string, priority: string, id: string) => {
    localStorage.setItem('precentFocusTask', title);
    localStorage.setItem('precentTaskPrioirty', priority);
    localStorage.setItem('precentFocusTaskId', id);
    taskStore.currentFocusTask = (localStorage.getItem('precentFocusTask') || 'EMPTY');
    taskStore.currentTaskPrioirty = (localStorage.getItem('precentTaskPrioirty') || '');
    taskStore.currentTaskId = (localStorage.getItem('precentFocusTaskId') || '');
    isTaskListOpen.value = false;
  };
  const priorityColor = (priority : String) => {
    if (priority === 'high') {
      return 'var(--PriorityRed)';
    } else if (priority === 'medium') {
      return 'var(--PriorityYellow)';
    } else if (priority === 'low') {
      return 'var(--PriorityGreen)';
    } else {
      return '';
    }
  }

  onMounted(() => {
    taskStore.fetchTasks();
    taskStore.currentFocusTask = (localStorage.getItem('precentFocusTask') || 'EMPTY');
    taskStore.currentTaskPrioirty = (localStorage.getItem('precentTaskPrioirty') || 'low');
    taskStore.currentTaskId = (localStorage.getItem('precentFocusTaskId') || '');
  })
</script>

<template>
  <section class="mainContainer">
    <button class="Btn" @click="toggleTaskList"><img :src="dropdown" alt="dropdownIcon" class="dropdownIcon"></button>
    <div class="taskItem">
      <div class="taskInfo">
        <button class="completedTask Btn"></button>
        <p class="taskText">{{ taskStore.currentFocusTask }}</p>
      </div>
      <div class="taskPriority" :style="{'--priorityColor' : priorityColor(taskStore.currentTaskPrioirty) }"></div>
    </div>
    <div class="overlay" v-show="isTaskListOpen">
      <button class="Btn taskBtn" @click="updateNowTask('EMPTY', 'low', '')">EMPTY</button>
      <div v-for="(item, index) in taskStore.tasks" :key="index">
        <button class="Btn taskBtn" v-show="item.status == 'pending'" @click="updateNowTask(item.title, item.priority, item.id)">{{ item.title }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import './focusTask.css';
</style>