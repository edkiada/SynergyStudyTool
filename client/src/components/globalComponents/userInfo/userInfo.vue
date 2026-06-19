<script setup lang="ts">
  import closeIcon from '../../../assets/icons/close.svg'
  import userIcon from '../../../assets/icons/user.svg'
  import loginIcon from '../../../assets/icons/login.svg'
  import leftArrow from '../../../assets/icons/leftArrow.svg'
  import { ref } from 'vue'
  defineProps({
    open: Boolean
  })

  const emit = defineEmits(['update:open'])
  const ischildPageOpen = ref(false)

  const closeOverlay = () => {
    emit('update:open', false)
  }

  const toggleChildPage = () => {
    ischildPageOpen.value = !ischildPageOpen.value;
  }
</script>

<template>
  <section class="userOverlay">
    <div class="closeContent">
      <button class="closeBtn" type="button" @click="closeOverlay"><img :src="closeIcon" class="closeIcon" alt="closeIcon"></button>
    </div>
    <div class="userContent">
      <img :src="userIcon" alt="userIcon" class="userIcon"/>
      <p>User Name</p>
    </div>
    <div class="loginContent">
      <button class="loginBtn" type="button" @click="toggleChildPage">
        <img :src="loginIcon" alt="loginIcon" class="loginIcon">
        <p class="loginText">Login</p>
      </button>
    </div>
  </section>
  <section class="userOverlay " v-if="ischildPageOpen">
    <div class="closeContent">
      <button class="closeBtn" type="button" @click="toggleChildPage">
        <img :src="leftArrow" class="leftArrow" alt="leftArrow">
        <p>Info</p>
      </button>
    </div>
    <form class="loginContent">
      <div class="userName loginField">
        <label for="userName" class="inputLabel">UserName</label>
        <input 
          type="text"
          id="userName"
          name="userName"
          placeholder="Input UserName..."
          class="inputField"
          required
        />
      </div>
      <div class="password loginField">
        <label for="password" class="inputLabel">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          class="inputField"
        />
      </div>
      <button type="submit" class="submitBtn">Login</button>
    </form>
  </section>
  <div class="overlayBG"></div>
</template>

<style scoped>
  @import './userInfo.css';
</style>