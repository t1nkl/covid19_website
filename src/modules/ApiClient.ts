import {
  fetchGlobalData as fetchGlobalDataCoronaNinjaApi,
  fetchCountriesData as fetchCountriesDataCoronaNinjaApi,
  fetchCountryHistoricalData as fetchCountryHistoricalDataCoronaNinjaApi
} from '@/api/CoronaNinjaApi'
import {
  fetchGlobalData as fetchGlobalDataCovid19Api,
  fetchCountriesData as fetchCountriesDataCovid19Api,
  fetchCountryHistoricalData as fetchCountryHistoricalDataCovid19Api
} from '@/api/Covid19Api'

interface ApiClient {
  fetchGlobalData(): Promise<any>
  fetchCountriesData(): Promise<any>
  fetchCountryHistoricalData(countryName: string, lastDays: number): Promise<any>
}

type Api = {
  fetchGlobalData: () => Promise<any>
  fetchCountriesData: () => Promise<any>
  fetchCountryHistoricalData: (countryName: string, lastDays: number) => Promise<any>
}

const apiList: Api[] = [
  {
    fetchGlobalData: fetchGlobalDataCoronaNinjaApi,
    fetchCountriesData: fetchCountriesDataCoronaNinjaApi,
    fetchCountryHistoricalData: fetchCountryHistoricalDataCoronaNinjaApi
  },
  {
    fetchGlobalData: fetchGlobalDataCovid19Api,
    fetchCountriesData: fetchCountriesDataCovid19Api,
    fetchCountryHistoricalData: fetchCountryHistoricalDataCovid19Api
  }
]

async function fetchWithRetry(apiFunction: () => Promise<any>): Promise<any> {
  let response
  let retryCount: number = 0

  while (retryCount < apiList.length) {
    try {
      response = await apiFunction()
      return response
    } catch (error) {
      console.error(error)

      if (retryCount === apiList.length - 1) {
        console.error('Failed to load data from all APIs')
        throw error
      }

      console.warn(
        `Error loading data from API ${retryCount + 1}, retrying with next API in 3 seconds...`
      )

      await new Promise((resolve) => setTimeout(resolve, 3000))
      retryCount++
    }
  }
}

export function apiClient(): ApiClient {
  const currentApiIndex = 0

  return {
    async fetchGlobalData(): Promise<any> {
      return await fetchWithRetry(apiList[currentApiIndex].fetchGlobalData)
    },
    async fetchCountriesData(): Promise<any> {
      return await fetchWithRetry(apiList[currentApiIndex].fetchCountriesData)
    },
    async fetchCountryHistoricalData(countryName: string, lastDays: number): Promise<any> {
      return await fetchWithRetry(() =>
        apiList[currentApiIndex].fetchCountryHistoricalData(countryName, lastDays)
      )
    }
  }
}
