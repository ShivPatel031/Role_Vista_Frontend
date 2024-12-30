import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Input component
const Input = ({ type, placeholder, value, onChange, error, name }) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded appearance-none focus:outline-none focus:shadow-outline`}
    />
    {error && <p className="text-xs italic text-red-500 mt-1">{error}</p>}
  </div>
);

// Select component
const Select = ({ placeholder, options, value, onChange, error, name }) => (
  <div className="mb-4">
    <select
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded appearance-none focus:outline-none focus:shadow-outline`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-xs italic text-red-500 mt-1">{error}</p>}
  </div>
);

// Button component
const Button = ({ children, onClick, disabled }) => (
  <button
    className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Main RegisterPage component
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    gender: '',
    mobileNo: '',
    email: '',
    branch: '',
    password: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/registerUser`, formData);
      return response?.data?.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      if (await registerUser()) {
        setIsLoading(false);
        navigate('/registerationSuccess');
      } else {
        setIsLoading(false);
        alert('Registration Failed!');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <div className="flex justify-center">
          <NavLink to="/"><img src="./Role vista Logo.png" alt='logo' className='w-[100px] rounded-full' /></NavLink>
        </div>
        <h3 className="text-2xl font-bold text-center mt-4 mb-6">Register for Role Vista</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            name="name"
          />
          <Select
            placeholder="Select Role"
            options={['Student', 'Teacher']}
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
            name="role"
          />
          <Select
            placeholder="Select Gender"
            options={['Male', 'Female', 'Other']}
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
            name="gender"
          />
          <Input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChange={handleChange}
            error={errors.mobileNo}
            name="mobileNo"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            name="email"
          />
          <Select
            placeholder="Select Branch"
            options={['cse', 'electronic', 'mechanic']}
            value={formData.branch}
            onChange={handleChange}
            error={errors.branch}
            name="branch"
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            name="password"
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            name="dateOfBirth"
          />
          <Button disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <NavLink to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };


