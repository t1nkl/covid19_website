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

export interface ApiClient {
  fetchGlobalData(): Promise<any>
  fetchCountriesData(): Promise<any>
  fetchCountryHistoricalData(countryName: string, lastDays: number): Promise<any>
}

type Api = {
  fetchGlobalData: () => Promise<any>
  fetchCountriesData: () => Promise<any>
  fetchCountryHistoricalData: (countryName: string, lastDays: number) => Promise<any>
}

export function apiClient(): ApiClient {
  const coronaNinjaApi: Api = {
    fetchGlobalData: fetchGlobalDataCoronaNinjaApi,
    fetchCountriesData: fetchCountriesDataCoronaNinjaApi,
    fetchCountryHistoricalData: fetchCountryHistoricalDataCoronaNinjaApi
  }
  const covid19Api: Api = {
    fetchGlobalData: fetchGlobalDataCovid19Api,
    fetchCountriesData: fetchCountriesDataCovid19Api,
    fetchCountryHistoricalData: fetchCountryHistoricalDataCovid19Api
  }

  const apiList: Api[] = [coronaNinjaApi, covid19Api]

  let currentApiIndex = 0

  async function fetchWithRetry(apiFunction: () => Promise<any>) {
    if (
      !apiList.some(
        (api) => api.fetchGlobalData === apiFunction || api.fetchCountriesData === apiFunction
      )
    ) {
      throw new Error('API function not found in the list of APIs')
    }

    let response
    let retryCount = 0

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
          `Error loading data from API ${
            currentApiIndex + 1
          }, retrying with next API in 3 seconds...`
        )

        await new Promise((resolve) => setTimeout(resolve, 3000))
        currentApiIndex = (currentApiIndex + 1) % apiList.length
        retryCount++
      }
    }
  }

  return <ApiClient>{
    async fetchGlobalData() {
      return await fetchWithRetry(apiList[currentApiIndex].fetchGlobalData)
    },
    async fetchCountriesData() {
      return await fetchWithRetry(apiList[currentApiIndex].fetchCountriesData)
    },
    async fetchCountryHistoricalData(countryName: string, lastDays: number) {
      return await fetchWithRetry(
        await apiList[currentApiIndex].fetchCountryHistoricalData(countryName, lastDays)
      )
    }
  }
}
