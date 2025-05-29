// src/services/api.js
const API_BASE = '/api'

// Verify user authentication from localStorage
async function authenticate(userId) {
    const userData = localStorage.getItem('user')
    if (!userData) {
        throw new Error('User not authenticated')
    }
    if (userId && JSON.parse(userData).id !== userId) {
        throw new Error('User ID mismatch')
    }
}

// Helper function to handle response errors
async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
}

// ==== USER OPERATIONS ====
export async function fetchUsers() {
    const response = await fetch(`${API_BASE}/users`)
    return handleResponse(response)
}

export async function fetchUsersByUsername(username) {
    const encodedUsername = encodeURIComponent(username) // Handle special chars
    const response = await fetch(`${API_BASE}/users?username=${encodedUsername}`)
    return handleResponse(response)
}

export async function createUser(username, password) {
    const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    return handleResponse(response)
}

export async function updateUser(id, data) {
    const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

// ==== TODO OPERATIONS ====
export async function fetchUserTodos(userId) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/todos?userId=${userId}`)
    return handleResponse(response)
}

export async function createTodo(userId, title, completed = false) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, completed })
    })
    return handleResponse(response)
}

export async function updateTodo(id, data) {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function deleteTodo(id) {
    const response = await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
    if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`)
    }
}

// ==== POST & COMMENT OPERATIONS ====
export async function fetchUserPosts(userId) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/posts?userId=${userId}`)
    return handleResponse(response)
}

export async function fetchAllPosts() {
    const response = await fetch(`${API_BASE}/posts`)
    return handleResponse(response)
}

export async function createPost(userId, title, body) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, body })
    })
    return handleResponse(response)
}

export async function updatePost(id, data) {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

// Remove post and all related comments
export async function deletePost(id) {
    try {
        // Get all comments for this post
        const commentsResponse = await fetch(`${API_BASE}/comments?postId=${id}`)
        const comments = await handleResponse(commentsResponse)

        // Delete all comments in parallel
        await Promise.all(
            comments.map(comment =>
                fetch(`${API_BASE}/comments/${comment.id}`, { method: 'DELETE' })
            )
        )

        // Delete the post
        const response = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.status}`)
        }
    } catch (error) {
        throw new Error(`Failed to delete post and comments: ${error.message}`)
    }
}

export async function fetchPostComments(postId) {
    const response = await fetch(`${API_BASE}/comments?postId=${postId}`)
    return handleResponse(response)
}

export async function createComment(comment) {
    const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    return handleResponse(response)
}

export async function updateComment(id, data) {
    const response = await fetch(`${API_BASE}/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function deleteComment(id) {
    const response = await fetch(`${API_BASE}/comments/${id}`, { method: 'DELETE' })
    if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.status}`)
    }
}

// ==== ALBUM & PHOTO OPERATIONS ====
export async function fetchUserAlbums(userId) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/albums?userId=${userId}`)
    return handleResponse(response)
}

export async function createAlbum(userId, title) {
    await authenticate(userId)
    const response = await fetch(`${API_BASE}/albums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title })
    })
    return handleResponse(response)
}

export async function updateAlbum(id, data) {
    const response = await fetch(`${API_BASE}/albums/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

// Remove album and all related photos
export async function deleteAlbum(id) {
    try {
        // Get all photos in this album
        const photosResponse = await fetch(`${API_BASE}/photos?albumId=${id}`)
        const photos = await handleResponse(photosResponse)

        // Delete all photos in parallel
        await Promise.all(
            photos.map(photo =>
                fetch(`${API_BASE}/photos/${photo.id}`, { method: 'DELETE' })
            )
        )

        // Delete the album
        const response = await fetch(`${API_BASE}/albums/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error(`Failed to delete album: ${response.status}`)
        }
    } catch (error) {
        throw new Error(`Failed to delete album and photos: ${error.message}`)
    }
}

export async function fetchAlbumPhotos(albumId) {
    const response = await fetch(`${API_BASE}/photos?albumId=${albumId}`)
    return handleResponse(response)
}

export async function createPhoto(albumId, title, url, thumbnailUrl) {
    const response = await fetch(`${API_BASE}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            albumId,
            title,
            url,
            thumbnailUrl
        })
    })
    return handleResponse(response)
}

export async function updatePhoto(id, data) {
    const response = await fetch(`${API_BASE}/photos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return handleResponse(response)
}

export async function deletePhoto(id) {
    const response = await fetch(`${API_BASE}/photos/${id}`, { method: 'DELETE' })
    if (!response.ok) {
        throw new Error(`Failed to delete photo: ${response.status}`)
    }
}