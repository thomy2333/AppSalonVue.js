import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import appointmentsLayout from '@/views/appointments/appointmentsLayout.vue'
import AuthAPI from '@/api/AuthAPI.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true},
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: appointmentsLayout,
      meta: { requiresAuth: true},
      children:[
        {
          path : '',
          name: 'my-appointments',
          component: () => import('../views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewappointmentsLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointments',
              component: () => import('../views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'appointments-details',
              component: () => import('../views/appointments/appointmentsView.vue')
            },
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appointments/EditAppLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointments',
              component: () => import('../views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'edit-appointments-details',
              component: () => import('../views/appointments/appointmentsView.vue')
            },
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: '/auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPassView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPassView.vue'),
        },
      ]
    }
  ]
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    try {
      const {data} = await AuthAPI.auth()
      if(data.admin){
        next({name: 'admin'})
      }else{
        next()
      }
    } catch (error) {
      next({name: 'login'})
    }
  }else{
    next()
  }
  
})

router.beforeEach( async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(requiresAdmin){
    try {
      await AuthAPI.admin()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  }else{
    next()
  }
  
})

export default router
