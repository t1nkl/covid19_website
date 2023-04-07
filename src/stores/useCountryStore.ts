import { defineStore } from 'pinia'
import { apiClient } from '@/modules/ApiClient'
import type { CountryHistoricalData } from '@/models/CountryHistoricalData'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countryHistoricalData: {} as CountryHistoricalData
  }),
  actions: {
    async fetchData(countryName: string, lastDays: number) {
      try {
        this.countryHistoricalData = await apiClient().fetchCountryHistoricalData(
          countryName,
          lastDays
        )
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getCountryHistoricalData: (state) => state.countryHistoricalData
  }
})
