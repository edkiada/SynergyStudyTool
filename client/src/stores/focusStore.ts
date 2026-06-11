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

const API_URL = `http://192.168.0.113:3001/api/focusSession`

export const useFocusStore = defineStore('focusStore', {
  state: () => ({
    focusSessions: [] as addFocus[],
    calendarFocus: [] as FocusSession[]
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
            month: 5,
            day: 11
          }
        });
        this.calendarFocus = res.data;
      } catch(error) {
        console.error('Failed to fetch focus sessions:', error);
      }
    }
  }
})