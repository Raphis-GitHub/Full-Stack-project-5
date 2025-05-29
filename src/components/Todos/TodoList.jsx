import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onUpdate }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found. Create your first todo to get started!</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default TodoList