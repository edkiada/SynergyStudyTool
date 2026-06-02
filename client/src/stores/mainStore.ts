import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    nowView: 'task',
  }),
  actions: {
    switchView(viewName: string) {
      this.nowView = viewName;
    }
  }
})