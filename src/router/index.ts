import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/mainPage/backWall/BackWall.vue')
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
      path: '/admin',
      name: 'admin',
      component: () => import('../admin/layouts/adminPanel.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

