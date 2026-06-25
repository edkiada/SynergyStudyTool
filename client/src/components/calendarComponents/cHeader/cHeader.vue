<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import userIcon from '../../../assets/icons/user.svg'
  import userInfo from '../../globalComponents/userInfo/userInfo.vue'
  import { useFocusStore } from '../../../stores/focusStore';
  const today = new Date()
  const currentMonth = computed(() => today.getMonth())
  const focusStore = useFocusStore()
  const daylist = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const isOverlayOpen = ref(false)
  const userInfoOpen = ref(false);
  const datelist = ref<number[][]>(
    Array.from({ length: 6}, () => Array.from({ length: 7}, () => 0))
  )
  const notEmpty = ref<boolean[]>(
    Array.from({ length: 6}, () => false)
  )


  const toggleOverlay = () => {
    isOverlayOpen.value = !isOverlayOpen.value;
  }

  const openUserInfo = () => {
    userInfoOpen.value = true;
  }

  const updateSelectDay = (day: number) => {
    if(day === 0) return;
    focusStore.curDay = day.toString();
    localStorage.setItem('day', day.toString());
    isOverlayOpen.value = false;
    focusStore.fetchFocusSessions();
  }

  onMounted(() => {
    localStorage.setItem('selectDay', today.getDate().toString()) 
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const dateNum = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let dayCount = 1;
    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 7; j++) {
        const dateIndex = i * 7 + j;
        if(dateIndex >= firstDay && dayCount <= dateNum) {
          datelist.value[i][j] = dayCount++;
          notEmpty.value[i] = true;
        } else {
          datelist.value[i][j] = 0;
        }
      }
    }
  })
</script>

<template>
  <header>
    <div class="date">
      <h1>Calendar</h1>
      <button type="button" class="currentDateBtn" @click="toggleOverlay"><p>{{ focusStore.curDay }} {{ monthlist[currentMonth] }}</p></button>
    </div>
    <button class="infoBtn" type="button" @click="openUserInfo()"><img :src="userIcon" alt="userIcon" class="userIcon"></button>
    <userInfo v-model:open="userInfoOpen" v-if="userInfoOpen"/>
    <div class="overlay" v-show="isOverlayOpen">
      <p class="monthText">{{ monthlist[currentMonth] }}</p>
      <div class="dateRow">
        <div v-for="d in 7" :key="d"><span class="dateItem" :class="d == 1 || d === 7  ? 'workDay' : 'restDay'">{{ daylist[d - 1] }}</span></div>
      </div>
      <div 
        v-for="(row, rowIndex) in datelist" 
        :key="rowIndex" 
        class="dateRow" 
        v-show="row.some(day => day > 0)"
      >
        <div v-for="(day, colIndex) in row" :key="colIndex" class="dateItem"> 
          <button type="button" class="dateBtn" @click="updateSelectDay(day)"
                  :class="{ 'notCurrentMonth' : day === 0, 
                    'restDay' : colIndex != 0 && colIndex != 6, 
                    'workDay' : colIndex === 0 || colIndex === 6,
                    'selectedDay' : day > 0 && day.toString() === focusStore.curDay
                  }"
          >
          {{ day }}</button>
        </div>
      </div> 
    </div>
  </header>
</template>

<style scoped>
  @import "./cHeader.css";
</style>