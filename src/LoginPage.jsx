import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:3000/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );
      const users = await res.json();
      if (users.length === 1) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        nav('/home');
      } else {
        setError('שם משתמש או סיסמה שגויים');
      }
    } catch {
      setError('בעיה ברשת, נסה שוב');
    }
  }

  return (
    <div className="form-container">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
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
// This code defines a simple login page using React.
// It includes a form for entering a username and password, and handles submission by checking the credentials against a mock API.