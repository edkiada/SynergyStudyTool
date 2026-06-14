import axios from 'axios';
import { defineStore } from 'pinia';

interface FocusSession {
  id: string;
  startTime: Date;
  duration: number;
  source: {
    type: string;
    refId?: string;
    onModel?: string;
  }
}

interface addFocus {
  startTime: Date;
  duration: number;
  source: {
    type: string;
    refId?: string;
    onModel?: string;
  }
}

const API_URL = `http://192.168.1.177:3001/api/focusSession`

export const useFocusStore = defineStore('focusStore', {
  state: () => ({
    focusSessions: [] as addFocus[],
    calendarFocus: [] as FocusSession[],
    curDay: localStorage.getItem('day') || new Date(Date.now()).getDate(),
    curMonth: localStorage.getItem('month') || new Date(Date.now()).getMonth()
  }),
  actions: {
    async saveFocusSessions(focus: addFocus) {
      try {
        const res = await axios.post(API_URL, focus);
        console.log('Focus session saved:', res.data);
      } catch(error) {
        console.error('Failed to save focus session:', error);
      }
    },
    async fetchFocusSessions() {
      try {
        const res = await axios.get(`${API_URL}/calendar`, {
          params: {
            year: 2026,
            month: this.curMonth,
            day: this.curDay
          }
        });
        this.calendarFocus = res.data;
      } catch(error) {
        console.error('Failed to fetch focus sessions:', error);
      }
    }
  }
})