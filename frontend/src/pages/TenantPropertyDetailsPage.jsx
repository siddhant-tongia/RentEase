import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAvailableProperty } from '../services/propertyService.js'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function TenantPropertyDetailsPage() {
  const { propertyId } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getAvailableProperty(propertyId)
        setProperty(data)
      } catch (err) {
        if (err.status === 404) {
          setError('Property not found or no longer available.')
        } else if (err.status === 400) {
          setError('Invalid property ID.')
        } else {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [propertyId])

  if (loading) return <LoadingMessage message="Loading property details..." />
  if (error) return (
    <div className="page">
      <ErrorMessage message={error} />
      <Link to="/tenant/properties" className="btn btn-secondary">Back to Properties</Link>
    </div>
  )

  return (
    <div className="page details-page">
      <h2>{property.title || 'Untitled Property'}</h2>
      <div className="details-body">
        <div className="detail-row">
          <span className="detail-label">Address:</span>
          <span>{property.address}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type:</span>
          <span>{property.property_type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Monthly Rent:</span>
          <span>₹{property.monthly_rent}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Availability:</span>
          <span className={`property-availability ${property.availability}`}>
            {property.availability}
          </span>
        </div>
        {property.description && (
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span>{property.description}</span>
          </div>
        )}
      </div>
      <Link to="/tenant/properties" className="btn btn-secondary">Back to Properties</Link>
    </div>
  )
}

export default TenantPropertyDetailsPage
