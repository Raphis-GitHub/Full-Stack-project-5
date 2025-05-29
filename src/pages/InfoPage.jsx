// src/pages/InfoPage.jsx
import React from 'react';

export default function InfoPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="home-container">
      <h2>פרטי המשתמש</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.website}</p>
    </div>
  );
}
//         <Route path="/albums"  element={
//           <ProtectedRoute>   