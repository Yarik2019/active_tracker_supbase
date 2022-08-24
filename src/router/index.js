import { createRouter, createWebHistory } from 'vue-router'
import {supabase} from '../supabase/supabase'
import HomeView from '../views/HomeView.vue';
import CreateView from '@/views/CreateView';
import LoginView from '@/views/LoginView';
import RegisterView from '@/views/RegisterView';
import WorkoutView from '@/views/WorkoutView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"Home",
      auth: false,
    }
  },
  {
    path: '/create',
    name: 'create',
    component:CreateView,
    meta:{
      title:"Create",
      auth: true,
    }
  },
  {
    path: '/workout-view/:workoutId',
    name: 'workout-view',
    component: WorkoutView,
    meta:{
      title:"View Workout",
      auth: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView,
    meta:{
      title: "Login",
      auth: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component:RegisterView,
    meta:{
      title:"Register",
      auth: false,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//  Change document titles

router.beforeEach((to, from, next)=>{
  document.title = `${to.meta.title} | Active Tracker`;
  next();
})
// Route guard for auth routes

router.beforeEach((to, from, next)=>{
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
})

export default router
