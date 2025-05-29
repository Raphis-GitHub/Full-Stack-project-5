// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUsersByUsername, createUser } from '../services/api.js';

export default function RegisterPage() {
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [verifyPassword, setVerify] = useState('');
  const [error, setError]           = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password !== verifyPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    try {
      const exists = await fetchUsersByUsername(username);
      if (exists.length) {
        setError('שם משתמש זה כבר קיים');
        return;
      }
      // note: api.createUser stores password under "website"
      const newUser = await createUser(username, password);
      localStorage.setItem('user', JSON.stringify(newUser));
      nav('/home');
    } catch {
      setError('בעיה בשרת, נסה שוב');
    }
  }

  return (
    <div className="form-container">
      <h2>הרשמה</h2>
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

        <label>Verify Password</label>
        <input
          type="password" value={verifyPassword}
          onChange={e => setVerify(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>
      <p>כבר רשום? <Link to="/login">התחבר כאן</Link></p>
    </div>
  );
}
// This component handles user registration.
// It allows users to create a new account by entering a username and password.