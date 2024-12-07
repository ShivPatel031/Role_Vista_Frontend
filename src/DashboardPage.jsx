import React, { useState } from 'react';
import { Route, NavLink, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock user roles for demonstration
const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
};

// Mock function to get user role
const getUserRole = () => USER_ROLES.ADMIN; // Change this to test different roles

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userRole = getUserRole();

  const menuItems = [
    { name: 'My Posts', path: '/dashboard/my-posts', icon: '📝', roles: [USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
    { name: 'Create Post', path: '/dashboard/create-post', icon: '✏️', roles: [USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
    { name: 'Liked Posts', path: '/dashboard/liked-posts', icon: '❤️', roles: [USER_ROLES.USER, USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
    { name: 'Restrict Student', path: '/dashboard/restrict-student', icon: '🚫', roles: [USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
    { name: 'Remove Post', path: '/dashboard/remove-post', icon: '🗑️', roles: [USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
    { name: 'Remove User', path: '/dashboard/remove-user', icon: '👤', roles: [USER_ROLES.ADMIN] },
    { name: 'Requests', path: '/dashboard/requests', icon: '📨', roles: [USER_ROLES.MODERATOR, USER_ROLES.ADMIN] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
        >
          <nav>
            {filteredMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
                    isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-lg p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Welcome, {userRole}</span>
                <button className="bg-gray-800 text-white rounded-full p-2 focus:outline-none hover:bg-gray-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <Routes>
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/liked-posts" element={<LikedPosts />} />
              <Route path="/restrict-student" element={<RestrictStudent />} />
              <Route path="/remove-post" element={<RemovePost />} />
              <Route path="/remove-user" element={<RemoveUser />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/" element={<Welcome />} />
            </Routes>
          </main>
        </div>
      </div>
  );
};

// Placeholder components for each route
const Welcome = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
    <p className="text-gray-600">Select an option from the sidebar to get started.</p>
  </motion.div>
);

const MyPosts = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
    <p className="text-gray-600">Here you can view and manage your posts.</p>
  </motion.div>
);

const CreatePost = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
    <p className="text-gray-600">Use this form to create a new post.</p>
  </motion.div>
);

const LikedPosts = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>
    <p className="text-gray-600">View the posts you've liked.</p>
  </motion.div>
);

const RestrictStudent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Restrict Student</h2>
    <p className="text-gray-600">Manage student restrictions here.</p>
  </motion.div>
);

const RemovePost = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Remove Post</h2>
    <p className="text-gray-600">Remove inappropriate or violating posts here.</p>
  </motion.div>
);

const RemoveUser = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Remove User</h2>
    <p className="text-gray-600">Manage user removals here.</p>
  </motion.div>
);

const Requests = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">Requests</h2>
    <p className="text-gray-600">View and manage incoming requests.</p>
  </motion.div>
);

export {Dashboard};
