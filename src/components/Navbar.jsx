import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">✈️ PlanAway</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>
        {isAuthenticated ? (
          <div className="navbar-user">
            <span className="navbar-greeting">Hi, {user?.username}</span>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
