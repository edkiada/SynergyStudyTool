// Example: src/stores/taskStore.ts
import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

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
  userId: string;
  note: string[];
}

interface NewTaskInput {
  title: string;
  priority: 'low' | 'medium' | 'high';
  tagText: string;
  tagColor: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/tasks`;

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    isloading: false,
    currentFocusTask: localStorage.getItem('precentFocusTask') || '',
    currentTaskPrioirty: localStorage.getItem('precentTaskPrioirty') || '',
    currentTaskId: localStorage.getItem('precentTaskId') || '',
  }),
  actions: {
    async fetchTasks() {
      try {
        this.isloading = true;
        this.tasks = [];
        const userStore = useUserStore();
        const token = userStore.test?.token || '';
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Connection failed:", error);
      } finally {
        this.isloading = false;
      }
    },
    async saveTask(task: NewTaskInput) {
      try {
        this.isloading = true;
        const userStore = useUserStore();
        const token = userStore.test?.token || '';
        const response = await axios.post(API_URL, task, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tasks.push(response.data); // Add the new task to the local state
      } catch (error) {
        console.error("Failed to save task:", error);
      } finally {
        this.isloading = false;
      }
    },
    async deleteTask(taskId: string) {
      try {
        this.isloading = true;
        await axios.delete(`${API_URL}/${taskId}`);
        if(this.currentTaskId === taskId) {
          this.currentFocusTask = 'EMPTY';
          this.currentTaskPrioirty = 'low';
          this.currentTaskId = '';
          localStorage.setItem('precentFocusTask', 'EMPTY');
          localStorage.setItem('precentTaskPrioirty', 'low');
          localStorage.setItem('precentTaskId', '');
        }
        await this.fetchTasks(); 
      } catch (error) {
        console.error("Failed to delete task:", error);
      } finally {
        this.isloading = false;
      }
    }, 
    async toggleTaskstatus(taskId: string, currentStatus: 'pending' | 'completed') {
      try {
        this.isloading = true;
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
      } finally {
        this.isloading = false;
      }
    }
  }
});