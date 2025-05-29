import React, { useState } from 'react'
import { api } from '../../services/api'

function PostItem({ post, isSelected, onSelect, onEdit, onUpdate }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (e) => {
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      setLoading(true)
      await api.deletePost(post.id)
      onUpdate()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <div 
      className={`post-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="post-item-content">
        <div className="post-item-id">#{post.id}</div>
        <div className="post-item-title">{post.title}</div>
      </div>
      
      <div className="post-item-actions">
        <button 
          onClick={handleEdit}
          className="action-button edit"
          disabled={loading}
          title="Edit post"
        >
          ✏️
        </button>
        <button 
          onClick={handleDelete}
          className="action-button delete"
          disabled={loading}
          title="Delete post"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default PostItem