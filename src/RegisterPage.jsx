import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Input = ({ label, type, placeholder, value, onChange, required ,name}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, options, value, onChange, required ,name}) => (
  <div className="mb-4 relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
  </div>
);

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async ()=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/registerUser`,formData)
      
      if(response?.data?.success)
      {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here

    if(await registerUser())
    {
      navigate('/registerationSuccess');
    }
    else
    {
      console.log("something  went wrong while  registering user .")
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <NavLink to="/"><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for Role Vista</h2></NavLink>
        
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              name="name"
            />

            <Select
              label="Role"
              options={['Student', 'Teacher']}
              value={formData.role}
              onChange={handleChange}
              required
              name="role"
            />

            <Select
              label="Gender"
              options={['Male', 'Female', 'Other']}
              value={formData.gender}
              onChange={handleChange}
              required
              name="gender"
            />

            <Input
              label="Mobile Number"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              name="mobileNo"
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              name="email"
            />

            <Select
              label="Branch"
              options={['cse', 'electronic', 'mechanic']}
              value={formData.branch}
              onChange={handleChange}
              required
              name="branch"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              name="password"
            />

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  name="dateOfBirth"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already registered?</span>
              </div>
            </div>

            <div className="mt-6">
              <NavLink to="/login" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Log in</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {RegisterPage};

