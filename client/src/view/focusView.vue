<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useMainStore } from '../stores/mainStore'
  import headerBar from '../components/globalComponents/header/header.vue'
  import navBer from '../components/globalComponents/navBar/navBar.vue'
  import dualTimer from '../components/focusComponents/dualTimer/dualTimer.vue'
  import focusTask from '../components/focusComponents/focusTask/focusTask.vue'
  const mainStore = useMainStore()

  onMounted(() => {
    mainStore.nowView = 'focus'
  })
</script>

<template>
  <headerBar />
  <main>
    <navBer />
    <dualTimer />
    <focusTask />
  </main>
</template>

<style scoped></style>