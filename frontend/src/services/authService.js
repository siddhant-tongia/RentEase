import { apiRequest } from './api.js'

export async function registerUser(name, email, password, role, document) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('role', role)
  if (document) {
    formData.append('document', document)
  }
  return apiRequest('/auth/register', {
    method: 'POST',
    body: formData,
  })
}

export async function loginUser(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getMe() {
  return apiRequest('/auth/me')
}

export async function logoutUser() {
  return apiRequest('/auth/logout', {
    method: 'POST',
  })
}
