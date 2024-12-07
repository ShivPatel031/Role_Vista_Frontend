import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from './store/userStatus';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials=true;

// Navbar component
const Navbar = ({userInfo}) => {

    const [user,setUser] = useState(userInfo);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = async()=>
    {
      try {

        const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/logout`);

        if(response?.data?.success)
        {
          dispatch(logout());

          navigate("/");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  
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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/about">About Us</NavLink>
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
                    <DropdownItem onClick={()=>logoutUser()}>Logout</DropdownItem>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-gray-300 transition-colors duration-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Login</NavLink>
                <NavLink to="/register" className="hover:text-gray-300 transition-colors duration-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
  // DropdownItem component
  const DropdownItem = ({ href, onClick, children }) => (
    <NavLink
      to={href}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      whileHover={{ backgroundColor: '#f3f4f6' }}
    >
      {children}
    </NavLink>
  );

  export {Navbar};