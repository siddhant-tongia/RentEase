const API_BASE = '/api'

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`

  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Don't set Content-Type for requests without body
  if (!options.body) {
    delete config.headers['Content-Type']
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const error = new Error(
        data?.detail || `Request failed with status ${response.status}`
      )
      error.status = response.status
      error.data = data
      throw error
    }

    return data
  } catch (error) {
    if (error.status) {
      throw error
    }
    const networkError = new Error(
      'Cannot connect to server. Please make sure the backend is running.'
    )
    networkError.status = 0
    throw networkError
  }
}
