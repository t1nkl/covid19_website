import { defineStore } from 'pinia'
import { apiClient } from '@/modules/ApiClient'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countryHistory: {}
  }),
  actions: {
    async fetchCountryHistoricalData(countryName: string, lastDays: number | 30) {
      try {
        this.countryHistory = await apiClient().fetchCountryHistoricalData(countryName, lastDays)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getCountryHistoricalData: (state) => state.countryHistory
  }
})
