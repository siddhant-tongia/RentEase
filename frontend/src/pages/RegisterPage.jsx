import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser, checkAccountStatus } from '../services/authService.js'
import ErrorMessage from '../components/ErrorMessage.jsx'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tenant')
  const [document, setDocument] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [ownerStatus, setOwnerStatus] = useState(null)
  const [checkingStatus, setCheckingStatus] = useState(false)

  const handleDocumentChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      setDocument(null)
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setError('Document must be a JPG, PNG, WebP image or PDF.')
      setDocument(null)
      e.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Document must be less than 5MB.')
      setDocument(null)
      e.target.value = ''
      return
    }

    setError('')
    setDocument(file)
  }

  const handleCheckStatus = async () => {
    if (!ownerStatus?.email) return
    setCheckingStatus(true)
    setError('')
    try {
      const data = await checkAccountStatus(ownerStatus.email)
      setOwnerStatus((prev) => ({ ...prev, status: data.status }))
    } catch (err) {
      setError(err.message || 'Failed to check status.')
    } finally {
      setCheckingStatus(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (phone.trim().length < 10) {
      setError('Phone number must be at least 10 digits.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (role === 'owner' && !document) {
      setError('Please upload an ownership proof document.')
      return
    }

    const registeredEmail = email.trim().toLowerCase()
    setSubmitting(true)
    try {
      const data = await registerUser(name, email, phone, password, role, document)
      if (role === 'owner') {
        setOwnerStatus({
          email: registeredEmail,
          status: 'pending'
        })
      } else {
        setSuccess(data.message || 'Registration successful!')
      }
      setName('')
      setEmail('')
      setPhone('')
      setPassword('')
      setRole('tenant')
      setDocument(null)
    } catch (err) {
      if (err.status === 409) {
        setError(err.data?.detail || 'This email or phone number is already registered.')
      } else if (err.status === 422) {
        if (err.data && Array.isArray(err.data.detail)) {
          const messages = err.data.detail.map((d) => d.msg).join('. ')
          setError(messages)
        } else if (err.data && err.data.detail) {
          setError(err.data.detail)
        } else {
          setError('Please check your input and try again.')
        }
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        {ownerStatus ? (
          <div className="verification-status-card">
            <h2>Verification Status</h2>
            <ErrorMessage message={error} />
            <p className="status-account"><strong>Account:</strong> {ownerStatus.email}</p>
            <div className={`status-badge ${ownerStatus.status}`}>
              {ownerStatus.status === 'pending' && 'Pending Admin Review'}
              {ownerStatus.status === 'approved' && 'Approved'}
              {ownerStatus.status === 'rejected' && 'Verification Rejected'}
            </div>
            <p className="status-description">
              {ownerStatus.status === 'pending' && 'Your ownership proof document has been submitted and is currently under review by an admin.'}
              {ownerStatus.status === 'approved' && 'Your property ownership has been verified! You can now log in to your account.'}
              {ownerStatus.status === 'rejected' && 'Your verification was not approved. Please register again with valid ownership documents.'}
            </p>
            <div className="status-actions">
              {ownerStatus.status === 'pending' && (
                <button
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={handleCheckStatus}
                  disabled={checkingStatus}
                >
                  {checkingStatus ? 'Checking...' : 'Refresh Status'}
                </button>
              )}
              {ownerStatus.status === 'approved' && (
                <Link to="/login" className="btn btn-primary btn-full">
                  Proceed to Login
                </Link>
              )}
              {ownerStatus.status === 'rejected' && (
                <button
                  type="button"
                  className="btn btn-secondary btn-full"
                  onClick={() => setOwnerStatus(null)}
                >
                  Register Again
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <h2>Register</h2>
            <ErrorMessage message={error} />
            {success && (
              <div className="success-message">
                {success} <Link to="/login">Go to Login</Link>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  maxLength={15}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="tenant">Tenant</option>
                  <option value="owner">Owner</option>
                </select>
              </div>
              {role === 'owner' && (
                <div className="form-group">
                  <label htmlFor="document">Ownership Proof Document *</label>
                  <p className="field-hint">Upload property deed, tax receipt, or utility bill (JPG, PNG, WebP, PDF - max 5MB)</p>
                  <input
                    type="file"
                    id="document"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={handleDocumentChange}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="auth-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
