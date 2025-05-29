// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUsersByUsername } from '../services/api.js';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const users = await fetchUsersByUsername(username);
      // api.js stores password under "website"
      const match = users.find(u => u.website === password);
      if (match) {
        localStorage.setItem('user', JSON.stringify(match));
        nav('/home');
      } else {
        setError('שם משתמש או סיסמה שגויים');
      }
    } catch {
      setError('בעיה בשרת, נסה שוב');
    }
  }

  return (
    <div className="form-container">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text" value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
      <p>אין לך חשבון? <Link to="/register">הרשם כאן</Link></p>
    </div>
  );
}
