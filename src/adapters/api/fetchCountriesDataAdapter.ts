/**
 * TODO: Finish the logic for this function.
 */
import type { Country } from '@/models/Country'

export function fetchCountriesDataAdapter(data: any): Country {
  if (process.env.NODE_ENV === 'development') {
    console.log('fetchCountriesDataAdapter', data)
  }

  // This function takes the response from each API and returns a standardized output object.
  // Modify the logic here to match the output format.
  if (
    data &&
    'deaths' in data &&
    'deathsPerOneMillion' in data &&
    'oneDeathPerPeople' in data &&
    'todayDeaths' in data
  ) {
    // This is the format for the response from the CoronaNinjaApi.ts
    return {
      active: data.active,
      activePerOneMillion: data.activePerOneMillion,
      cases: data.cases,
      casesPerOneMillion: data.casesPerOneMillion,
      continent: data.continent,
      country: data.country,
      countryInfo: data.countryInfo,
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

  if (
    data &&
    'Global' in data &&
    data.Global.TotalConfirmed !== undefined &&
    data.Global.TotalDeaths !== undefined &&
    data.Global.TotalRecovered !== undefined
  ) {
    // This is the format for the response from the Covid19Api.ts
    return {
      active: data.active,
      activePerOneMillion: data.activePerOneMillion,
      cases: data.cases,
      casesPerOneMillion: data.casesPerOneMillion,
      continent: data.continent,
      country: data.country,
      countryInfo: data.countryInfo,
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
      updated: Date.parse(data.Global.Date)
    }
  }

  throw new Error('Unknown response format')
}
