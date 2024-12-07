import React from 'react';
import { motion} from 'framer-motion';
import { ThumbsUp, MessageCircle} from 'lucide-react';

// PostCard component
const PostCard = ({ post }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-500">
              <ThumbsUp className="h-5 w-5 mr-1" />
              {post.likes}
            </span>
            <span className="flex items-center text-gray-500">
              <MessageCircle className="h-5 w-5 mr-1" />
              {post.comments}
            </span>
          </div>
          <span className="text-sm text-gray-500">{post.category}</span>
        </div>
        <motion.button
          className="mt-4 text-blue-600 hover:text-blue-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See Comments
        </motion.button>
      </div>
    </motion.div>
  );

export {PostCard};