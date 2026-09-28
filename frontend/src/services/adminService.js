import { apiRequest } from './api.js'

export async function getPendingOwners() {
  return apiRequest('/admin/pending-owners')
}

export async function verifyOwner(userId, action) {
  return apiRequest(`/admin/verify-owner/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ action }),
  })
}
