import { fetchGlobalDataAdapter } from '@/adapters/api/fetchGlobalDataAdapter'

const API_URL = 'https://api.covid19api.com'

export async function fetchGlobalData() {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }
  const response = await fetch(`${API_URL}/summary`, requestOptions)
  const responseJson = await response.json()

  return fetchGlobalDataAdapter(responseJson)
}

export async function fetchCountriesData() {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }
  const response = await fetch(`${API_URL}/summary`, requestOptions)
  return await response.json()
}

export async function fetchCountryHistoricalData(countryName: string, lastDays: number) {
  const currentDate = new Date()
  const fromDate = new Date(currentDate.getTime() - lastDays * 24 * 60 * 60 * 1000)
  const fromDateString = fromDate.toISOString().slice(0, 10)
  const toDateString = currentDate.toISOString().slice(0, 10)

  const response = await fetch(
    `${API_URL}/country/${countryName}?from=${fromDateString}T00:00:00Z&to=${toDateString}T23:59:59Z`
  )
  return await response.json()
}
