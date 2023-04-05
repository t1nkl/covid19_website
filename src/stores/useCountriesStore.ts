import { defineStore } from 'pinia'
import type { Country } from '@/models/Country'
import { fetchCountriesData } from '@/api/CoronaNinjaApi'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: {} as Country[],
    countriesTableHeaders: [
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
  }),
  actions: {
    async fetchData() {
      try {
        this.countries = await fetchCountriesData()
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getCountriesData: (state) => state.countries,
    getCountriesTableHeaders: (state) => state.countriesTableHeaders
  }
})
