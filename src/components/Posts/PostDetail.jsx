import React, { useState } from 'react'
import { useComments } from '../../hooks/useApi'
import CommentSection from './CommentSection'

function PostDetail({ post, onUpdate }) {
  const [showComments, setShowComments] = useState(false)
  const { data: comments, loading: commentsLoading, refetch: refetchComments } = useComments(post.id)

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h3>Post #{post.id}</h3>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="comments-toggle"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'} 
          {comments && ` (${comments.length})`}
        </button>
      </div>

      <div className="post-detail-content">
        <h4 className="post-title">{post.title}</h4>
        <div className="post-body">
          {post.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {showComments && (
        <div className="post-comments-section">
          <h4>Comments</h4>
          {commentsLoading ? (
            <div className="loading">Loading comments...</div>
          ) : (
            <CommentSection 
              postId={post.id}
              comments={comments || []}
              onUpdate={refetchComments}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default PostDetail