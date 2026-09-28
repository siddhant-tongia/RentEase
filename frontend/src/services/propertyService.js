import { apiRequest } from './api.js'

export async function getOwnerProperties() {
  return apiRequest('/properties')
}

export async function getOwnerProperty(propertyId) {
  return apiRequest(`/properties/${propertyId}`)
}

export async function createProperty(formData) {
  return apiRequest('/properties', {
    method: 'POST',
    body: formData,
  })
}

export async function updateProperty(propertyId, formData) {
  return apiRequest(`/properties/${propertyId}`, {
    method: 'PUT',
    body: formData,
  })
}

export async function deleteProperty(propertyId) {
  return apiRequest(`/properties/${propertyId}`, {
    method: 'DELETE',
  })
}

export async function getAvailableProperties() {
  return apiRequest('/properties/available')
}

export async function getAvailableProperty(propertyId) {
  return apiRequest(`/properties/available/${propertyId}`)
}
