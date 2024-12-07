import { useEffect,useState } from 'react';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css'
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { RegisterPage } from './RegisterPage';
import { PostsPage } from './PostPage';
import { Dashboard } from './DashboardPage';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/userStatus';
import { RegistrationSuccess } from './RegisterationSuccessfullPage';
import axios from 'axios';
axios.defaults.withCredentials=true;

function App() {

  const user = useSelector(state =>state.user)
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  const location = useLocation();

  const loginWithToken = async()=>
  {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/users/loginWithToken`);
      if(response?.data?.success)
      {
        dispatch(login(response.data.data));
      } 
    } catch (error) {
      console.log("fail to login with token",error.message)
    }
    setLoading(false);
  }

  useEffect(()=>{
    loginWithToken();
  },[]);

  if(loading) return <div className="text-center p-4">Loading ...</div>

  return (
    <>
      {location.pathname !== "/login" &&  location.pathname !== "/register" && <Navbar userInfo={user.status}/>}
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts" element = {<PostsPage />} />
        <Route path="/dashboard/*" element = {<Dashboard />} />
        <Route path="/registerationSuccess" element={<RegistrationSuccess />} />
      </Routes>

      {location.pathname !== "/login" &&  location.pathname !== "/register" && <Footer />}
    </>
  )
}

export default App
