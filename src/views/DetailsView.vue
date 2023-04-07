<script lang="ts" setup>
import CountriesTable from '@/components/tables/CountriesTable.vue'

const breadcrumbsItems = [
  {
    title: 'Home',
    disabled: false,
    href: '/'
  },
  {
    title: 'Details',
    disabled: true,
    href: '/details'
  }
]
</script>

<template>
  <div class="details">
    <v-breadcrumbs :items="breadcrumbsItems" divider=">"></v-breadcrumbs>

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
