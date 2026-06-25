<script setup lang="ts">
  import closeIcon from '../../../assets/icons/close.svg'
  import userIcon from '../../../assets/icons/user.svg'
  import loginIcon from '../../../assets/icons/login.svg'
  import leftArrow from '../../../assets/icons/leftArrow.svg'
  import { ref, computed } from 'vue'
  import { useUserStore } from '../../../stores/userStore'
  import { useTaskStore } from '../../../stores/taskStore'
  defineProps({
    open: Boolean
  })

  const emit = defineEmits(['update:open'])
  const ischildPageOpen = ref(false)
  const userStore = useUserStore();
  const taskStore = useTaskStore();
  const username = ref('')
  const password = ref('')
  const isError = ref(false)
  const loginBtn = computed(() => {
    return userStore.test ? 'Logout' : 'Login'
  })
  const closeOverlay = () => {
    emit('update:open', false)
  }

  const toggleChildPage = () => {
    if(loginBtn.value === 'Login') {
      ischildPageOpen.value = !ischildPageOpen.value;
    } else {
      userStore.test = null;
      localStorage.removeItem('userToken')
      localStorage.removeItem('userName')
      localStorage.removeItem('name')
      taskStore.fetchTasks()
    }
  }

  const haddleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    const userLoginData = {
      username: username.value,
      password: password.value
    }
    await userStore.loginUser(userLoginData)
    if(userStore.test){
      localStorage.setItem('userToken', userStore.test.token)
      localStorage.setItem('userName', userStore.test.username)
      localStorage.setItem('name', userStore.test.name)
      taskStore.fetchTasks()
      ischildPageOpen.value = false
    }
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
        <p class="loginText">{{ loginBtn }}</p>
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