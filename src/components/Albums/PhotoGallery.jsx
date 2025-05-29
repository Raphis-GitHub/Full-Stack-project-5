import React, { useState, useEffect } from 'react'

function PhotoGallery({ photos, isOwner, onDeletePhoto, onUpdatePhoto }) {
  const [visiblePhotos, setVisiblePhotos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [photosPerLoad] = useState(6) // Load 6 photos at a time

  // Progressive loading - load photos in batches
  useEffect(() => {
    if (photos.length > 0) {
      setVisiblePhotos(photos.slice(0, photosPerLoad))
    }
  }, [photos, photosPerLoad])

  const loadMorePhotos = () => {
    const nextBatch = Math.min(visiblePhotos.length + photosPerLoad, photos.length)
    setVisiblePhotos(photos.slice(0, nextBatch))
  }

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setShowLightbox(true)
  }

  const closeLightbox = () => {
    setShowLightbox(false)
  }

  const navigatePhoto = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }
  }

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo.id)
    setEditTitle(photo.title)
  }

  const handleSaveEdit = async (photo) => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty')
      return
    }

    await onUpdatePhoto(photo.id, {
      ...photo,
      title: editTitle.trim()
    })
    
    setEditingPhoto(null)
    setEditTitle('')
  }

  const handleCancelEdit = () => {
    setEditingPhoto(null)
    setEditTitle('')
  }

  const handleKeyDown = (e) => {
    if (!showLightbox) return
    
    if (e.key === 'ArrowLeft') navigatePhoto('prev')
    if (e.key === 'ArrowRight') navigatePhoto('next')
    if (e.key === 'Escape') closeLightbox()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showLightbox])

  if (!photos || photos.length === 0) {
    return (
      <div className="empty-state">
        <p>No photos in this album yet.</p>
        {isOwner && <p>Add some photos to get started!</p>}
      </div>
    )
  }

  return (
    <div className="photo-gallery">
      <div className="photo-grid">
        {visiblePhotos.map((photo, index) => (
          <div key={photo.id} className="photo-item">
            <div className="photo-thumbnail" onClick={() => openLightbox(index)}>
              <img 
                src={photo.thumbnailUrl} 
                alt={photo.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150?text=Image+Error'
                }}
              />
              <div className="photo-overlay">
                <span className="photo-title">{photo.title}</span>
              </div>
            </div>
            
            {isOwner && (
              <div className="photo-actions">
                {editingPhoto === photo.id ? (
                  <div className="photo-edit">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="edit-input"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(photo)
                        if (e.key === 'Escape') handleCancelEdit()
                      }}
                    />
                    <button onClick={() => handleSaveEdit(photo)} className="action-button save">
                      ✓
                    </button>
                    <button onClick={handleCancelEdit} className="action-button cancel">
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditPhoto(photo)}
                      className="action-button edit"
                      title="Edit photo title"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => onDeletePhoto(photo.id)}
                      className="action-button delete"
                      title="Delete photo"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePhotos.length < photos.length && (
        <div className="load-more-container">
          <button onClick={loadMorePhotos} className="load-more-button">
            Load More Photos ({photos.length - visiblePhotos.length} remaining)
          </button>
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && photos[currentIndex] && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            <button 
              className="lightbox-nav prev" 
              onClick={() => navigatePhoto('prev')}
              disabled={photos.length <= 1}
            >
              ‹
            </button>
            
            <div className="lightbox-image-container">
              <img 
                src={photos[currentIndex].url} 
                alt={photos[currentIndex].title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Error'
                }}
              />
              <div className="lightbox-info">
                <h4>{photos[currentIndex].title}</h4>
                <p>Photo {currentIndex + 1} of {photos.length}</p>
              </div>
            </div>
            
            <button 
              className="lightbox-nav next" 
              onClick={() => navigatePhoto('next')}
              disabled={photos.length <= 1}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery