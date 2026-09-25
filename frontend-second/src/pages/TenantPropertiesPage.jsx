import { useState, useEffect } from 'react'
import { getAvailableProperties } from '../services/propertyService.js'
import PropertyCard from '../components/PropertyCard.jsx'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function TenantPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAvailableProperties()
        setProperties(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  return (
    <div className="page properties-page">
      <h2>Available Properties</h2>

      {loading && <LoadingMessage message="Loading available properties..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && properties.length === 0 && (
        <div className="empty-state">
          <p>No available properties at the moment. Check back later!</p>
        </div>
      )}

      {!loading && !error && properties.length > 0 && (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              basePath="/tenant/properties"
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TenantPropertiesPage
