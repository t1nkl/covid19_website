<script setup lang="ts">
import { useCountryStore } from '@/stores/useCountryStore'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { CountryHistoricalData } from '@/models/CountryHistoricalData'
import LoaderSimplify from '@/components/animations/LoaderSimplify.vue'
import CountryStatisticsLineChart from '@/components/charts/CountryStatisticsLineChart.vue'

const route = useRoute()
const store = useCountryStore()
const loading = ref(true)

const breadcrumbsItems = [
  {
    title: 'Home',
    disabled: false,
    href: '/'
  },
  {
    title: 'Details',
    disabled: false,
    href: '/details'
  },
  {
    title: (route.params.country_name as string).toUpperCase(),
    disabled: true,
    href: (route.params.country_name as string).toLowerCase()
  }
]
const fetchData = async () => {
  await store.fetchData(route.params.country_name as string, 30)
  loading.value = false
}
const countryHistoricalData = computed<CountryHistoricalData>(() => store.getCountryHistoricalData)

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <v-breadcrumbs :items="breadcrumbsItems" divider=">"></v-breadcrumbs>

  <div
    class="details country-name"
    v-if="Object.keys(countryHistoricalData).length > 0 && !loading"
  >
    <CountryStatisticsLineChart :country-historical-data="countryHistoricalData" />
  </div>
  <div v-else>
    <LoaderSimplify />
  </div>
</template>

<style lang="scss" scoped></style>
