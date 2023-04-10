<script setup lang="ts">
import { useCountryStore } from '@/stores/useCountryStore'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { CountryHistoricalData } from '@/models/CountryHistoricalData'
import LoaderSimplify from '@/components/animations/LoaderSimplify.vue'
import CountryStatisticsLineChart from '@/components/charts/CountryStatisticsLineChart.vue'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'

const loading = ref(true)
const route = useRoute()
const store = useCountryStore()
const historyDays = 30

const fetchData = async () => {
  await store.fetchData(route.params.country_name as string, historyDays)
  loading.value = false
}
const countryHistoricalData = computed<CountryHistoricalData>(() => store.getCountryHistoricalData)

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="country-details">
    <BreadcrumbsComponent />

    <div
      class="details country-name"
      v-if="Object.keys(countryHistoricalData).length > 0 && !loading"
    >
      <CountryStatisticsLineChart
        :country-historical-data="countryHistoricalData"
        :history-days="historyDays"
      />
    </div>
    <div v-else>
      <LoaderSimplify />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
