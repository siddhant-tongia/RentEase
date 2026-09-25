import { apiRequest } from './api.js'

export async function registerUser(name, email, password, role) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
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
