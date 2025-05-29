import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register.jsx'
import Home from './pages/Home'
import TodosPage from './pages/TodosPage'
import PostsPage from './pages/PostsPage'
import AlbumsPage from './pages/AlbumsPage'

function App() {
  const { user } = useAuthContext()

  return (
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route
              path="/login"
              element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
              path="/register"
              element={user ? <Navigate to="/home" /> : <Register />}
          />

          {/* Protected routes */}
          <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
              path="/todos"
              element={user ? <TodosPage /> : <Navigate to="/login" />}
          />
          <Route
              path="/posts"
              element={user ? <PostsPage /> : <Navigate to="/login" />}
          />
          <Route
              path="/albums"
              element={user ? <AlbumsPage /> : <Navigate to="/login" />}
          />

          {/* Default redirect */}
          <Route
              path="/"
              element={<Navigate to={user ? "/home" : "/login"} />}
          />
        </Routes>
      </div>
  )
}

export default App

