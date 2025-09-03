<script setup lang="ts">
import Header from '../layouts/Header.vue';
import Footer from '../layouts/Footer.vue';
</script>

<template>
  <Header/>
  <div class="layout">
    <router-view />
  </div>
  <Footer/>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
</style>