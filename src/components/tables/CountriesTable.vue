<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Country } from '@/models/Country'
import { useCountriesStore } from '@/stores/useCountriesStore'
import LoaderSimplify from '@/components/animations/LoaderSimplify.vue'

const store = useCountriesStore()
const loading = ref(true)
const search = ref('')

const fetchData = async () => {
  await store.fetchData()
  loading.value = false
}
const countriesData = computed<Country[]>(() => store.getCountriesData)

const sortBy = [{ key: 'cases', order: 'desc' }]

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
      v-model:sort-by="sortBy"
      :headers="store.getCountriesTableHeaders"
      :items="countriesData"
      :loading="loading"
      :search="search"
      :items-per-page="300"
      theme="dark"
      height="800"
      item-key="country.country"
      class="elevation-1"
      disable-pagination
      fixed-header
      hide-default-footer
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
          <strong class="title">{{ item.raw.country }}</strong>
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

      <!-- Recovered -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.recovered="{ item }">
        {{ parseFloat(item.raw.recovered).toLocaleString('ru') }}
      </template>

      <!-- Deaths -->
      <!-- eslint-disable-next-line-->
      <template v-slot:item.deaths="{ item }">
        {{ parseFloat(item.raw.deaths).toLocaleString('ru') }}
      </template>
    </v-data-table>
  </div>
  <div v-else>
    <LoaderSimplify />
  </div>
</template>

<style lang="scss" scoped></style>
