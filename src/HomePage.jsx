import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Navbar component
const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.img
            src="/logo.png" // Replace with your actual logo
            alt="Role Vista Logo"
            className="h-8 w-8"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.a href="/" className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
            Role Vista
          </motion.a>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/posts">Posts</NavLink>
          <NavLink href="/about">About Us</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="rounded-full overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={user.avatar} alt={user.name} className="h-8 w-8 object-cover" />
              </motion.button>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <DropdownItem href="/profile">Profile</DropdownItem>
                  <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                  <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// NavLink component
const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="hover:text-gray-300 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

// DropdownItem component
const DropdownItem = ({ href, onClick, children }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    whileHover={{ backgroundColor: '#f3f4f6' }}
  >
    {children}
  </motion.a>
);

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

// Footer component
const Footer = () => (
  <footer className="bg-gray-800 text-white p-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">About Role Vista</h3>
        <p>Role Vista is a platform where users can share posts, comment, and like content based on their roles and permissions.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/posts" className="hover:text-gray-300">Posts</a></li>
          <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
          <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Facebook</a>
          <a href="#" className="hover:text-gray-300">Twitter</a>
          <a href="#" className="hover:text-gray-300">LinkedIn</a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center text-sm">
      © 2023 Role Vista. All rights reserved.
    </div>
  </footer>
);

// Main HomePage component
const HomePage = () => {
  const [user, setUser] = useState(null); // In a real app, you'd manage this with proper auth
  const [posts, setPosts] = useState([
    { id: 1, title: "First Post", content: "This is the first post content.", author: "John Doe", date: "2023-05-01" },
    { id: 2, title: "Second Post", content: "This is the second post content.", author: "Jane Smith", date: "2023-05-02" },
    // Add more posts as needed
  ]);

  const handleLogin = () => {
    // Simulating login
    setUser({ name: "John Doe", avatar: "https://placekitten.com/100/100", role: "Student" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
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
            <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
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
      <Footer />
    </div>
  );
};

export default HomePage;

