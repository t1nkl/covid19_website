import type { GlobalData } from '@/models/GlobalData'

export function fetchGlobalDataAdapter(data: any): GlobalData {
  if (process.env.NODE_ENV === 'development') {
    console.log('fetchGlobalDataAdapter -> ', data)
  }

  /**
   * This is the format for the response from the CoronaNinjaApi.ts
   */
  if (
    data &&
    'active' in data &&
    'affectedCountries' in data &&
    'deathsPerOneMillion' in data &&
    'oneDeathPerPeople' in data
  ) {
    return {
      active: data.active,
      activePerOneMillion: data.activePerOneMillion,
      affectedCountries: data.affectedCountries,
      cases: data.cases,
      casesPerOneMillion: data.casesPerOneMillion,
      critical: data.critical,
      criticalPerOneMillion: data.criticalPerOneMillion,
      deaths: data.deaths,
      deathsPerOneMillion: data.deathsPerOneMillion,
      oneCasePerPeople: data.oneCasePerPeople,
      oneDeathPerPeople: data.oneDeathPerPeople,
      oneTestPerPeople: data.oneTestPerPeople,
      population: data.population,
      recovered: data.recovered,
      recoveredPerOneMillion: data.recoveredPerOneMillion,
      tests: data.tests,
      testsPerOneMillion: data.testsPerOneMillion,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
      todayRecovered: data.todayRecovered,
      updated: data.updated
    }
  }

  /**
   * This is the format for the response from the Covid19Api.ts
   */
  if (
    data &&
    data.Global &&
    data.Global.TotalConfirmed !== undefined &&
    data.Global.TotalDeaths !== undefined &&
    data.Global.TotalRecovered !== undefined
  ) {
    return {
      active: 0,
      activePerOneMillion: 0,
      affectedCountries: 0,
      cases: data.Global.TotalConfirmed,
      casesPerOneMillion: 0,
      critical: 0,
      criticalPerOneMillion: 0,
      deaths: data.Global.TotalDeaths,
      deathsPerOneMillion: 0,
      oneCasePerPeople: 0,
      oneDeathPerPeople: 0,
      oneTestPerPeople: 0,
      population: 0,
      recovered: data.Global.TotalRecovered,
      recoveredPerOneMillion: 0,
      tests: 0,
      testsPerOneMillion: 0,
      todayCases: data.Global.NewConfirmed,
      todayDeaths: data.Global.NewDeaths,
      todayRecovered: data.Global.NewRecovered,
      updated: Date.parse(data.Global.Date)
    }
  }

  throw new Error('Unknown response format')
}
