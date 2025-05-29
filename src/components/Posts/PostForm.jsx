import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

function PostForm({ post, onSubmit, onCancel }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  })
  const [loading, setLoading] = useState(false)
  
  const isEditing = !!post

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body
      })
    }
  }, [post])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.body.trim()) {
      alert('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      
      const postData = {
        ...formData,
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: user.id
      }

      if (isEditing) {
        await api.updatePost(post.id, { ...post, ...postData })
      } else {
        await api.createPost(postData)
      }
      
      setFormData({ title: '', body: '' })
      onSubmit()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-form-container">
      <h3>{isEditing ? 'Edit Post' : 'Create New Post'}</h3>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title..."
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your post content..."
            className="form-textarea"
            rows={10}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
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

export default PostForm