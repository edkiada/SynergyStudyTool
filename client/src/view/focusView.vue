<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useMainStore } from '../stores/mainStore';
  import headerBar from '../components/globalComponents/header/header.vue'
  import navBer from '../components/globalComponents/navBar/navBar.vue'
  import dualTimer from '../components/focusComponents/dualTimer/dualTimer.vue'
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
  </main>
</template>

<style scoped></style>