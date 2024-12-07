import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './store/userStatus.js';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials=true;

// Logo component
const Logo = () => (
  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Input component
const Input = ({ type, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded appearance-none focus:outline-none focus:shadow-outline`}
    />
    {error && <p className="text-xs italic text-red-500 mt-1">{error}</p>}
  </div>
);

// Button component
const Button = ({ children, onClick, disabled }) => (
  <button
    className="w-full px-4 py-2 font-bold text-white bg-primary rounded-lg hover:bg-primary-dark focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-300  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Main LoginPage component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginRequest = async(data)=>
  {
    try {
      const response = await axios.post(`http://localhost:6374/api/v1/users/login`,data);
      if(response?.data?.success)
      {
        dispatch(login(response.data.data));
        return true
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const data = {email,password};
      if(await loginRequest(data))
      {
        setIsLoading(false);
        navigate("/");
      }
      else{
        setIsLoading(false);
        alert('Login Failed !');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <NavLink to="/"><Logo /></NavLink>
        </div>
        <h3 className="text-2xl font-bold text-center mt-4 mb-6">Login to Role Vista</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Button disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-sm text-center">
          <a href="#" className="text-primary hover:underline">Forgot Password?</a>
        </div>
        <div className="text-sm text-center">
            Don't have an account?{' '}
            <NavLink to="/register" className="font-medium text-primary hover:text-primary-dark">Sign up</NavLink>
          </div>
      </div>
    </div>
  );
};

export {LoginPage};

