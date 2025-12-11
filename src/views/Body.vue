<script setup lang="ts">
import Header from '../layouts/Header.vue';
import Footer from '../layouts/Footer.vue';
import useConfirm from '@/shared/ui/useConfirm.vue'
</script>

<template>
  <Header/>
  <div class="layout">
    <router-view />
    <useConfirm/>
  </div>
  <Footer/>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #121212;
}
</style>