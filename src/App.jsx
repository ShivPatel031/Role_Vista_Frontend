import { useEffect,useState } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import './App.css'
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { RegisterPage } from './RegisterPage';
import { PostsPage } from './PostPage';
import { Dashboard } from './DashboardPage';
import { Navbar } from './component/Navbar.jsx';
import { Footer } from './component/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/userStatus';
import { addPosts} from './store/PostData.js';
import {RegistrationSuccess} from './component/RegisterationSuccessfullPage.jsx'

import axios from 'axios';
axios.defaults.withCredentials=true;


function App() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/getAllPosts`);
      if (response?.data?.success) {
        dispatch(addPosts(response.data.data));
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
    }
  };

  const loginWithToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/loginWithToken`);
      if (response?.data?.success) {
        dispatch(login(response.data.data));
      }
    } catch (error) {
      console.error("Failed to login with token:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await loginWithToken();
      if (user?.status) {
        await fetchPosts();
      }
    };
    initializeApp();
  }, [user?.status]); // Run when user.status changes

  const showHeaderFooter = location.pathname !== "/login" && location.pathname !== "/register";

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <>
      {showHeaderFooter && <Navbar userInfo={user.status} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts/*" element={<PostsPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/registerationSuccess" element={<RegistrationSuccess />} />
      </Routes>
      {showHeaderFooter && <Footer />}
      
    </>
  );
}

export default App;

