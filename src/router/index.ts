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
      // {
      //   path: 'doctor',
      //   component: () => import('@/views/appDoctor.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      {
        path: 'sLD',
        name: 'sLD',
        component: () => import('@/views/sLD.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'fYD',
        name: 'fYD',
        component: () => import('@/views/fYD.vue'),
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
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/ypwLogin.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/ypwRegister.vue')
      },
      {
        path: 'passwordRecovery',
        name: 'passwordRecovery',
        component: () => import('@/views/login/ypwPasswordRecovery.vue'),
      },
      {
        path: 'newPassword',
        name: 'newPassword',
        component: () => import('@/views/login/newPassword.vue'),
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/account/appConfig.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: () => import('@/views/account/changePassword.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tabs/home'
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
    account.userAll = await appStore.getDataApp('userAll')
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (account.user.keyUser && account.user.keyUser) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }

})

export default router
