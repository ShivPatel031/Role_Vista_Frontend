import React, { useState } from 'react';
import { Route, NavLink, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Requests } from './component/Requests';
import { CreatePost } from './component/CreatePost';
import { RestrictUser } from './component/RestrictUser';
import { RemoveUser } from './component/RemoveUsers';
import { UsersPosts } from './component/UsersPosts';
import { useSelector } from 'react-redux';
import { UserLikedPosts } from './component/LikedPost';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userRole = useSelector(state => state.user.userData.role)

  const menuItems = [
    { name: 'My Posts', path: '/dashboard', icon: '📝', roles: ['user', 'sub-admin' , 'admin'] },
    { name: 'Create Post', path: '/dashboard/create-post', icon: '✏️', roles: ['user', 'sub-admin' , 'admin'] },
    { name: 'Liked Posts', path: '/dashboard/liked-posts', icon: '❤️', roles: ['user', 'sub-admin' , 'admin'] },
    { name: 'Restrict Student', path: '/dashboard/restrict-student', icon: '🚫', roles: ['sub-admin' , 'admin'] },
    { name: 'Remove User', path: '/dashboard/remove-user', icon: '👤', roles: ['admin'] },
    { name: 'Requests', path: '/dashboard/requests', icon: '📨', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className='h-[calc(100vh-65px)]'>
      <header className="bg-white shadow-lg p-4">
            <div className="flex items-center justify-between">
              
              <h1 className="text-xl font-semibold">Dashboard</h1>
              
            </div>
      </header>
      <div className="flex h-full bg-gray-100">
        
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className={`bg-gray-800  text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
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

          {/* Content area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <Routes>
              <Route path="/" element={<MyPosts />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/liked-posts" element={<LikedPosts />} />
              <Route path="/restrict-student" element={<RestrictUser />} />
              <Route path="/remove-post" element={<RemoveUser />} />
              <Route path="/remove-user" element={<RemoveUser />} />
              <Route path="/requests" element={<Requests />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};



const MyPosts = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
    <UsersPosts />
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
    <UserLikedPosts />
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

// const RemoveUser = () => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-white p-6 rounded-lg shadow-lg"
//   >
//     <h2 className="text-2xl font-bold mb-4">Remove User</h2>
//     <p className="text-gray-600">Manage user removals here.</p>
//   </motion.div>
// );

// const UserRequest = ({requestedUser}) => {

//   return (
//     <div className='w-full flex justify-around border border-black'>
//       <p>{requestedUser.userName}</p>
//       <p>{requestedUser.role}</p>
//       <p>{requestedUser.branch}</p>
//       <button>Approve</button>
//       <button>decline</button>
//     </div>
//   )

// }

// const reqUser=[{userName:"Shiv",role:"subadmin",branch:"cse"}];

// const Requests = () => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-white p-6 rounded-lg shadow-lg w-full h-full"
//   >
//     <h2 className="text-2xl font-bold mb-4">Requests</h2>
//     <div
//       className=" h-[92%] rounded-lg bg-yellow-50 p-2"
//       >
//         <div className='w-full flex justify-around'>
//           <p>Name</p>
//           <p>Role</p>
//           <p>Branch</p>
//           <button>Approve</button>
//           <button>decline</button>
//         </div>
//        { 
//        reqUser.map(element=> {
//           return <UserRequest requestedUser={element}/>
//         })
//       }
//       </div>
//   </motion.div>
// );

export {Dashboard};

