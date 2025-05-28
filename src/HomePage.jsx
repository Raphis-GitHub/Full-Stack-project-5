import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  function logout() {
    localStorage.removeItem('user');
    nav('/login');
  }

  return (
    <div className="home-container">
      <h2>ברוכים הבאים, {user?.username}</h2>
      <nav>
        <Link to="/albums">Albums</Link> |{' '}
        <Link to="/posts">Posts</Link> |{' '}
        <Link to="/todos">Todos</Link> |{' '}
        <Link to="/info">Info</Link> |{' '}
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
