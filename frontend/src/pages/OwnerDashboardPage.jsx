import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getOwnerProperties } from '../services/propertyService.js'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function OwnerDashboardPage() {
  const { user } = useAuth()
  const [propertyCount, setPropertyCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const properties = await getOwnerProperties()
        setPropertyCount(properties.length)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCount()
  }, [])

  return (
    <div className="page dashboard-page">
      <h2>Owner Dashboard</h2>
      <div className="dashboard-info">
        <div className="info-card">
          <h3>Account Information</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
        <div className="info-card">
          <h3>My Properties</h3>
          {loading && <LoadingMessage message="Loading property count..." />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <p className="property-count">{propertyCount} {propertyCount === 1 ? 'property' : 'properties'}</p>
          )}
          <Link to="/owner/properties" className="btn btn-primary">
            Manage Properties
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboardPage
