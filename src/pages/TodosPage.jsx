// src/pages/TodosPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserTodos } from '../services/api.js';

export default function TodosPage() {
  const [todos, setTodos]   = useState([]);
  const [error, setError]   = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchUserTodos(user.id);
        setTodos(list);
      } catch {
        setError('לא ניתן לטעון To-Dos');
      }
    })();
  }, [user.id]);

  return (
    <div className="home-container">
      <h2>Todos של {user.username}</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} readOnly /> {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
