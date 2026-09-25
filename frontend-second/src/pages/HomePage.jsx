import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function HomePage() {
  const { user } = useAuth()

  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Welcome to RentEase</h1>
        <p>A simple property rental management system for owners and tenants.</p>
        {!user && (
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        )}
        {user && user.role === 'owner' && (
          <div className="hero-actions">
            <Link to="/owner/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          </div>
        )}
        {user && user.role === 'tenant' && (
          <div className="hero-actions">
            <Link to="/tenant/properties" className="btn btn-primary">Browse Properties</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
