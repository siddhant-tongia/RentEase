import { Link } from 'react-router-dom'

function PropertyCard({ property, basePath, showActions, onDelete }) {
  const firstImage = property.image_urls && property.image_urls.length > 0
    ? property.image_urls[0]
    : null

  return (
    <div className="property-card">
      <div className="property-card-image">
        {firstImage ? (
          <img src={firstImage} alt={property.title || 'Property'} />
        ) : (
          <div className="property-card-no-image">No image available</div>
        )}
      </div>
      <h3>{property.title || 'Untitled Property'}</h3>
      <p className="property-address">{property.address}</p>
      <div className="property-details">
        <span className="property-type">{property.property_type}</span>
        <span className="property-rent">₹{property.monthly_rent}/month</span>
        <span className={`property-availability ${property.availability}`}>
          {property.availability}
        </span>
      </div>
      <div className="property-card-actions">
        <Link to={`${basePath}/${property.property_id}`} className="btn btn-view">
          View Details
        </Link>
        {showActions && (
          <>
            <Link
              to={`${basePath}/${property.property_id}/edit`}
              className="btn btn-edit"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(property.property_id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PropertyCard
