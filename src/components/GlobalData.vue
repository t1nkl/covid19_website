<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { GlobalData } from '@/models/GlobalData'
import { useGlobalDataStore } from '@/stores/useGlobalDataStore'

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
      <p>Date: {{ globalDataTotal.updated }}</p>
      <p>Today Confirmed Cases: {{ globalDataTotal.todayCases }}</p>
      <p>Today Recovered: {{ globalDataTotal.todayRecovered }}</p>
      <p>Today Deaths: {{ globalDataTotal.todayDeaths }}</p>
      <br />
      <p>Total Confirmed Cases: {{ globalDataTotal.cases }}</p>
      <p>Total Recovered: {{ globalDataTotal.recovered }}</p>
      <p>Total Deaths: {{ globalDataTotal.deaths }}...</p>
      <br />
      <RouterLink to="/details">details</RouterLink>
    </div>
    <div v-else>
      <p>
        Loading<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.global-data {
  max-width: 350px;
  margin: 10rem auto;
  padding: 2rem;
  font-weight: normal;

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
  .dot-1 {
    animation: blink 1s infinite;
    animation-delay: 1s;
  }
  .dot-2 {
    animation: blink 2s infinite;
    animation-delay: 2s;
  }
  .dot-3 {
    animation: blink 4s infinite;
    animation-delay: 4s;
  }

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
