import React, { useState } from 'react'
import { usePhotos } from '../../hooks/useApi'
import { useAuth } from '../../hooks/useAuth'
import PhotoGallery from './PhotoGallery'
import { api } from '../../services/api'

function AlbumDetail({ album, onUpdate }) {
  const { user } = useAuth()
  const { data: photos, loading, refetch } = usePhotos(album.id)
  const [showAddPhoto, setShowAddPhoto] = useState(false)
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    url: '',
    thumbnailUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleAddPhoto = async (e) => {
    e.preventDefault()
    
    if (!newPhoto.title.trim() || !newPhoto.url.trim()) {
      alert('Please fill in title and URL')
      return
    }

    try {
      setSubmitting(true)
      await api.createPhoto({
        albumId: album.id,
        title: newPhoto.title.trim(),
        url: newPhoto.url.trim(),
        thumbnailUrl: newPhoto.thumbnailUrl.trim() || newPhoto.url.trim()
      })
      
      setNewPhoto({ title: '', url: '', thumbnailUrl: '' })
      setShowAddPhoto(false)
      refetch()
    } catch (error) {
      console.error('Error adding photo:', error)
      alert('Failed to add photo')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePhoto = async (photoId) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      await api.deletePhoto(photoId)
      refetch()
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Failed to delete photo')
    }
  }

  const handleUpdatePhoto = async (photoId, photoData) => {
    try {
      await api.updatePhoto(photoId, photoData)
      refetch()
    } catch (error) {
      console.error('Error updating photo:', error)
      alert('Failed to update photo')
    }
  }

  const isOwner = album.userId === user.id

  return (
    <div className="album-detail">
      <div className="album-detail-header">
        <h3>Album: {album.title}</h3>
        <div className="album-actions">
          {photos && <span className="photo-count">{photos.length} photos</span>}
          {isOwner && (
            <button 
              onClick={() => setShowAddPhoto(!showAddPhoto)}
              className="add-button"
            >
              {showAddPhoto ? 'Cancel' : 'Add Photo'}
            </button>
          )}
        </div>
      </div>

      {showAddPhoto && isOwner && (
        <div className="add-photo-form">
          <h4>Add New Photo</h4>
          <form onSubmit={handleAddPhoto}>
            <div className="form-group">
              <label htmlFor="photoTitle">Title:</label>
              <input
                type="text"
                id="photoTitle"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                placeholder="Photo title..."
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="photoUrl">Photo URL:</label>
              <input
                type="url"
                id="photoUrl"
                value={newPhoto.url}
                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnailUrl">Thumbnail URL (optional):</label>
              <input
                type="url"
                id="thumbnailUrl"
                value={newPhoto.thumbnailUrl}
                onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })}
                placeholder="https://example.com/thumbnail.jpg"
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? 'Adding...' : 'Add Photo'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddPhoto(false)}
                className="cancel-button"
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="album-photos">
        {loading ? (
          <div className="loading">Loading photos...</div>
        ) : (
          <PhotoGallery 
            photos={photos || []}
            isOwner={isOwner}
            onDeletePhoto={handleDeletePhoto}
            onUpdatePhoto={handleUpdatePhoto}
          />
        )}
      </div>
    </div>
  )
}

export default AlbumDetail