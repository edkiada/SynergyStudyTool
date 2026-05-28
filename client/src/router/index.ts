import { createRouter, createWebHistory } from 'vue-router'
import taskView from '../view/taskView.vue'
import focusView from '../view/focusView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: taskView
  },
  {
    path: '/focus',
    name: 'focus',
    component: focusView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;