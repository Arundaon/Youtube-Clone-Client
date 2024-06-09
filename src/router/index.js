import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import WatchView from "@/views/WatchView.vue"
import RegisterView from "@/views/RegisterView.vue"
import UploadView from "@/views/UploadView.vue"
import UpdateUserView from "@/views/UpdateUserView.vue"
import { getAuthCookie } from "@/utils/Utils"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // public
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, redirectIfAuth:true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false, redirectIfAuth:true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path:'/search',
      name:'search',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path:'/watch',
      name:'watch',
      component: WatchView,
      meta: { requiresAuth: false }
    }

    // authorized
    ,
    {
      path:'/upload',
      name:'upload',
      component: UploadView,
      meta: { requiresAuth: true }
    },
    {
      path:'/update-user',
      name:'updateUser',
      component: UpdateUserView,
      meta: { requiresAuth: true }
    }


  ]
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && getAuthCookie() == null) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login'
    }
  }
  if(to.meta.redirectIfAuth && getAuthCookie() != null){
    return {
      path:"/"
    }
  }
})

export default router
