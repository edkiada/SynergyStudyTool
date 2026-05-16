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

interface NewTaskInput {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

const API_URL = 'http://localhost:3001/api/tasks';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    newTask: [] as Task[]
  }),
  actions: {
    async fetchTasks() {
      try {
        // Point this to your actual backend URL
        const response = await axios.get(API_URL);
        this.tasks = response.data;
      } catch (error) {
        console.error("Connection failed:", error);
      }
    },
    async saveTask(task: NewTaskInput) {
      try {
        const response = await axios.post(API_URL, task);
        this.tasks.push(response.data); // Add the new task to the local state
      } catch (error) {
        console.error("Failed to save task:", error);
      }
    }   
  }
});