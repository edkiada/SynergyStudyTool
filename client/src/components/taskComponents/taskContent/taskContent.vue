<script setup lang="ts">
  import { useTaskStore } from '../../../stores/taskStore';
  import { useMainStore } from '../../../stores/mainStore';
  import { useUserStore } from '../../../stores/userStore';
  import { onMounted } from 'vue';
  import clock from "../../../assets/icons/clock.svg"
  import tick from "../../../assets/icons/tick.svg"
  const dataStore = useTaskStore();
  const mainStore = useMainStore();
  const userStore = useUserStore();

  onMounted(() => {
    dataStore.fetchTasks();
  })

  let touchStartX = 0;

  const priorityColorClass = (priority : String) => {
    if (priority === 'high') {
      return 'redPriority';
    } else if (priority === 'medium') {
      return 'yellowPriority';
    } else {
      return 'greenPriority';
    }
  }
  
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  }

  const handleTouchEnd = (event: TouchEvent, item: any) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      item.isSwiped = true;
    } else if (deltaX < -50) {
      item.isSwiped = false;
    }
  }

  const deleteTask = (item: any) => {
    dataStore.deleteTask(item.id);
    item.isSwiped = false;
  }

  const startFocus = (item: any) => {
    mainStore.nowView = 'focus';
    localStorage.setItem('precentFocusTask', item.title);
    localStorage.setItem('precentTaskPrioirty', item.priority);
    localStorage.setItem('precentFocusTaskId', item.id);
    dataStore.currentFocusTask = item.title;
    dataStore.currentTaskPrioirty = item.priority;
    dataStore.currentTaskId = item.id;
  }
</script>

<template>
  <section class="taskContent">
    <div class="hint" v-if="dataStore.isloading">
      <h2>Loading...</h2>
    </div>
    <div class="hint" v-else-if="!userStore.test">
      <h2>Login to continue</h2>
    </div>
    <div class="hint" v-else-if="dataStore.tasks.length === 0">
      <h2>Loading...</h2>
    </div>
    <template v-else>
      <div v-for="(item, index) in dataStore.tasks" :key="index" class="temp">
        <div class="taskItem" :class="{ 'swipped' : item.isSwiped }"@touchstart="handleTouchStart($event)" @touchend="handleTouchEnd($event, item)">
          <div class="task">
            <button type="button" class="checkBtn" @click="dataStore.toggleTaskstatus(item.id, item.status)" :class="{ 'checkBtnCompleted' : item.status === 'completed' }"><img :src="tick" v-if="item.status === 'completed'"></button>
            <div class="taskText" :class="{ 'taskCompleted' : item.status === 'completed' }" >
              <p>{{ item.title }}</p>
              <div class="taskLabel">
                <p class="itemPriority" :class="priorityColorClass(item.priority)">{{ item.priority }}</p>
                <p class="itemTag" v-if="item.tagText" :style="{ color : `var(${item.tagColor})`, '--tagColor': `var(${item.tagColor})`}">{{ item.tagText }}</p>
              </div>
            </div>
          </div>
          <div class="focusBtnItem" :class="{ 'focusBtnCompleted' : item.status === 'completed' }" >
            <RouterLink to="/focus">
              <button type="button" class="focusBtn" @click="startFocus(item)"><img :src="clock"></button>
            </RouterLink>
            <p class="focusText">start</p>
          </div>
        </div>
        <div class="deleteBtnItem">
          <button type="button" class="deleteBtn" @touchstart.stop @click.stop="deleteTask(item)">Delete</button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
  @import "./taskContent.css";
</style>