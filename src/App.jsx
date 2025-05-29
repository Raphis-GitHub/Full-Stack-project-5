// import React, { useState } from 'react';

// export default function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [verifyPassword, setVerifyPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== verifyPassword) {
//       setError('הסיסמאות אינן תואמות');
//       return;
//     }
//     // ... rest of logic
//   };

//   // ✅ Function components return JSX directly
//   return (
//       <div className="form-container">
//         <h2>הרשמה</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//           />
//           <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//           />
//           <input
//               type="password"
//               value={verifyPassword}
//               onChange={(e) => setVerifyPassword(e.target.value)}
//               placeholder="Verify Password"
//           />
//           {error && <p className="error">{error}</p>}
//           <button type="submit">Register</button>
//         </form>
//       </div>
//   );
// }

import React, { useState } from 'react';
import './styles.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage    from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage     from './pages/HomePage.jsx';
import AlbumsPage   from './pages/AlbumsPage.jsx';
import PostsPage    from './pages/PostsPage.jsx';
import TodosPage    from './pages/TodosPage.jsx';
import InfoPage     from './pages/InfoPage.jsx';

function ProtectedRoute({ children }) {
  return localStorage.getItem('user')
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home"     element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }/>

        <Route path="/albums"   element={
          <ProtectedRoute>
            <AlbumsPage />
          </ProtectedRoute>
        }/>
        <Route path="/posts"    element={
          <ProtectedRoute>
            <PostsPage />
          </ProtectedRoute>
        }/>
        <Route path="/todos"    element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        }/>
        <Route path="/info"     element={
          <ProtectedRoute>
            <InfoPage />
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
// This code sets up a React application with routing using React Router.
// It includes protected routes that require user authentication to access certain pages.
// The `ProtectedRoute` component checks if a user is logged in by looking for a `user` item in local storage.
// If the user is not logged in, it redirects them to the login page.
// The application has routes for login, registration, home, albums, posts, todos, and info pages.
// The `Navigate` component is used to redirect users to the login page if they try to access a protected route without being authenticated.
// The `BrowserRouter` component wraps the entire application to enable routing functionality.
// The `Routes` component defines the different routes in the application, mapping paths to their respective components.
// The `element` prop in each `Route` specifies the component to render when the route matches.