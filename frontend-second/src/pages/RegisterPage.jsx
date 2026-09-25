import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/authService.js'
import ErrorMessage from '../components/ErrorMessage.jsx'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tenant')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setSubmitting(true)
    try {
      const data = await registerUser(name, email, password, role)
      setSuccess(data.message || 'Registration successful!')
      setName('')
      setEmail('')
      setPassword('')
      setRole('tenant')
    } catch (err) {
      if (err.status === 409) {
        setError('This email is already registered.')
      } else if (err.status === 422) {
        if (err.data && Array.isArray(err.data.detail)) {
          const messages = err.data.detail.map((d) => d.msg).join('. ')
          setError(messages)
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
          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
