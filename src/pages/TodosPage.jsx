import React, { useState, useMemo } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useTodos } from '../hooks/useApi'
import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import TodoList from '../components/Todos/TodoList'
import TodoForm from '../components/Todos/TodoForm'

function TodosPage() {
  const { user } = useAuthContext()
  const { data: todos, loading, error, refetch } = useTodos(user.id)

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('title')
  const [sortBy, setSortBy] = useState('id')
  const [showForm, setShowForm] = useState(false)

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    if (!todos) return []

    let filtered = todos.filter(todo => {
      if (!searchTerm) return true

      switch (searchBy) {
        case 'id':
          return todo.id.toString().includes(searchTerm)
        case 'title':
          return todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        case 'completed':
          const isCompleted = searchTerm.toLowerCase() === 'true' || searchTerm.toLowerCase() === 'completed'
          const isNotCompleted = searchTerm.toLowerCase() === 'false' || searchTerm.toLowerCase() === 'pending'
          return isCompleted ? todo.completed : isNotCompleted ? !todo.completed : false
        default:
          return true
      }
    })

    // Sort todos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return a.id - b.id
        case 'title':
          return a.title.localeCompare(b.title)
        case 'completed':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1
        default:
          return 0
      }
    })

    return filtered
  }, [todos, searchTerm, searchBy, sortBy])

  if (loading) return <div className="loading">Loading todos...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
      <div className="page-layout">
        <Header />
        <div className="main-content">
          <Navigation />

          <div className="content-area">
            <div className="page-header">
              <h2>My Todos</h2>
              <button
                  onClick={() => setShowForm(!showForm)}
                  className="add-button"
              >
                {showForm ? 'Cancel' : 'Add Todo'}
              </button>
            </div>

            {showForm && (
                <TodoForm
                    onSubmit={() => {
                      setShowForm(false)
                      refetch()
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="filters-section">
              <div className="search-controls">
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="filter-select"
                >
                  <option value="title">Search by Title</option>
                  <option value="id">Search by ID</option>
                  <option value="completed">Search by Status</option>
                </select>

                <input
                    type="text"
                    placeholder={`Search ${searchBy}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
              </div>

              <div className="sort-controls">
                <label>Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                >
                  <option value="id">ID</option>
                  <option value="title">Title</option>
                  <option value="completed">Completion Status</option>
                </select>
              </div>
            </div>

            <div className="todos-stats">
              <span>Total: {filteredAndSortedTodos.length}</span>
              <span>Completed: {filteredAndSortedTodos.filter(t => t.completed).length}</span>
              <span>Pending: {filteredAndSortedTodos.filter(t => !t.completed).length}</span>
            </div>

            <TodoList
                todos={filteredAndSortedTodos}
                onUpdate={refetch}
            />
          </div>
        </div>
      </div>
  )
}

export default TodosPage

