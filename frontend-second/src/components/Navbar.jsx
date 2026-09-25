import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (!confirmed) return

    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">RentEase</Link>
      </div>
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && user.role === 'owner' && (
          <>
            <Link to="/owner/dashboard">Dashboard</Link>
            <Link to="/owner/properties">My Properties</Link>
          </>
        )}
        {user && user.role === 'tenant' && (
          <>
            <Link to="/tenant/properties">Browse Properties</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
