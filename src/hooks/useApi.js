import { useState, useEffect } from 'react'
import { api } from '../services/api'

export function useApi(endpoint, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let result
      switch (endpoint) {
        case 'todos':
          result = await api.getTodos(params.userId)
          break
        case 'posts':
          result = await api.getPosts(params.userId)
          break
        case 'albums':
          result = await api.getAlbums(params.userId)
          break
        case 'comments':
          result = await api.getComments(params.postId)
          break
        case 'photos':
          result = await api.getPhotos(params.albumId)
          break
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`)
      }
      
      setData(result)
    } catch (err) {
      setError(err.message)
      console.error(`Error fetching ${endpoint}:`, err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, JSON.stringify(params)])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

// Specialized hooks for common use cases
export function useTodos(userId) {
  return useApi('todos', { userId })
}

export function usePosts(userId) {
  return useApi('posts', { userId })
}

export function useAlbums(userId) {
  return useApi('albums', { userId })
}

export function useComments(postId) {
  return useApi('comments', { postId })
}

export function usePhotos(albumId) {
  return useApi('photos', { albumId })
}