import { Link } from 'react-router-dom'

function PropertyCard({ property, basePath, showActions, onDelete }) {
  return (
    <div className="property-card">
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
