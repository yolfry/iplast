import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import { useAccountStore } from '@/store/account';
import { useAppStore } from '@/store/app';


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
    },
    {
      path: 'passwordRecovery',
      name: 'passwordRecovery',
      component: () => import('@/views/ypw/ypwPasswordRecovery.vue'),
    },
    {
      path: 'newPassword',
      name: 'newPassword',
      component: () => import('@/views/ypw/newPassword.vue'),
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
  const account = await useAccountStore()


  //Loading Data Account
  const appStore = await useAppStore()

  const user = await appStore.getDataApp('user')

  if (user && !account.user.appConnect && !account.user.keyUser) {
    account.user = user
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (account.user.keyUser && account.user.keyUser) {
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
