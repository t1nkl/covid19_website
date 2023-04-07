import { fetchGlobalDataAdapter } from '@/adapters/api/fetchGlobalDataAdapter'
import { fetchCountriesDataAdapter } from '@/adapters/api/fetchCountriesDataAdapter'

// TODO: https://disease.sh/docs/#/
// TODO: https://disease.sh/docs/#/
// TODO: https://disease.sh/docs/#/
const API_URL = 'https://disease.sh/v3'

export async function fetchGlobalData() {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const response = await fetch(`${API_URL}/covid-19/all`, requestOptions)
  const responseJson = await response.json()

  return fetchGlobalDataAdapter(responseJson)
}

export async function fetchCountriesData() {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const response = await fetch(`${API_URL}/covid-19/countries`, requestOptions)
  const responseJson = await response.json()

  return fetchCountriesDataAdapter(responseJson)
}

export async function fetchCountryHistoricalData(countryName: string, lastDays: number) {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const response = await fetch(
    `${API_URL}/covid-19/historical/${countryName}?lastdays=${lastDays}`,
    requestOptions
  )
  return await response.json()
}
