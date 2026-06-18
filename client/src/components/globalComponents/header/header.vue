<script setup lang="ts">
  import { computed, ref } from 'vue';
  import userIcon from '../../../assets/icons/user.svg'
  import userInfo from '../userInfo/userInfo.vue'
  const today = new Date()
  const userInfoOpen = ref(false);
  const updateDate = computed(() => {
    return today.toLocaleDateString('en-MG', {
      day: 'numeric',
      month: 'short'
    })
  })

  const openUserInfo = () => {
    userInfoOpen.value = true;
  }
</script>

<template>
  <header>
    <div class="date">
      <h1>Today</h1>
      <h2>{{ updateDate }}</h2>
    </div>
    <button class="infoBtn" type="button" @click="openUserInfo()"><img :src="userIcon" alt="userIcon" class="userIcon"></button>
    <userInfo v-model:open="userInfoOpen" v-if="userInfoOpen"/>
  </header>
</template>

<style scoped>
  @import "./header.css";
</style>