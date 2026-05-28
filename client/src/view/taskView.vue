<script setup lang="ts">
  import { useTaskStore } from '../stores/taskStore'
  import { onMounted } from 'vue'
  import headerBar from '../components/header/header.vue'
  import navBer from '../components/navBar/navBar.vue'
  import taskContent from '../components/taskContent/taskContent.vue'
  import addTask from '../components/addTask/addTask.vue'
  const taskStore = useTaskStore()

  onMounted(() => {
    taskStore.fetchTasks()
  })
</script>

<template>
  <headerBar />
  <main>
    <navBer />
    <taskContent />
    <addTask />
  </main>
</template>

<style scoped></style>