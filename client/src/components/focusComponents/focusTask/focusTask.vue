<script setup lang="ts">
  import dropdown from '../../../assets/icons/dropdown.svg'
  import { useTaskStore } from '../../../stores/taskStore';
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  
  const taskStore = useTaskStore();
  const isTaskListOpen = ref(false);
  const nowTask = ref('EMPTY');
  const taskPriority = ref('');
  const toggleTaskList = () => {
    isTaskListOpen.value = !isTaskListOpen.value;
  };

  const updateNowTask = (title: string, priority: string) => {
    nowTask.value = title;
    taskPriority.value = priority;
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
  })
</script>

<template>
  <section class="mainContainer">
    <button class="Btn" @click="toggleTaskList"><img :src="dropdown" alt="dropdownIcon" class="dropdownIcon"></button>
    <div class="taskItem">
      <div class="taskInfo">
        <button class="completedTask Btn"></button>
        <p class="taskText">{{ nowTask }}</p>
      </div>
      <div class="taskPriority" :class="{'unSee' : nowTask == 'EMPTY'}" :style="{'--priorityColor' : priorityColor(taskPriority) }"></div>
    </div>
    <div class="overlay" v-show="isTaskListOpen">
      <button class="Btn taskBtn" @click="updateNowTask('EMPTY', '')">EMPTY</button>
      <div v-for="(item, index) in taskStore.tasks" :key="index">
        <button class="Btn taskBtn" v-show="item.status == 'pending'" @click="updateNowTask(item.title, item.priority)">{{ item.title }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import './focusTask.css';
</style>