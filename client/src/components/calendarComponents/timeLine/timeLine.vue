<script setup lang="ts">
  import { useFocusStore } from '../../../stores/focusStore';
  import { computed, onMounted } from 'vue';
  const focusStore = useFocusStore()

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
      return {
        ...session,
        top: `${topPosition}px`,
        height: `${blockHeight}px`,
        isShow: show,
        isShowText: showText
      }
    })
  })

  onMounted(() => {
    focusStore.fetchFocusSessions()
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
        <div v-for="session in formatFocusSessions" :key="session.id" class="sessionBlock" v-show="session.isShow" :style="{'top': session.top, 'height': session.height}">
          <p class="sessionText" v-show="session.isShowText">{{ session.source.taskName }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @import './timeLine.css'
</style>