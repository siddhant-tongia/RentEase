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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const images = property?.image_urls || []

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

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
      {images.length > 0 && (
        <div className="image-carousel">
          <div className="carousel-main">
            {images.length > 1 && (
              <button type="button" className="carousel-btn carousel-prev" onClick={prevImage}>◀</button>
            )}
            <img src={images[currentImageIndex]} alt={`Property ${currentImageIndex + 1}`} />
            {images.length > 1 && (
              <button type="button" className="carousel-btn carousel-next" onClick={nextImage}>▶</button>
            )}
          </div>
          {images.length > 1 && (
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
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
      <div className="contact-owner-section">
        <h3>Contact Owner</h3>
        <div className="contact-owner-info">
          <p><strong>Name:</strong> {property.owner_name}</p>
          <p><strong>Phone:</strong> <a href={`tel:${property.owner_phone}`}>{property.owner_phone}</a></p>
        </div>
      </div>
      <Link to="/tenant/properties" className="btn btn-secondary">Back to Properties</Link>
    </div>
  )
}

export default TenantPropertyDetailsPage
