import React from 'react';
import { motion} from 'framer-motion';
import { ThumbsUp, MessageCircle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { likePost, removeLike } from '../store/PostData';
axios.defaults.withCredentials = true;

// PostCard component
const PostCard = ({ post , userId}) => 
{
  const dispatch = useDispatch();
  console.log(post);

  const likeThisPost = async(postId)=>
  {
    const data={postId}
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/likePost`,data);
      if(response?.data?.success)
      {
        const payload = {postId:post._id,userId};
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
        const payload = {postId:post._id,userId};
        dispatch(removeLike(payload))
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {post.contentUrl && (
        <img src={post.contentUrl} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-500">
              <ThumbsUp className={`h-5 w-5 mr-1 ${(post.likes.includes(userId))?"text-red-500":""}`} 
                onClick={()=>{
                  if(!post.likes.includes(userId))
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
            <span className="flex items-center text-gray-500">
              <MessageCircle className="h-5 w-5 mr-1" />
              {post.comments.length}
            </span>
          </div>
          <span className="text-sm text-gray-500">{post.categories[0]}</span>
        </div>
        <motion.button
          className="mt-4 text-blue-600 hover:text-blue-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate(`/posts/onePostPage/${post._id}`)}
        >
          read more
        </motion.button>
      </div>
    </motion.div>
  );

}

export {PostCard};