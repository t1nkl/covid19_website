import { defineStore } from 'pinia'
import type { Country } from '@/models/Country'
import { apiClient } from '@/modules/ApiClient'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: {} as Country[]
  }),
  actions: {
    async fetchData() {
      try {
        this.countries = await apiClient().fetchCountriesData()
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getCountriesData: (state) => state.countries,
    findCountryByName: (state) => (countryName: string) => {
      return state.countries.find((country) => country.country === countryName)
    }
  }
})
