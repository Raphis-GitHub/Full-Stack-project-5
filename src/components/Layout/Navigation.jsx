import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/todos', label: 'Todos', icon: '✓' },
    { path: '/posts', label: 'Posts', icon: '📝' },
    { path: '/albums', label: 'Albums', icon: '📷' }
  ]

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.path} className="nav-item">
            <Link 
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation