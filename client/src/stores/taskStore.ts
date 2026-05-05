// Example: src/stores/taskStore.ts
import axios from 'axios';
import { defineStore } from 'pinia';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  totalFocusedTime: number;
  completedAt?: string;
  note: string[];
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fetchTasks() {
      try {
        // Point this to your actual backend URL
        const response = await axios.get('http://localhost:3001/api/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error("Connection failed:", error);
      }
    }
  }
});