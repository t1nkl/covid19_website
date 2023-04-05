const API_URL = 'https://corona.lmao.ninja/v2'

export async function fetchGlobalData() {
  let response
  let retryCount = 0

  while (retryCount < 3) {
    try {
      response = await fetch(`${API_URL}/all`)
      return await response.json()
    } catch (error) {
      console.error(error)

      if (response?.status === 429 || retryCount === 2) {
        console.error('Failed to load data after 3 retries')
        break
      }

      console.warn(`Error loading data, retrying in 3 seconds...`)

      await new Promise((resolve) => setTimeout(resolve, 3000))
      retryCount++
    }
  }
}

export async function fetchCountriesData() {
  let response
  let retryCount = 0

  while (retryCount < 3) {
    try {
      response = await fetch(`${API_URL}/countries`)
      return await response.json()
    } catch (error) {
      console.error(error)

      if (response?.status === 429 || retryCount === 2) {
        console.error('Failed to load data after 3 retries')
        break
      }

      console.warn(`Error loading data, retrying in 3 seconds...`)

      await new Promise((resolve) => setTimeout(resolve, 3000))
      retryCount++
    }
  }
}
