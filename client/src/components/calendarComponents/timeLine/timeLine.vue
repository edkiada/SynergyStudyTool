<script setup lang="ts">
  import { useFocusStore } from '../../../stores/focusStore';
  import { useTaskStore } from '../../../stores/taskStore';
  import { computed, onMounted } from 'vue';
  const focusStore = useFocusStore()
  const taskStore = useTaskStore()

  const formatFocusSessions = computed(() => {
    const sessions = focusStore.calendarFocus;
    const HOUR_HEIGHT = 80;
    const START_HOUR = 6;
    
    return sessions.map(session => {
      const startTime = new Date(session.startTime);
      const startHour = startTime.getHours();
      const startMinute = startTime.getMinutes();

      const minutesFromStart = (startHour - START_HOUR) * 60 + startMinute;
      const topPosition = (minutesFromStart / 60) * HOUR_HEIGHT;
      const blockHeight = (session.duration / 3600) * HOUR_HEIGHT;
      const show = true ? session.duration >= 600 : false;
      const showText = true ? session.duration >= 1500 : false;
      const matchingTask = taskStore.tasks.find(task => task.id === session.source.refId);
      const durationTime = session.duration >= 3600 ? `${Math.floor(session.duration / 3600)}h ${Math.floor((session.duration % 3600) / 60)}m` : `${Math.ceil(session.duration / 60)}m`;
      return {
        ...session,
        top: `${topPosition}px`,
        height: `${blockHeight}px`,
        isShow: show,
        isShowText: showText,
        durationTime: durationTime.toString(),
        title: matchingTask ? matchingTask.title : '',
        color: matchingTask ? matchingTask.tagColor : '--lightBlock'
      }
    })
  })

  onMounted(() => {
    focusStore.fetchFocusSessions()
    taskStore.fetchTasks()
  })

</script>

<template>
  <section>
    <div class="timeContainer">
      <div v-for="time in 18" :key="time" class="timeItem">
        <p class="timeText">{{ time + 5 }} : 00</p>
        <div class="test"></div>
      </div>
      <div class="timeLineContent">
        <div v-for="session in formatFocusSessions" :key="session.id" class="sessionBlock" v-show="session.isShow" :style="{'top': session.top, 'height': session.height, '--sessionColor': `var(${session.color}Light)`, '--sessionFakeElementColor': `var(${session.color})` }">
          <p class="sessionText" v-show="session.isShowText">{{ session.title }}</p>
          <p class="sessionText" v-show="session.isShowText">{{ session.durationTime }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import './timeLine.css'
</style>