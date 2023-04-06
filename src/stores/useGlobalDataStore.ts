import { defineStore } from 'pinia'
import type { GlobalData } from '@/models/GlobalData'
import { apiClient } from '@/modules/ApiClient'

export const useGlobalDataStore = defineStore('global_data', {
  state: () => ({
    globalData: {} as GlobalData
  }),
  actions: {
    async fetchData() {
      try {
        this.globalData = await apiClient().fetchGlobalData()
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getGlobalData: (state) => state.globalData
  }
})
