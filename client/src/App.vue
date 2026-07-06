<script setup lang="ts">
  import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
  import mainView from './view/desktopView.vue'
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isDesktop = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div v-if="isDesktop">
    <mainView />
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>
