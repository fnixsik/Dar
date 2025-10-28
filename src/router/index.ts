import { createRouter, createWebHistory } from "vue-router";

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
      meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
      children: [
        {
          path: 'fighters',
          // @ts-ignore
          component: () => import('../admin/pages/Fighters.vue'),
        },
        {
          path: 'coache',
          // @ts-ignore
          component: () => import('../admin/pages/Couch.vue'),
        },
        {
          path: 'amateur',
          // @ts-ignore
          component: () => import('../admin/pages/Gtoup.vue'),
        },
        {
          path: '/admin/news',
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

export default router

