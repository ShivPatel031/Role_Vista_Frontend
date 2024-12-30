// import { NavLink } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../store/userStatus';
// import { useNavigate } from 'react-router-dom';
// import { clearAllPosts } from '../store/PostData';
// axios.defaults.withCredentials=true;

// // Navbar component
// const Navbar = () => { 

//     const user = useSelector(state=>state.user.status)

//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const logoutUser = async()=>
//     {
//       try {

//         const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/logout`);

//         if(response?.data?.success)
//         {
//           dispatch(logout());

//           dispatch(clearAllPosts());

//           navigate("/");
//         }
        
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     return (
//       <nav className="bg-gray-800 text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <motion.img
//               src="/Role vista Logo.png" // Replace with your actual logo
//               alt="Role Vista Logo"
//               className="h-8 w-8"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             />
//             <motion.a href="/" className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
//               Role Vista
//             </motion.a>
//           </div>
//           <div className="flex items-center space-x-4">
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/posts">Posts</NavLink>
//             <NavLink to="/about">About Us</NavLink>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <div className="relative">
//                 <motion.button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="rounded-full overflow-hidden"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <img src={user.avatar || "./user.png"} alt={user.name} className="h-8 w-8 object-cover" />
//                 </motion.button>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
//                   >
//                     <DropdownItem href="/profile">Profile</DropdownItem>
//                     <DropdownItem href="/dashboard">Dashboard</DropdownItem>
//                     <DropdownItem onClick={()=>logoutUser()}>Logout</DropdownItem>
//                   </motion.div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <NavLink to="/login" className="hover:text-gray-300 transition-colors duration-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Login</NavLink>
//                 <NavLink to="/register" className="hover:text-gray-300 transition-colors duration-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Register</NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     );
//   };
  
//   // DropdownItem component
//   const DropdownItem = ({ href, onClick, children }) => (
//     <NavLink
//       to={href}
//       onClick={onClick}
//       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//       whileHover={{ backgroundColor: '#f3f4f6' }}
//     >
//       {children}
//     </NavLink>
//   );

//   export {Navbar};

import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userStatus';
import { useNavigate } from 'react-router-dom';
import { clearAllPosts } from '../store/PostData';

axios.defaults.withCredentials = true;

// Navbar component
const Navbar = () => {
  const user = useSelector(state => state.user.status);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/logout`);
      if (response?.data?.success) {
        dispatch(logout());
        dispatch(clearAllPosts());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.img
              src="/Role vista Logo.png"
              alt="Role Vista Logo"
              className="h-8 w-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.a href="/" className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
              Role Vista
            </motion.a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className="hover:text-gray-300 transition-colors duration-200">Home</NavLink>
            <NavLink to="/posts" className="hover:text-gray-300 transition-colors duration-200">Posts</NavLink>
            <NavLink to="/about" className="hover:text-gray-300 transition-colors duration-200">About Us</NavLink>
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="rounded-full overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={"./user.png"} alt={user.name} className="h-8 w-8 object-cover" />
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    >
                      <DropdownItem href="/profile">Profile</DropdownItem>
                      <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                      <DropdownItem onClick={logoutUser}>Logout</DropdownItem>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
              <button
              onClick={()=>navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <NavLink to="/login" className="hover:text-gray-300 transition-colors duration-200">Login</NavLink>
            </button>
            <button
              onClick={()=>navigate('/register')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              <NavLink to="/register" className="hover:text-gray-300 transition-colors duration-200">Register</NavLink>
            </button>
                
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-2">
                <NavLink to="/" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Home</NavLink>
                <NavLink to="/posts" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Posts</NavLink>
                <NavLink to="/about" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>About Us</NavLink>
                {user ? (
                  <>
                    <NavLink to="/profile" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Profile</NavLink>
                    <NavLink to="/dashboard" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Dashboard</NavLink>
                    <button onClick={() => { logoutUser(); closeMobileMenu(); }} className="text-left hover:text-gray-300 transition-colors duration-200">Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Login</NavLink>
                    <NavLink to="/register" className="hover:text-gray-300 transition-colors duration-200" onClick={closeMobileMenu}>Register</NavLink>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
  >
    {children}
  </NavLink>
);

export { Navbar };

