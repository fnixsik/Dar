import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/mainPage/backWall/BackWall.vue')
    },
    {
      path: '/teams',
      name: 'Team',
      component: () => import('../components/teamPage/backWallTeam/BackWallTeam.vue')
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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

