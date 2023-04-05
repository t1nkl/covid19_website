<script lang="ts" setup>
import GlobalData from '@/components/GlobalData.vue'
</script>

<template>
  <div class="home">
    <GlobalData />
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 4s ease;
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
