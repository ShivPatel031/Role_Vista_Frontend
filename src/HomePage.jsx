import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostCard } from './component/PostCard';


// Main HomePage component
const HomePage = () => {
  const userInfo = useSelector(state=>state.user);
  const user = userInfo.status ? userInfo.userData : null;
  const postInfo =  useSelector(state=>state?.posts?.posts);

  const post = postInfo ? postInfo.slice(0,5) : [];

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Role Vista</h1>
          <p className="text-xl text-gray-600">
            Share your thoughts, engage with others, and explore content tailored to your role.
          </p>
        </motion.section>

        {user ? (
          <motion.div
            className="bg-blue-100 p-4 rounded-lg mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Welcome, {user.userName}!</h2>
            <p className="text-gray-600">Your role: {user.role}</p>
          </motion.div>
        ) : (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={()=>navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login to see your profile
            </button>
          </motion.div>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.length !== 0 ? post.map(p=><PostCard post={p} userId={user?._id} />):<p className="text-gray-500 text-center w-screen">No posts available.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export {HomePage};

