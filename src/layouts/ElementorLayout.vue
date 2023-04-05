<script lang="ts" setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <main class="main">
    <HeaderComponent />

    <RouterView v-slot="{ Component }">
      <transition :name="'slide-fade'" appear mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>

  <FooterComponent />
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-enter-from,
.slide-fade-leave-to {
  filter: blur(8px);
  transform: translateX(10px);
  opacity: 0;
}
</style>
