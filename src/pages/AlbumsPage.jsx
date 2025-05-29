import React, { useState, useMemo } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useAlbums } from '../hooks/useApi'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import AlbumList from '../components/Albums/AlbumList.jsx'
import AlbumDetail from '../components/Albums/AlbumDetail.jsx'
import AlbumForm from '../components/Albums/AlbumForm'

function AlbumsPage() {
  const { user } = useAuthContext()
  const { data: albums, loading, error, refetch } = useAlbums(user.id)

  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('title')
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // Filter albums based on search
  const filteredAlbums = useMemo(() => {
    if (!albums) return []

    return albums.filter(album => {
      if (!searchTerm) return true

      switch (searchBy) {
        case 'id':
          return album.id.toString().includes(searchTerm)
        case 'title':
          return album.title.toLowerCase().includes(searchTerm.toLowerCase())
        default:
          return true
      }
    })
  }, [albums, searchTerm, searchBy])

  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album)
    setShowForm(false)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    refetch()
  }

  const handleFormCancel = () => {
    setShowForm(false)
  }

  if (loading) return <div className="loading">Loading albums...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
      <div className="page-layout">
        <Header />
        <div className="main-content">
          <Navigation />

          <div className="content-area">
            <div className="page-header">
              <h2>My Albums</h2>
              <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setSelectedAlbum(null)
                  }}
                  className="add-button"
              >
                {showForm ? 'Cancel' : 'Create Album'}
              </button>
            </div>

            <div className="albums-layout">
              <div className="albums-sidebar">
                <div className="search-controls">
                  <select
                      value={searchBy}
                      onChange={(e) => setSearchBy(e.target.value)}
                      className="filter-select"
                  >
                    <option value="title">Search by Title</option>
                    <option value="id">Search by ID</option>
                  </select>

                  <input
                      type="text"
                      placeholder={`Search ${searchBy}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                  />
                </div>

                <AlbumList
                    albums={filteredAlbums}
                    selectedAlbum={selectedAlbum}
                    onAlbumSelect={handleAlbumSelect}
                    onUpdate={refetch}
                />
              </div>

              <div className="albums-main">
                {showForm ? (
                    <AlbumForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                    />
                ) : selectedAlbum ? (
                    <AlbumDetail
                        album={selectedAlbum}
                        onUpdate={refetch}
                    />
                ) : (
                    <div className="empty-state">
                      <p>Select an album to view photos or create a new album.</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AlbumsPage

