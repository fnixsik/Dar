<template>
  <aside 
    class="fixed left-0 top-16 w-72 bg-[#131316] border-r border-[#27272A] z-40 flex flex-col justify-start overflow-y-auto"
    :style="{ height: sidebarHeight }"
  >
    <div class="flex flex-col p-4 space-y-6">
      <!-- Блок КОМАНДА -->
      <div v-if="canAccess(['ROLE_ADMIN'])">
        <span class="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-2 px-2">КОМАНДА</span>
        <nav class="flex flex-col gap-1">
          <router-link
            to="/admin/fighters"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all"
            active-class="!bg-[#B00D15] !text-white font-bold shadow-[0_0_16px_rgba(176,13,21,0.35)]"
          >
            <i class="pi pi-shield text-[18px]"></i>
            <span>Бойцы</span>
          </router-link>
          <router-link
            to="/admin/coache"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all"
            active-class="!bg-[#B00D15] !text-white font-bold shadow-[0_0_16px_rgba(176,13,21,0.35)]"
          >
            <i class="pi pi-user text-[18px]"></i>
            <span>Тренеры</span>
          </router-link>
        </nav>
      </div>

      <!-- Блок КОНТЕНТ -->
      <div v-if="canAccess(['ROLE_ADMIN', 'ROLE_MODERATOR'])">
        <span class="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-2 px-2">КОНТЕНТ</span>
        <nav class="flex flex-col gap-1">
          <router-link
            to="/admin/news"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all"
            active-class="!bg-[#B00D15] !text-white font-bold shadow-[0_0_16px_rgba(176,13,21,0.35)]"
          >
            <i class="pi pi-bell text-[18px]"></i>
            <span>Новости</span>
          </router-link>
          <router-link
            to="/admin/video"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all"
            active-class="!bg-[#B00D15] !text-white font-bold shadow-[0_0_16px_rgba(176,13,21,0.35)]"
          >
            <i class="pi pi-play text-[18px]"></i>
            <span>Видео</span>
          </router-link>
        </nav>
      </div>

      <!-- Блок УПРАВЛЕНИЕ -->
      <div>
        <span class="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-2 px-2">УПРАВЛЕНИЕ</span>
        <nav class="flex flex-col gap-1">
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all">
            <i class="pi pi-users text-[18px]"></i>
            <span>Пользователи</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all">
            <i class="pi pi-credit-card text-[18px]"></i>
            <span>Подписки & Оплаты</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#2a2a2d] hover:text-white font-medium text-sm transition-all">
            <i class="pi pi-cog text-[18px]"></i>
            <span>Настройки</span>
          </a>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/auth/model/authStore'

const userStore = useUserStore()
const sidebarHeight = ref('calc(100vh - 4rem)')

const updateSidebarHeight = () => {
  const footer = document.querySelector('footer')
  if (!footer) {
    sidebarHeight.value = 'calc(100vh - 4rem)'
    return
  }

  const footerRect = footer.getBoundingClientRect()
  const windowHeight = window.innerHeight

  if (footerRect.top < windowHeight) {
    const visibleFooterHeight = windowHeight - footerRect.top
    sidebarHeight.value = `calc(100vh - 4rem - ${visibleFooterHeight}px)`
  } else {
    sidebarHeight.value = 'calc(100vh - 4rem)'
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateSidebarHeight)
  window.addEventListener('resize', updateSidebarHeight)
  updateSidebarHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateSidebarHeight)
  window.removeEventListener('resize', updateSidebarHeight)
})

const canAccess = (allowedRoles: string[]) => {
  if (!userStore.roles) return true
  const userRoles = (Array.isArray(userStore.roles) 
    ? userStore.roles 
    : [userStore.roles]) as string[]
  return allowedRoles.some(r => userRoles.includes(r))
}
</script>