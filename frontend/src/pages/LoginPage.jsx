import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginWithEmail, loginWithPhone, getMe } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

function LoginPage() {
  const [loginMode, setLoginMode] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (loginMode === 'email' && !email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (loginMode === 'phone' && !phone.trim()) {
      setError('Please enter your phone number.')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    setSubmitting(true)
    try {
      if (loginMode === 'email') {
        await loginWithEmail(email, password)
      } else {
        await loginWithPhone(phone, password)
      }
      await login()
      const userData = await getMe()
      if (userData.role === 'admin') {
        navigate('/admin/dashboard')
      } else if (userData.role === 'owner') {
        navigate('/owner/dashboard')
      } else {
        navigate('/tenant/properties')
      }
    } catch (err) {
      if (err.status === 401) {
        setError('Invalid credentials.')
      } else if (err.status === 403) {
        setError(err.data?.detail || 'Account not verified.')
      } else if (err.status === 422) {
        setError('Please check your input and try again.')
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
        <h2>Login</h2>
        <div className="login-toggle">
          <button
            type="button"
            className={`toggle-btn ${loginMode === 'email' ? 'active' : ''}`}
            onClick={() => setLoginMode('email')}
          >
            Email
          </button>
          <button
            type="button"
            className={`toggle-btn ${loginMode === 'phone' ? 'active' : ''}`}
            onClick={() => setLoginMode('phone')}
          >
            Phone
          </button>
        </div>
        <ErrorMessage message={error} />
        <form onSubmit={handleSubmit}>
          {loginMode === 'email' ? (
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
          ) : (
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
          )}
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
          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
