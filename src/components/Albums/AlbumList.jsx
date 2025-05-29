import React, { useState } from 'react'
import { api } from '../../services/api'

function AlbumList({ albums, selectedAlbum, onAlbumSelect, onUpdate }) {
  const [loading, setLoading] = useState(false)

  const handleDeleteAlbum = async (e, albumId) => {
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this album? This will also delete all photos in the album.')) {
      return
    }

    try {
      setLoading(true)
      
      // First delete all photos in the album
      const photos = await api.getPhotos(albumId)
      for (const photo of photos) {
        await api.deletePhoto(photo.id)
      }
      
      // Then delete the album
      await api.deleteAlbum(albumId)
      onUpdate()
    } catch (error) {
      console.error('Error deleting album:', error)
      alert('Failed to delete album')
    } finally {
      setLoading(false)
    }
  }

  if (!albums || albums.length === 0) {
    return (
      <div className="empty-state">
        <p>No albums found.</p>
      </div>
    )
  }

  return (
    <div className="album-list">
      <h3>Albums ({albums.length})</h3>
      {albums.map(album => (
        <div
          key={album.id}
          className={`album-item ${selectedAlbum && selectedAlbum.id === album.id ? 'selected' : ''}`}
          onClick={() => onAlbumSelect(album)}
        >
          <div className="album-item-content">
            <div className="album-item-id">#{album.id}</div>
            <div className="album-item-title">{album.title}</div>
          </div>
          
          <div className="album-item-actions">
            <button 
              onClick={(e) => handleDeleteAlbum(e, album.id)}
              className="action-button delete"
              disabled={loading}
              title="Delete album"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlbumList