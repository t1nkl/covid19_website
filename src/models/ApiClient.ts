export interface ApiClient {
  fetchGlobalData(): Promise<any>
  fetchCountriesData(): Promise<any>
  fetchCountryHistoricalData(countryName: string, lastDays: number): Promise<any>
}
