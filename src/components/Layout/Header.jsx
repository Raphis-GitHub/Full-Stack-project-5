import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>FSWD5 App</h1>
          {user && <span className="user-name">Welcome, {user.name}</span>}
        </div>
        
        <div className="header-right">
          {user && (
            <button 
              onClick={handleLogout} 
              className="logout-button"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header