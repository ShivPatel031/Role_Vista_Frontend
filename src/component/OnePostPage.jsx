import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbsUp } from 'lucide-react';
import { addComment, likePost, removeComment, removeLike, removeOnePost } from '../store/PostData';

const OnePostPage = () => {
    const {id} = useParams();
    const user = useSelector(state=>state?.user?.userData);
    const posts = useSelector(state=>state?.posts?.posts);
    const post = posts?.length === 0 ? null : posts.filter(p=>p._id===id)[0];
  console.log(post);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeThisPost = async(postId)=>
  {
    const data={postId}
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/likePost`,data);
      if(response?.data?.success)
      {
        const payload = {postId:post._id,userId:user._id};
        dispatch(likePost(payload))
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeThisLike = async(postId)=>
  {
    const data={postId}
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/removeLike`,data);
      if(response?.data?.success)
      {
        const payload = {postId:post._id,userId:user._id};
        dispatch(removeLike(payload))
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
        const data = {postId :post._id,comment:newComment}
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/comments/doComment`, data );
      if(response?.data?.success)
      {
        dispatch(addComment({userId:user._id,postId:post._id,comment:newComment,_id:response.data.data._id}));
        setNewComment('');
      }
      
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/comments/deleteComment`,{commentId});
      if(response?.data?.success)
      {
        dispatch(removeComment({postId:post._id,commentId}));
      }
    } catch (error) {
      console.error('Error removing comment:', error);
      alert('Failed to remove comment. Please try again.');
    }
  };

  const handleRemovePost = async () => {
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/removePost`,{postId:post._id});
        if(response?.data?.success)
        {
            dispatch(removeOnePost({postId:post._id}));
            navigate("/posts");
        }
    } catch (error) {
    console.error('Error removing post:', error);
    alert('Failed to remove post. Please try again.');
    }
  };

//   if (isLoading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-4">Post not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.contentUrl && (
        <img 
          src={post.contentUrl} 
          alt={post.title} 
          className="w-full h-64 object-cover mb-4" 
        />
      )}
      <p className="text-gray-700 mb-4">{post.description}</p>
      <div className="flex items-center mb-4">
        <span className="mr-2">Categories:</span>
        {post.categories && post.categories.length > 0 ? (
          post.categories.map((category, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm mr-2">{category}</span>
          ))
        ) : (
          <span className="text-gray-500">No categories</span>
        )}
      </div>
      <div className="flex items-center mb-4">
      <span className="flex items-center text-gray-500">
              <ThumbsUp className={`h-5 w-5 mr-1 ${(post.likes.includes(user._id))?"text-red-500":""}`} 
                onClick={()=>{
                  if(!post.likes.includes(user._id))
                  {
                    return likeThisPost(post._id);
                  }
                  else
                  {
                    return removeThisLike(post._id);
                  }
                  }}/>
              {post.likes.length}
            </span>
        {/* <span className="mr-2">Likes:</span>
        <span>{post.likes ? post.likes.length : 0}</span> */}
      </div>
      {(user.role === 'admin' || (user.role === 'sub-admin' && user.branch === post.userId.branch)) && <button 
        onClick={handleRemovePost} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
        aria-label="Remove post"
      >
        Remove Post
      </button>}
      

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {post.enableComment ? (
        <>
          <form onSubmit={handleAddComment} className="mb-4">
            <label htmlFor="newComment" className="sr-only">Add a comment</label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded"
              maxLength={200}
              required
            />
            <button 
              type="submit" 
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!newComment.trim()}
            >
              Add Comment
            </button>
          </form>
          <div>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-100 p-4 rounded mb-2">
                  <p>{comment.comment}</p>
                  {(user.role === 'admin' || (user.role === 'sub-admin' && user.branch === post.userId.branch)) && <button 
                    onClick={() => handleRemoveComment(comment._id)} 
                    className="text-red-500 mt-2"
                    aria-label="Remove comment"
                  >
                    Remove
                  </button>}
                  
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Comments are disabled for this post.</p>
      )}
    </div>
  );
};

export {OnePostPage};

