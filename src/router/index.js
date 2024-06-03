import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import WatchView from "@/views/WatchView.vue"
import RegisterView from "@/views/RegisterView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // public
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/search',
      name:'search',
      component: HomeView
    },
    {
      path:'/watch',
      name:'watch',
      component: WatchView
    }

    // authorized
    ,
    {
      path:'/upload',
      name:'upload',
      component: HomeView
    }


  ]
})

export default router
