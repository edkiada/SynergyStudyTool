<script setup lang="ts">
  import closeIcon from '../../../assets/icons/close.svg'
  import userIcon from '../../../assets/icons/user.svg'
  import loginIcon from '../../../assets/icons/login.svg'
  import leftArrow from '../../../assets/icons/leftArrow.svg'
  import { ref } from 'vue'
  import { useUserStore } from '../../../stores/userStore'
  defineProps({
    open: Boolean
  })

  const emit = defineEmits(['update:open'])
  const ischildPageOpen = ref(false)
  const userStore = useUserStore();
  const username = ref('')
  const password = ref('')
  const isError = ref(false)
  const closeOverlay = () => {
    emit('update:open', false)
  }

  const toggleChildPage = () => {
    ischildPageOpen.value = !ischildPageOpen.value;
  }

  const haddleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    const userLoginData = {
      username: username.value,
      password: password.value
    }
    await userStore.loginUser(userLoginData)
    if(userStore.test) toggleChildPage()
    else {
      isError.value = true;
    }
  }

  const typing = () => {
    isError.value = false;
  }
</script>

<template>
  <section class="userOverlay">
    <div class="closeContent">
      <button class="closeBtn" type="button" @click="closeOverlay"><img :src="closeIcon" class="closeIcon" alt="closeIcon"></button>
    </div>
    <div class="userContent">
      <img :src="userIcon" alt="userIcon" class="userIcon"/>
      <p v-if="userStore.test !== null">{{ userStore.test.name }}</p>
      <p v-else>UserName</p>
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
    <form class="loginContent" @submit.prevent="haddleSubmit">
      <div class="userName loginField" :class="{'errorShake' : isError}">
        <label for="userName" class="inputLabel">Username</label>
        <input 
          type="text"
          id="userName"
          name="username"
          v-model="username"
          placeholder="Input UserName..."
          class="inputField"
          required
          :class="{'isError' : isError}"
          @click="typing"
        />
      </div>
      <div class="password loginField" :class="{'errorShake' : isError}">
        <label for="password" class="inputLabel">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
          class="inputField"
          :class="{'isError' : isError}"
          @click="typing"
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