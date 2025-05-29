import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

function TodoForm({ onSubmit, onCancel }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Please enter a todo title')
      return
    }

    try {
      setLoading(true)
      await api.createTodo({
        userId: user.id,
        title: title.trim(),
        completed: false
      })
      
      setTitle('')
      onSubmit()
    } catch (error) {
      console.error('Error creating todo:', error)
      alert('Failed to create todo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="todo-form-container">
      <h3>Add New Todo</h3>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">Todo Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
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
            {loading ? 'Creating...' : 'Create Todo'}
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

export default TodoForm