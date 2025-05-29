// src/pages/PostsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserPosts } from '../services/api.js';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchUserPosts(user.id);
        setPosts(list);
      } catch {
        setError('לא ניתן לטעון פוסטים');
      }
    })();
  }, [user.id]);

  return (
    <div className="home-container">
      <h2>Posts של {user.username}</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
// This component fetches and displays posts for the logged-in user.
// It uses the `fetchUserPosts` function to get the posts from the API and displays them in a list.