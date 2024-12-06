import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ThumbsUp, MessageCircle, Filter } from 'lucide-react';

// Navbar component (reused from previous example)
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

// FilterDropdown component
const FilterDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <motion.div whileTap={{ scale: 0.95 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {selectedOption}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

// Main PostsPage component
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterOption, setFilterOption] = useState('Latest');

  useEffect(() => {
    // Simulating API call to fetch posts
    const fetchPosts = async () => {
      // Replace this with actual API call
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let sorted = [...posts];
    switch (filterOption) {
      case 'Most Liked':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case 'Most Commented':
        sorted.sort((a, b) => b.comments - a.comments);
        break;
      case 'Oldest':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default: // Latest
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredPosts(sorted);
  }, [filterOption, posts]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Posts
        </motion.h1>
        <div className="flex justify-between items-center mb-6">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">Filter by:</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FilterDropdown
              options={['Latest', 'Oldest', 'Most Liked', 'Most Commented']}
              selectedOption={filterOption}
              onSelect={setFilterOption}
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PostsPage;

