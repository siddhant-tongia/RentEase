import { useState, useEffect } from 'react'
import { getPendingOwners, verifyOwner } from '../services/adminService.js'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function AdminDashboardPage() {
  const [pendingOwners, setPendingOwners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState('')

  const fetchPendingOwners = async () => {
    try {
      const data = await getPendingOwners()
      setPendingOwners(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingOwners()
  }, [])

  const handleVerify = async (userId, action) => {
    setActionLoading(userId)
    try {
      await verifyOwner(userId, action)
      setPendingOwners((prev) => prev.filter((owner) => owner.user_id !== userId))
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading('')
    }
  }

  if (loading) return <LoadingMessage message="Loading pending verifications..." />

  return (
    <div className="page dashboard-page">
      <h2>Admin Dashboard</h2>
      <ErrorMessage message={error} />
      <div className="admin-section">
        <h3>Pending Owner Verifications ({pendingOwners.length})</h3>
        {pendingOwners.length === 0 && (
          <div className="empty-state">
            <p>No pending verifications.</p>
          </div>
        )}
        <div className="admin-cards">
          {pendingOwners.map((owner) => (
            <div key={owner.user_id} className="admin-card">
              <div className="admin-card-info">
                <p><strong>Name:</strong> {owner.name}</p>
                <p><strong>Email:</strong> {owner.email}</p>
              </div>
              {owner.document_url && (
                <div className="admin-card-document">
                  <a href={owner.document_url} target="_blank" rel="noopener noreferrer" className="btn btn-view">
                    View Document
                  </a>
                </div>
              )}
              <div className="admin-card-actions">
                <button
                  className="btn btn-approve"
                  onClick={() => handleVerify(owner.user_id, 'approved')}
                  disabled={actionLoading === owner.user_id}
                >
                  {actionLoading === owner.user_id ? 'Processing...' : 'Approve'}
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleVerify(owner.user_id, 'rejected')}
                  disabled={actionLoading === owner.user_id}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
