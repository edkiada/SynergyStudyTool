import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

interface AiAnalysisResponse {
  analysis: Record<string, unknown>;
  sourceData: Record<string, unknown>;
  raw: Record<string, unknown>;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/ai-analysis`;

export const useAiAnalysisStore = defineStore('aiAnalysisStore', {
  state: () => ({
    result: null as AiAnalysisResponse | null,
    isLoading: false,
    error: ''
  }),
  actions: {
    async fetchTodayAnalysis() {
      try {
        this.isLoading = true;
        this.error = '';
        const userStore = useUserStore();
        const token = userStore.test?.token || '';
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.result = response.data;
      } catch(error) {
        this.error = 'Failed to fetch AI analysis';
        console.error('Failed to fetch AI analysis:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
