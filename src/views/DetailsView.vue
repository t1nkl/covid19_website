<script lang="ts" setup>
import CountriesTable from '@/components/tables/CountriesTable.vue'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
</script>

<template>
  <div class="details">
    <BreadcrumbsComponent />

    <CountriesTable />
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 2s ease !important;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1) !important;
}
</style>
