import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

function AlbumForm({ onSubmit, onCancel }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter an album title')
      return
    }

    try {
      setLoading(true)
      await api.createAlbum({
        userId: user.id,
        title: title.trim()
      })
      
      setTitle('')
      onSubmit()
    } catch (error) {
      console.error('Error creating album:', error)
      alert('Failed to create album')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="album-form-container">
      <h3>Create New Album</h3>
      
      <form onSubmit={handleSubmit} className="album-form">
        <div className="form-group">
          <label htmlFor="title">Album Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter album title..."
            className="form-input"
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Album'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AlbumForm