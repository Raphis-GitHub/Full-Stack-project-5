import React from 'react'
import PostItem from './PostItem'

function PostList({ posts, selectedPost, onPostSelect, onEditPost, onUpdate }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts found.</p>
      </div>
    )
  }

  return (
    <div className="post-list">
      <h3>Posts ({posts.length})</h3>
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          isSelected={selectedPost && selectedPost.id === post.id}
          onSelect={() => onPostSelect(post)}
          onEdit={() => onEditPost(post)}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default PostList