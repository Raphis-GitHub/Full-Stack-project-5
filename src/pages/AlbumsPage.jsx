// src/pages/AlbumsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserAlbums } from '../services/api.js';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [error, setError]   = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchUserAlbums(user.id);
        setAlbums(list);
      } catch (e) {
        setError('לא ניתן לטעון אלבומים');
      }
    })();
  }, [user.id]);

  return (
    <div className="home-container">
      <h2>Albums של {user.username}</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {albums.map(a => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}
