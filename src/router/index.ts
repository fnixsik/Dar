import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/auth/model/authStore";
import { showError } from '@/shared/lib/toastService'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/mainPage/backWall/BackWall.vue'),
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: () => import('@/components/mainPage/backWall/BackWall.vue'),
        modal: () => import('@/auth/pages/Auth.vue'),
      },
      props: { modal: { mode: 'login' } },
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: () => import('@/components/mainPage/backWall/BackWall.vue'),
        modal: () => import('@/auth/pages/Register.vue'),
      },
      props: { modal: { mode: 'register' } },
    },
    {
      path: '/teams',
      redirect: '/teams/fighters',
      name: 'Team',
      component: () => import('../components/teamPage/backWallTeam/BackWallTeam.vue'),
      children: [
        {
          path: 'coaches',
          component: () => import('../components/teamPage/mainTeam/BlockCoaches.vue'),
        },
        {
          path: 'fighters',
          component: () => import('../components/teamPage/mainTeam/BlockFighters.vue'),
        },
        {
          path: 'fan',
          component: () => import('../components/teamPage/mainTeam/BlockFan.vue'),
        }
      ]
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('../components/newsPage/backWallNews/BackWallNews.vue')
    },
    {
      path: '/outside',
      name: 'Outside',
      component: () => import('../components/outsideWindowPage/backWallOutsideWindow/BackWallOutsideWindow.vue')
    },
    {
      path: '/branch',
      name: 'Branch',
      component: () => import('../components/branchPage/backWallBranch/BackWallBranch.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../components/aboutUsPage/backWallAbout/BackWallAbout.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../auth/pages/Auth.vue')
    },
    {
      path: '/admin',
      name: 'Wall',
      component: () => import('../admin/pages/Wall.vue'),
      redirect: '/admin/fighters',
      children: [
        {
          path: 'fighters',
          meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
          // @ts-ignore
          component: () => import('../admin/pages/Fighters.vue'),
        },
        {
          path: 'coache',
          meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
          // @ts-ignore
          component: () => import('../admin/pages/Couch.vue'),
        },
        {
          path: 'amateur',
          meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
          // @ts-ignore
          component: () => import('../admin/pages/Gtoup.vue'),
        },
        {
          path: 'news',
          meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
          // @ts-ignore
          component: () => import('../admin/pages/New.vue')
        },
      ]
    },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to: any, _from: any, next) => {
const userStore = useUserStore()
const isAuthenticated = !!userStore.token
const userRoles = userStore.roles as string[] || []

if(to.meta.requiresAuth && !isAuthenticated){
  showError("Для доступа нужно войти в систему")
  return next("/")
}

if(to.meta.roles && !to.meta.roles.some((role: any) => userRoles.includes(role))){
  showError("Недостаточно прав для доступа")
  return next("/")
}

next()
})

export default router

