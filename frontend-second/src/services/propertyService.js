import { apiRequest } from './api.js'

// Owner endpoints
export async function getOwnerProperties() {
  return apiRequest('/properties')
}

export async function getOwnerProperty(propertyId) {
  return apiRequest(`/properties/${propertyId}`)
}

export async function createProperty(propertyData) {
  return apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(propertyData),
  })
}

export async function updateProperty(propertyId, propertyData) {
  return apiRequest(`/properties/${propertyId}`, {
    method: 'PUT',
    body: JSON.stringify(propertyData),
  })
}

export async function deleteProperty(propertyId) {
  return apiRequest(`/properties/${propertyId}`, {
    method: 'DELETE',
  })
}

// Tenant endpoints
export async function getAvailableProperties() {
  return apiRequest('/properties/available')
}

export async function getAvailableProperty(propertyId) {
  return apiRequest(`/properties/available/${propertyId}`)
}
