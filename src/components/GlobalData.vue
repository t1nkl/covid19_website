<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { GlobalData } from '@/models/GlobalData'
import { useGlobalDataStore } from '@/stores/useGlobalDataStore'
import LoaderSimplify from '@/components/animations/LoaderSimplify.vue'

const store = useGlobalDataStore()
const loading = ref(true)

const fetchData = async () => {
  await store.fetchData()
  loading.value = false
}
const globalDataTotal = computed<GlobalData>(() => store.getGlobalData)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="global-data">
    <h1>World</h1>
    <br />
    <div v-if="Object.keys(globalDataTotal).length > 0 && !loading">
      <p>
        Date:
        {{
          new Date(globalDataTotal.updated).toLocaleString().replace(',', '').split(' ')[1] +
          ' ' +
          new Date(globalDataTotal.updated).toLocaleString().split(',')[0].replace(/\//g, '-')
        }}
      </p>
      <p>Confirmed Cases: {{ globalDataTotal.todayCases.toLocaleString() }}</p>
      <p>Recovered: {{ globalDataTotal.todayRecovered.toLocaleString() }}</p>
      <p>Deaths: {{ globalDataTotal.todayDeaths.toLocaleString() }}</p>
      <br />
      <p>Total Confirmed Cases: {{ globalDataTotal.cases.toLocaleString() }}</p>
      <p>Total Recovered: {{ globalDataTotal.recovered.toLocaleString() }}</p>
      <p>Total Deaths: {{ globalDataTotal.deaths.toLocaleString() }}...</p>
      <br />
      <RouterLink to="/details">more details</RouterLink>
    </div>
    <div v-else>
      <LoaderSimplify />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.global-data {
  max-width: 350px;
  margin: 10rem auto;
  padding: 2rem;
  font-weight: normal;

  a,
  .green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }

  @media (hover: hover) {
    a:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }

  @media (min-width: 1024px) {
    body {
      display: flex;
      place-items: center;
    }

    .global-data {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 2rem;
    }
  }
}
</style>
