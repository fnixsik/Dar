<script setup lang="ts">
import Header from '../layouts/Header.vue';
import Footer from '../layouts/Footer.vue';
import useConfirm from '@/shared/ui/useConfirm.vue'
</script>

<template>
  <div class="body">    
    <Header/>
    <div class="layout">
      <router-view />
      <useConfirm/>
    </div>
    <Footer/>
  </div>
</template>
