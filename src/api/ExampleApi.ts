const API_URL = 'https://httpbin.org'

export async function fetchGlobalData() {
  const response = await fetch(`${API_URL}/get`)
  return await response.json()
}

export async function fetchCountriesData() {
  const response = await fetch(`${API_URL}/get`)
  return await response.json()
}

// eslint-disable-next-line
export async function fetchCountryHistoricalData(countryName: string, lastDays: number) {
  const response = await fetch(`${API_URL}/get`)
  return await response.json()
}
