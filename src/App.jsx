import React, { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== verifyPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    // ... rest of logic
  };

  // ✅ Function components return JSX directly
  return (
      <div className="form-container">
        <h2>הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
          />
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
          />
          <input
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder="Verify Password"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
  );
}