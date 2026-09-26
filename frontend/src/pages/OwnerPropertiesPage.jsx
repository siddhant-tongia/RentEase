import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOwnerProperties, deleteProperty } from '../services/propertyService.js'
import PropertyCard from '../components/PropertyCard.jsx'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function OwnerPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProperties = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getOwnerProperties()
      setProperties(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?')
    if (!confirmed) return

    try {
      await deleteProperty(propertyId)
      await fetchProperties()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page properties-page">
      <div className="page-header">
        <h2>My Properties</h2>
        <Link to="/owner/properties/new" className="btn btn-primary">
          + Add Property
        </Link>
      </div>

      {loading && <LoadingMessage message="Loading properties..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && properties.length === 0 && (
        <div className="empty-state">
          <p>You don't have any properties yet.</p>
          <Link to="/owner/properties/new" className="btn btn-primary">
            Add Your First Property
          </Link>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              basePath="/owner/properties"
              showActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default OwnerPropertiesPage
