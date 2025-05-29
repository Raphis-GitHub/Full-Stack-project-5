import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'
import { api } from '../services/api'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = storage.getUser()
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      setLoading(true)
      const users = await api.getUsers()
      
      // Find user by username and verify password (using website field)
      const foundUser = users.find(
        u => u.username === username && u.website === password
      )
      
      if (foundUser) {
        setUser(foundUser)
        storage.setUser(foundUser)
        return { success: true, user: foundUser }
      } else {
        return { success: false, error: 'Invalid username or password' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const users = await api.getUsers()
      
      // Check if username already exists
      const existingUser = users.find(u => u.username === userData.username)
      if (existingUser) {
        return { success: false, error: 'Username already exists' }
      }
      
      // Create new user
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
      }
      
      const createdUser = await api.createUser(newUser)
      setUser(createdUser)
      storage.setUser(createdUser)
      
      return { success: true, user: createdUser }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    storage.removeUser()
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
  }
}

