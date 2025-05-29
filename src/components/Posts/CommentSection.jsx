import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

function CommentSection({ postId, comments, onUpdate }) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [editingComment, setEditingComment] = useState(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddComment = async (e) => {
    e.preventDefault()
    
    if (!newComment.trim()) {
      alert('Please enter a comment')
      return
    }

    try {
      setLoading(true)
      await api.createComment({
        postId: postId,
        userId: user.id,
        name: user.name,
        email: user.email,
        body: newComment.trim()
      })
      
      setNewComment('')
      onUpdate()
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment')
    } finally {
      setLoading(false)
    }
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment.id)
    setEditText(comment.body)
  }

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) {
      alert('Comment cannot be empty')
      return
    }

    try {
      setLoading(true)
      const comment = comments.find(c => c.id === commentId)
      await api.updateComment(commentId, {
        ...comment,
        body: editText.trim()
      })
      
      setEditingComment(null)
      setEditText('')
      onUpdate()
    } catch (error) {
      console.error('Error updating comment:', error)
      alert('Failed to update comment')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }

    try {
      setLoading(true)
      await api.deleteComment(commentId)
      onUpdate()
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingComment(null)
    setEditText('')
  }

  return (
    <div className="comment-section">
      {/* Add new comment form */}
      <form onSubmit={handleAddComment} className="comment-form">
        <div className="form-group">
          <label htmlFor="newComment">Add a comment:</label>
          <textarea
            id="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="comment-textarea"
            rows={3}
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>

      {/* Comments list */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-email">({comment.email})</span>
                {comment.userId === user.id && (
                  <div className="comment-actions">
                    <button 
                      onClick={() => handleEditComment(comment)}
                      className="action-button edit"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(comment.id)}
                      className="action-button delete"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              
              <div className="comment-body">
                {editingComment === comment.id ? (
                  <div className="comment-edit">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="comment-edit-textarea"
                      rows={3}
                    />
                    <div className="comment-edit-actions">
                      <button 
                        onClick={() => handleSaveEdit(comment.id)}
                        className="action-button save"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="action-button cancel"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.body}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection