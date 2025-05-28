import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
      let res = await fetch(
        `http://localhost:3000/users?username=${encodeURIComponent(username)}`
      );
      let users = await res.json();
      if (users.length) {
        setError('שם משתמש זה כבר קיים');
        return;
      }
      res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const newUser = await res.json();
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

        <label>Verify Password</label>
        <input
          type="password"
          value={verifyPassword}
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
// This code defines a registration page using React.
// It includes a form for entering a username and password, checks for existing users, and handles submission to create a new user account.