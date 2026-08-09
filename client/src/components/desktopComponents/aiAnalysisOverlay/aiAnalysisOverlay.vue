<script setup lang="ts">
  import { computed } from 'vue';
  import { useAiAnalysisStore } from '../../../stores/aiAnalysisStore';

  defineProps({
    open: Boolean
  })

  const emit = defineEmits(['update:open'])
  const aiAnalysisStore = useAiAnalysisStore()

  const analysis = computed(() => aiAnalysisStore.result?.analysis as any)
  const metrics = computed(() => analysis.value?.metrics)

  const closeOverlay = () => {
    emit('update:open', false)
  }
</script>

<template>
  <Teleport to="body">
    <div class="AIOverlayBG" v-if="open" @click="closeOverlay">
      <section class="AIOverlay" @click.stop>
        <div class="AIOverlayHeader">
          <div class="AITitle">
            <svg class="AIIcon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.5L13.9 8.2L19 10L13.9 11.8L12 16.5L10.1 11.8L5 10L10.1 8.2L12 3.5Z" />
              <path d="M18 15L18.8 17L21 17.8L18.8 18.6L18 20.5L17.2 18.6L15 17.8L17.2 17L18 15Z" />
            </svg>
            <div>
              <h2>AI summary</h2>
              <p>Today analysis</p>
            </div>
          </div>
          <button class="AICloseBtn" type="button" @click="closeOverlay">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div class="AIOverlayBody" v-if="aiAnalysisStore.isLoading">
          <p class="AIStatusText">Analyzing...</p>
        </div>
        <div class="AIOverlayBody" v-else-if="aiAnalysisStore.error">
          <p class="AIErrorText">{{ aiAnalysisStore.error }}</p>
        </div>
        <div class="AIOverlayBody" v-else-if="analysis">
          <h3>{{ analysis.headline }}</h3>
          <p>{{ analysis.summary }}</p>

          <div class="AIMetricGrid" v-if="metrics">
            <div class="AIMetricItem">
              <span>{{ metrics.completedTaskCount }}</span>
              <p>Completed</p>
            </div>
            <div class="AIMetricItem">
              <span>{{ metrics.createdTaskCount }}</span>
              <p>Created</p>
            </div>
            <div class="AIMetricItem">
              <span>{{ metrics.focusMinutes }}</span>
              <p>Focus min</p>
            </div>
          </div>

          <div class="AIListBlock" v-if="Array.isArray(analysis.wins)">
            <h4>Wins</h4>
            <ul>
              <li v-for="(item, index) in analysis.wins" :key="`win-${index}`">{{ item }}</li>
            </ul>
          </div>
          <div class="AIListBlock" v-if="Array.isArray(analysis.risks)">
            <h4>Risks</h4>
            <ul>
              <li v-for="(item, index) in analysis.risks" :key="`risk-${index}`">{{ item }}</li>
            </ul>
          </div>
          <div class="AIListBlock" v-if="Array.isArray(analysis.suggestions)">
            <h4>Suggestions</h4>
            <ul>
              <li v-for="(item, index) in analysis.suggestions" :key="`suggestion-${index}`">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
  @import './aiAnalysisOverlay.css';
</style>
