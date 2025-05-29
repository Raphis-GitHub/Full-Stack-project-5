// API service for communicating with JSON Server
const API_BASE_URL = 'http://localhost:3000'

class ApiService {
    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // User methods
    async getUsers() {
        return this.request('/users')
    }

    async getUserById(id) {
        return this.request(`/users/${id}`)
    }

    async createUser(user) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(user),
        })
    }

    // Todo methods
    async getTodos(userId = null) {
        const endpoint = userId ? `/todos?userId=${userId}` : '/todos'
        return this.request(endpoint)
    }

    async createTodo(todo) {
        return this.request('/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
        })
    }

    async updateTodo(id, todo) {
        return this.request(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
        })
    }

    async deleteTodo(id) {
        return this.request(`/todos/${id}`, {
            method: 'DELETE',
        })
    }

    // Post methods
    async getPosts(userId = null) {
        const endpoint = userId ? `/posts?userId=${userId}` : '/posts'
        return this.request(endpoint)
    }

    async getPostById(id) {
        return this.request(`/posts/${id}`)
    }

    async createPost(post) {
        return this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        })
    }

    async updatePost(id, post) {
        return this.request(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        })
    }

    async deletePost(id) {
        return this.request(`/posts/${id}`, {
            method: 'DELETE',
        })
    }

    // Comment methods
    async getComments(postId = null) {
        const endpoint = postId ? `/comments?postId=${postId}` : '/comments'
        return this.request(endpoint)
    }

    async createComment(comment) {
        return this.request('/comments', {
            method: 'POST',
            body: JSON.stringify(comment),
        })
    }

    async updateComment(id, comment) {
        return this.request(`/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(comment),
        })
    }

    async deleteComment(id) {
        return this.request(`/comments/${id}`, {
            method: 'DELETE',
        })
    }

    // Album methods
    async getAlbums(userId = null) {
        const endpoint = userId ? `/albums?userId=${userId}` : '/albums'
        return this.request(endpoint)
    }

    async getAlbumById(id) {
        return this.request(`/albums/${id}`)
    }

    async createAlbum(album) {
        return this.request('/albums', {
            method: 'POST',
            body: JSON.stringify(album),
        })
    }

    async updateAlbum(id, album) {
        return this.request(`/albums/${id}`, {
            method: 'PUT',
            body: JSON.stringify(album),
        })
    }

    async deleteAlbum(id) {
        return this.request(`/albums/${id}`, {
            method: 'DELETE',
        })
    }

    // Photo methods
    async getPhotos(albumId = null) {
        const endpoint = albumId ? `/photos?albumId=${albumId}` : '/photos'
        return this.request(endpoint)
    }

    async createPhoto(photo) {
        return this.request('/photos', {
            method: 'POST',
            body: JSON.stringify(photo),
        })
    }

    async updatePhoto(id, photo) {
        return this.request(`/photos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(photo),
        })
    }

    async deletePhoto(id) {
        return this.request(`/photos/${id}`, {
            method: 'DELETE',
        })
    }
}

export const api = new ApiService()