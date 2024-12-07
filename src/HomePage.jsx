import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';


// Post component
const Post = ({ post }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md mb-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold">{post.title}</h3>
    <p className="text-gray-600">{post.content}</p>
    <div className="mt-2 text-sm text-gray-500">
      Posted by {post.author} - {post.date}
    </div>
  </motion.div>
);

// Main HomePage component
const HomePage = ({userInfo}) => {
  const [user, setUser] = useState(userInfo.status?userInfo.userData:null); // In a real app, you'd manage this with proper auth
  const [posts, setPosts] = useState([
    { id: 1, title: "First Post", content: "This is the first post content.", author: "John Doe", date: "2023-05-01" },
    { id: 2, title: "Second Post", content: "This is the second post content.", author: "Jane Smith", date: "2023-05-02" },
    // Add more posts as needed
  ]);

  console.log(user);
  

  const handleLogin = () => {
    // Simulating login
    setUser({ name: "John Doe", avatar: "https://placekitten.com/100/100", role: "Student" });
  };

  const handleLogout = () => {
    setUser(null);
  };

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
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login to see your profile
            </button>
          </motion.div>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export {HomePage};

