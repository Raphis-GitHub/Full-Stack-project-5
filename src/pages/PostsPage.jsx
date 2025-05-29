import React, { useState, useMemo } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { usePosts } from '../hooks/useApi'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import PostList from '../components/Posts/PostList'
import PostDetail from '../components/Posts/PostDetail'
import PostForm from '../components/Posts/PostForm'

function PostsPage() {
  const { user } = useAuthContext()
  const { data: posts, loading, error, refetch } = usePosts(user.id)

  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('title')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  // Filter posts based on search
  const filteredPosts = useMemo(() => {
    if (!posts) return []

    return posts.filter(post => {
      if (!searchTerm) return true

      switch (searchBy) {
        case 'id':
          return post.id.toString().includes(searchTerm)
        case 'title':
          return post.title.toLowerCase().includes(searchTerm.toLowerCase())
        default:
          return true
      }
    })
  }, [posts, searchTerm, searchBy])

  const handlePostSelect = (post) => {
    setSelectedPost(post)
    setShowForm(false)
    setEditingPost(null)
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setShowForm(true)
    setSelectedPost(null)
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingPost(null)
    refetch()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  if (loading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
      <div className="page-layout">
        <Header />
        <div className="main-content">
          <Navigation />

          <div className="content-area">
            <div className="page-header">
              <h2>My Posts</h2>
              <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setSelectedPost(null)
                    setEditingPost(null)
                  }}
                  className="add-button"
              >
                {showForm ? 'Cancel' : 'Add Post'}
              </button>
            </div>

            <div className="posts-layout">
              <div className="posts-sidebar">
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

                <PostList
                    posts={filteredPosts}
                    selectedPost={selectedPost}
                    onPostSelect={handlePostSelect}
                    onEditPost={handleEditPost}
                    onUpdate={refetch}
                />
              </div>

              <div className="posts-main">
                {showForm ? (
                    <PostForm
                        post={editingPost}
                        onSubmit={handleFormSubmit}
                        onCancel={handleFormCancel}
                    />
                ) : selectedPost ? (
                    <PostDetail
                        post={selectedPost}
                        onUpdate={refetch}
                    />
                ) : (
                    <div className="empty-state">
                      <p>Select a post to view details or create a new post.</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PostsPage

