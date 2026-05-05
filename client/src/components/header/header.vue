<script setup lang="ts">
  import { computed } from 'vue';
  import userIcon from '../../assets/icons/user.svg'
  const today = new Date()
  const updateDate = computed(() => {
    return today.toLocaleDateString('en-MG', {
      day: 'numeric',
      month: 'short'
    })
  })
</script>

<template>
  <header>
    <div class="date">
      <h1>Today</h1>
      <h2>{{ updateDate }}</h2>
    </div>
    <img :src="userIcon" alt="userIcon" class="userIcon">
  </header>
</template>

<style scoped>
  @import "./header.css";
</style>