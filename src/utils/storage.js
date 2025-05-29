// Local Storage utility functions

export const storage = {
  // Get user from localStorage
  getUser: () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error getting user from storage:', error)
      return null
    }
  },

  // Save user to localStorage
  setUser: (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error('Error saving user to storage:', error)
    }
  },

  // Remove user from localStorage
  removeUser: () => {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Error removing user from storage:', error)
    }
  },

  // Clear all data
  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }
}