import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createProperty, getOwnerProperty, updateProperty } from '../services/propertyService.js'
import LoadingMessage from '../components/LoadingMessage.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function PropertyFormPage() {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(propertyId)

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    property_type: 'apartment',
    monthly_rent: '',
    availability: 'available',
    description: '',
  })
  const [loading, setLoading] = useState(isEditing)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isEditing) {
      const fetchProperty = async () => {
        try {
          const data = await getOwnerProperty(propertyId)
          setFormData({
            title: data.title || '',
            address: data.address || '',
            property_type: data.property_type || 'apartment',
            monthly_rent: data.monthly_rent || '',
            availability: data.availability || 'available',
            description: data.description || '',
          })
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      fetchProperty()
    }
  }, [propertyId, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.address.trim()) {
      setError('Address is required.')
      return
    }
    if (!formData.monthly_rent || Number(formData.monthly_rent) <= 0) {
      setError('Monthly rent must be greater than 0.')
      return
    }

    const payload = {
      title: formData.title.trim() || null,
      address: formData.address.trim(),
      property_type: formData.property_type,
      monthly_rent: parseFloat(formData.monthly_rent),
      availability: formData.availability,
      description: formData.description.trim() || null,
    }

    setSubmitting(true)
    try {
      if (isEditing) {
        await updateProperty(propertyId, payload)
      } else {
        await createProperty(payload)
      }
      navigate('/owner/properties')
    } catch (err) {
      if (err.status === 422) {
        if (err.data && Array.isArray(err.data.detail)) {
          const messages = err.data.detail.map((d) => d.msg).join('. ')
          setError(messages)
        } else {
          setError('Please check your input and try again.')
        }
      } else {
        setError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingMessage message="Loading property..." />

  return (
    <div className="page form-page">
      <h2>{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
      <ErrorMessage message={error} />
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property title (optional)"
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Property address"
            maxLength={100}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="property_type">Property Type</label>
          <select
            id="property_type"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Room</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="monthly_rent">Monthly Rent (₹) *</label>
          <input
            type="number"
            id="monthly_rent"
            name="monthly_rent"
            value={formData.monthly_rent}
            onChange={handleChange}
            placeholder="e.g. 15000"
            min="1"
            step="any"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the property (optional)"
            maxLength={500}
            rows={4}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
              ? 'Update Property'
              : 'Create Property'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/owner/properties')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyFormPage
