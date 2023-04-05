import { defineStore } from 'pinia'
import type { GlobalData } from '@/models/GlobalData'
import { fetchGlobalData } from '@/api/CoronaNinjaApi'

export const useGlobalDataStore = defineStore('global_data', {
  state: () => ({
    globalData: {} as GlobalData
  }),
  actions: {
    async fetchData() {
      try {
        this.globalData = await fetchGlobalData()
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getGlobalData: (state) => state.globalData
  }
})
