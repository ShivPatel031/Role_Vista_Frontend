import { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { RegisterPage } from './RegisterPage';
import { PostsPage } from './PostPage';
import { Dashboard } from './DashboardPage';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state=>state.user);

  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" &&  location.pathname !== "/register" && <Navbar user={user.status} />}
    
      <Routes>
        <Route path="/" element={<HomePage userInfo={user}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/posts" element = {<PostsPage />} />
        <Route path="/dashboard/*" element = {<Dashboard />} />
      </Routes>

      {location.pathname !== "/login" &&  location.pathname !== "/register" && <Footer />}
    </>
  )
}

export default App
