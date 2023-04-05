<script lang="ts" setup>
import CountriesTable from '@/components/tables/CountriesTable.vue'
</script>

<template>
  <div class="details">
    <CountriesTable />
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 3s ease;
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
