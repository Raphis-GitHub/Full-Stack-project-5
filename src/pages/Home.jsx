import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'

function Home() {
  const { user } = useAuthContext()
  const [showInfo, setShowInfo] = useState(false)

  return (
      <div className="page-layout">
        <Header />
        <div className="main-content">
          <Navigation />

          <div className="content-area">
            <div className="page-header">
              <h2>Dashboard</h2>
              <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="info-button"
              >
                {showInfo ? 'Hide Info' : 'Show Info'}
              </button>
            </div>

            {showInfo && (
                <div className="user-info-modal">
                  <div className="user-info-content">
                    <h3>User Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <strong>Name:</strong> {user.name}
                      </div>
                      <div className="info-item">
                        <strong>Username:</strong> {user.username}
                      </div>
                      <div className="info-item">
                        <strong>Email:</strong> {user.email}
                      </div>
                      <div className="info-item">
                        <strong>Phone:</strong> {user.phone}
                      </div>
                      {user.address && (
                          <div className="info-item">
                            <strong>Address:</strong>
                            <div className="address">
                              {user.address.street} {user.address.suite}<br />
                              {user.address.city}, {user.address.zipcode}
                            </div>
                          </div>
                      )}
                    </div>
                    <button
                        onClick={() => setShowInfo(false)}
                        className="close-button"
                    >
                      Close
                    </button>
                  </div>
                </div>
            )}

            <div className="dashboard-content">
              <div className="welcome-section">
                <h3>Welcome to your personal dashboard, {user.name}!</h3>
                <p>Use the navigation menu to access your todos, posts, and albums.</p>
              </div>

              <div className="quick-actions">
                <div className="action-card">
                  <h4>��� Todos</h4>
                  <p>Manage your tasks and track completion</p>
                  <a href="/todos" className="action-link">View Todos</a>
                </div>

                <div className="action-card">
                  <h4>📰 Posts</h4>
                  <p>Create and share your thoughts</p>
                  <a href="/posts" className="action-link">View Posts</a>
                </div>

                <div className="action-card">
                  <h4>📷 Albums</h4>
                  <p>Organize and view your photo collections</p>
                  <a href="/albums" className="action-link">View Albums</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home

