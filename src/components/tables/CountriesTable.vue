<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Country } from '@/models/Country'
import { useCountriesStore } from '@/stores/useCountriesStore'
import LoaderSimplify from '@/components/animations/LoaderSimplify.vue'

const store = useCountriesStore()
const loading = ref(true)
const search = ref('')
const countriesTableHeaders = [
  {
    title: 'Country',
    align: 'center',
    key: 'country',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Cases',
    align: 'center',
    key: 'cases',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Active',
    align: 'center',
    key: 'active',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Recovered',
    align: 'center',
    key: 'recovered',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Critical',
    align: 'center',
    key: 'critical',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Deaths',
    align: 'center',
    key: 'deaths',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Tests',
    align: 'center',
    key: 'tests',
    class: 'text-center text-uppercase',
    sortable: true
  },
  {
    title: 'Cases/Million',
    align: 'center',
    key: 'casesPerOneMillion',
    class: 'text-center text-uppercase'
  },
  {
    title: 'Deaths/Million',
    align: 'center',
    key: 'deathsPerOneMillion',
    class: 'text-center text-uppercase'
  },
  {
    title: 'Tests/Million',
    align: 'center',
    key: 'testsPerOneMillion',
    class: 'text-center text-uppercase'
  }
]

const fetchData = async () => {
  await store.fetchData()
  loading.value = false
}
const countriesData = computed<Country[]>(() => store.getCountriesData)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="countries-table" v-if="countriesData.length > 0 && !loading">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="countriesTableHeaders"
      :items="countriesData"
      :loading="loading"
      :search="search"
      :items-per-page="300"
      theme="dark"
      height="800"
      item-key="country.country"
      class="elevation-1"
      hide-default-footer
      disable-pagination
      fixed-header
      hover
    >
      <!-- Country -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.country="{ item }">
        <v-row align="center" justify="center">
          <v-avatar size="20">
            <v-img
              :alt="item.raw.country"
              :src="item.raw.countryInfo.flag"
              lazy-src="@/assets/image/lazy.jpeg"
              v-if="item.raw.countryInfo.flag"
            ></v-img>
            <v-icon dark v-else>mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <div class="mx-2"></div>
          <strong class="title">
            <RouterLink class="link" :to="'/details/' + item.raw.country.toLowerCase()">{{
              item.raw.country
            }}</RouterLink>
          </strong>
        </v-row>
      </template>

      <!-- Cases -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.cases="{ item }">
        {{ parseFloat(item.raw.cases).toLocaleString('ru') }}
        <v-chip class="ma-2" color="red" small text-color="white" v-if="item.raw.todayCases > 0">
          + {{ item.raw.todayCases }}
        </v-chip>
        <v-chip class="ma-2" color="lime" small text-color="black" v-else> 0 </v-chip>
      </template>

      <!-- Active -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.active="{ item }">
        {{ parseFloat(item.raw.active).toLocaleString() }}
      </template>

      <!-- Recovered -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.recovered="{ item }">
        {{ parseFloat(item.raw.recovered).toLocaleString() }}
      </template>

      <!-- Deaths -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.deaths="{ item }">
        {{ parseFloat(item.raw.deaths).toLocaleString() }}
      </template>

      <!-- Tests -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.tests="{ item }">
        {{ parseFloat(item.raw.tests).toLocaleString() }}
      </template>
    </v-data-table>
  </div>
  <div v-else>
    <LoaderSimplify />
  </div>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: white;
  cursor: pointer;
}
</style>
