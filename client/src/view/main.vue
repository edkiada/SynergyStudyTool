<script setup lang="ts">
  import { useTaskStore } from '../stores/taskStore'
  import { onMounted } from 'vue'
  import headerBar from '../components/header/header.vue'
  const taskStore = useTaskStore()

  onMounted(() => {
    taskStore.fetchTasks()
  })
</script>

<template>
  <headerBar />
</template>

<style scoped></style>