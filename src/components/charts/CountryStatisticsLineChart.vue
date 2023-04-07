<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { CountryHistoricalData } from '@/models/CountryHistoricalData'

const props = defineProps({
  countryHistoricalData: {
    type: Object as PropType<CountryHistoricalData>,
    default: () => {}
  }
})

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
    title: props.countryHistoricalData?.country,
    disabled: true,
    href: props.countryHistoricalData?.country.toLowerCase()
  }
]

const chartLineSeries = [
  {
    name: 'cases',
    data: Object.values(props.countryHistoricalData?.timeline?.cases || [])
  }
]
const chartLineOptions = {
  colors: ['hsla(160, 100%, 37%, 1)'],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    y: {
      formatter: function (value: { toLocaleString: () => any }): any {
        return value.toLocaleString()
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 5
  },
  title: {
    text: props.countryHistoricalData?.country,
    align: 'center',
    style: {
      fontSize: '25px',
      fontWeight: 'bold',
      color: '#ffffff'
    }
  },
  grid: {},
  xaxis: {
    categories: Object.keys(props.countryHistoricalData?.timeline?.cases || [])
  }
}
</script>

<template>
  <div id="charts">
    <v-breadcrumbs :items="breadcrumbsItems" divider=">"></v-breadcrumbs>

    <div id="chart-line2">
      <apexchart
        type="line"
        height="350"
        :options="chartLineOptions"
        :series="chartLineSeries"
      ></apexchart>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
