export interface CountryHistoricalData {
  country: string
  province: string[]
  timeline: {
    cases: {
      [key: string]: number
    }
    deaths: {
      [key: string]: number
    }
    recovered: {
      [key: string]: number
    }
  }
}
