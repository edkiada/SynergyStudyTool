<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useMainStore } from '../stores/mainStore';
  import cHeader from '../components/calendarComponents/cHeader/cHeader.vue';
  import NavBar from '../components/globalComponents/navBar/navBar.vue';
  const mainStore = useMainStore();

  onMounted(() => {
    mainStore.nowView = 'calendar';
  });
</script>

<template>
  <cHeader />
  <main>
    <NavBar />
  </main>
</template>

<style scoped></style>