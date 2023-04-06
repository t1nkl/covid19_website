import { fetchGlobalDataAdapter } from '@/adapters/api/fetchGlobalDataAdapter'

const API_URL = 'https://corona.lmao.ninja/v2'

export async function fetchGlobalData() {
  const response = await fetch(`${API_URL}/all`)
  const responseJson = await response.json()

  return fetchGlobalDataAdapter(responseJson)
}

export async function fetchCountriesData() {
  const response = await fetch(`${API_URL}/countries`)
  return await response.json()
}

export async function fetchCountryHistoricalData(countryName: string, lastDays: number) {
  const response = await fetch(`${API_URL}/historical/${countryName}?lastdays=${lastDays}`)
  return await response.json()
}
