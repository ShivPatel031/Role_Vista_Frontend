import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';
import { PostCard } from './PostCard';
import { useSelector } from 'react-redux';



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


const Posts = () => {
  const fetchedPosts = useSelector((state) => state?.posts?.posts || []);
  const userId = useSelector((state) => state?.user?.userData?._id);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterOption, setFilterOption] = useState('Latest');

  useEffect(() => {
    const sorted = [...fetchedPosts];
    switch (filterOption) {
      case 'Most Liked':
        sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'Most Commented':
        sorted.sort((a, b) => (b.comments || 0) - (a.comments || 0));
        break;
      case 'Oldest':
        sorted.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
        break;
      default: // Latest
        sorted.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    setFilteredPosts(sorted);
  }, [filterOption, fetchedPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id || post._id} post={post} userId={userId} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-screen">No posts available.</p>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export { Posts };

