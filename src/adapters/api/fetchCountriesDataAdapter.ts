import type { Country } from '@/models/Country'

export function fetchCountriesDataAdapter(data: Array<any> | Object): Country[] {
  if (process.env.NODE_ENV === 'development') {
    console.log('fetchCountriesDataAdapter -> ', data)
  }

  // Check if the data is an array and has at least one item in it
  if (Array.isArray(data) && data.length > 0) {
    if (process.env.NODE_ENV === 'development') {
      console.log('fetchCountriesDataAdapter -> isArray -> ', data)
    }

    const firstItem = data[0]

    // This is the format for the response from the CoronaNinjaApi.ts
    if (
      firstItem &&
      'country' in firstItem &&
      'countryInfo' in firstItem &&
      'deaths' in firstItem &&
      'deathsPerOneMillion' in firstItem &&
      'todayDeaths' in firstItem
    ) {
      return data.map((countryData) => {
        return {
          active: countryData.active,
          activePerOneMillion: countryData.activePerOneMillion,
          cases: countryData.cases,
          casesPerOneMillion: countryData.casesPerOneMillion,
          continent: countryData.continent,
          country: countryData.country,
          countryInfo: countryData.countryInfo,
          critical: countryData.critical,
          criticalPerOneMillion: countryData.criticalPerOneMillion,
          deaths: countryData.deaths,
          deathsPerOneMillion: countryData.deathsPerOneMillion,
          oneCasePerPeople: countryData.oneCasePerPeople,
          oneDeathPerPeople: countryData.oneDeathPerPeople,
          oneTestPerPeople: countryData.oneTestPerPeople,
          population: countryData.population,
          recovered: countryData.recovered,
          recoveredPerOneMillion: countryData.recoveredPerOneMillion,
          tests: countryData.tests,
          testsPerOneMillion: countryData.testsPerOneMillion,
          todayCases: countryData.todayCases,
          todayDeaths: countryData.todayDeaths,
          todayRecovered: countryData.todayRecovered,
          updated: Date.parse(countryData.updated)
        }
      })
    }
  }

  if (typeof data === 'object' && data !== null) {
    if (process.env.NODE_ENV === 'development') {
      console.log('fetchCountriesDataAdapter -> isObject -> ', data)
    }

    if (data && 'ID' in data && 'Global' in data && 'Countries' in data) {
      // @ts-ignore
      if (Array.isArray(data.Countries) && data.Countries.length > 0) {
        // @ts-ignore
        const firstItem = data.Countries[0]

        // This is the format for the response from the Covid19Api.ts
        if (
          firstItem &&
          'ID' in firstItem &&
          'Country' in firstItem &&
          'Slug' in firstItem &&
          'CountryCode' in firstItem &&
          'Premium' in firstItem
        ) {
          // @ts-ignore
          return data.Countries.map((countryData) => {
            return {
              active:
                countryData.TotalConfirmed - countryData.TotalRecovered - countryData.TotalDeaths,
              activePerOneMillion: 0,
              cases: countryData.TotalConfirmed,
              casesPerOneMillion: 0,
              continent: '',
              country: countryData.Country,
              countryInfo: {},
              critical: 0,
              criticalPerOneMillion: 0,
              deaths: countryData.TotalDeaths,
              deathsPerOneMillion: 0,
              oneCasePerPeople: 0,
              oneDeathPerPeople: 0,
              oneTestPerPeople: 0,
              population: 0,
              recovered: countryData.TotalRecovered,
              recoveredPerOneMillion: 0,
              tests: 0,
              testsPerOneMillion: 0,
              todayCases: countryData.NewConfirmed,
              todayDeaths: countryData.NewDeaths,
              todayRecovered: countryData.NewRecovered,
              updated: Date.parse(countryData.Date)
            }
          })
        }
      }
    }
  }

  throw new Error('Unknown response format')
}
