// Example: src/stores/taskStore.ts
import axios from 'axios';
import { defineStore } from 'pinia';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  totalFocusedTime: number;
  isSwiped: boolean;
  completedAt?: string;
  tagText: string;
  tagColor: string;
  note: string[];
}

interface NewTaskInput {
  title: string;
  priority: 'low' | 'medium' | 'high';
  tagText: string;
  tagColor: string;
}

const API_URL = 'http://192.168.0.113:3001/api/tasks';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    precentFocusTask: localStorage.getItem('precentFocusTask') || '',
    precentTaskPrioirty: localStorage.getItem('precentTaskPrioirty') || '',
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
    },
    async deleteTask(taskId: string) {
      try {
        await axios.delete(`${API_URL}/${taskId}`);
        localStorage.setItem('precentFocusTask', 'EMPTY');
        localStorage.setItem('precentTaskPrioirty', 'low');
        this.precentFocusTask = localStorage.getItem('precentFocusTask') || '';
        this.precentTaskPrioirty = localStorage.getItem('precentTaskPrioirty') || '';
        await this.fetchTasks(); 
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }, 
    async toggleTaskstatus(taskId: string, currentStatus: 'pending' | 'completed') {
      try {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        
        const task = this.tasks.find(t => t.id === taskId);
        if(task) {
          task.status = newStatus;
          task.completedAt = newStatus === 'completed' ? new Date().toISOString() : undefined;
        }
        await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
        await this.fetchTasks();
      } catch(error) {
        console.error("Failed to toggle task status:", error);
        await this.fetchTasks();
      }
    }
  }
});