import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import { accountStore } from '@/store/account';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue'),
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
