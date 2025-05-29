import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordVerify: '',
    name: '',
    email: '',
    website: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    }
  })
  const [error, setError] = useState('')
  const { register, loading } = useAuthContext()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.username || !formData.password || !formData.passwordVerify) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.passwordVerify) {
      setError('Passwords do not match')
      return
    }

    setStep(2)
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email) {
      setError('Please fill in required fields')
      return
    }

    const userData = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      website: formData.password, // Using password as website field for auth
      phone: formData.phone || '',
      address: formData.address
    }

    const result = await register(userData)
    
    if (result.success) {
      navigate('/home')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        
        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordVerify">Verify Password:</label>
              <input
                type="password"
                id="passwordVerify"
                name="passwordVerify"
                value={formData.passwordVerify}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button">
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleStep2Submit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name: *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email: *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.street">Street:</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.city">City:</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-buttons">
              <button 
                type="button" 
                className="auth-button secondary"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register

