import React, { useState } from 'react'
import { api } from '../../services/api'

function TodoItem({ todo, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [loading, setLoading] = useState(false)

  const handleToggleComplete = async () => {
    try {
      setLoading(true)
      await api.updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed
      })
      onUpdate()
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Failed to update todo')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty')
      return
    }

    try {
      setLoading(true)
      await api.updateTodo(todo.id, {
        ...todo,
        title: editTitle.trim()
      })
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Failed to update todo')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return
    }

    try {
      setLoading(true)
      await api.deleteTodo(todo.id)
      onUpdate()
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Failed to delete todo')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={loading}
          />
        </div>

        <div className="todo-info">
          <div className="todo-id">#{todo.id}</div>
          
          {isEditing ? (
            <div className="todo-edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="todo-edit-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit()
                  if (e.key === 'Escape') handleCancelEdit()
                }}
                autoFocus
              />
            </div>
          ) : (
            <div className="todo-title">{todo.title}</div>
          )}
        </div>
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              onClick={handleSaveEdit}
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
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              className="action-button edit"
              disabled={loading}
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="action-button delete"
              disabled={loading}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem