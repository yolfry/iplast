import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import { accountStore } from '@/store/account';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/appHome.vue')
      },
      {
        path: 'novedad',
        component: () => import('@/views/appNovedad.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'doctor',
        component: () => import('@/views/appDoctor.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'mycuenta',
        component: () => import('@/views/appMyCuenta.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/account',
    component: () => import('@/views/ypwAccount.vue'),
    children: [{
      path: '',
      redirect: '/account/login'
    }, {
      path: 'login',
      component: () => import('@/views/ypw/ypwLogin.vue')
    },
    {
      path: 'register',
      component: () => import('@/views/ypw/ypwRegister.vue')
    }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  //Lanzar Store cuando inicie Pinia
  const store = await accountStore()


  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.user.keyUser && store.user.keyUser) {
      next()
    } else {
      next({
        path: '/account/login'
      })
    }
  } else {
    next()
  }

})

export default router
