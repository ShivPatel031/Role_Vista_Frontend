import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOnePost } from '../store/PostData';

const FormComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [enableComment, setEnableComment] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append("title",title);
      formData.append("description",description);
      formData.append("enableComment",enableComment);
      formData.append("image",image);
      categories.forEach((item)=>{formData.append("category",item)})
      

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/createPost`,formData);
        if(response?.data?.success)
        {
            console.log(response.data);
            dispatch(addOnePost(response.data));
        }
      } catch (error) {
        console.log(error);
      }
      
    };
  
    const handleAddCategory = () => {
      if (newCategory && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
        setNewCategory('');
      }
    };
  
    const handleRemoveCategory = (category) => {
      setCategories(categories.filter(c => c !== category));
    };
  
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    // Custom components
    const Button = ({ children, ...props }) => (
      <button
        {...props}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {children}
      </button>
    );
  
    const Input = ({ ...props }) => (
      <input
        {...props}
        
      />
    );
  
    const Textarea = ({ ...props }) => (
      <textarea
        {...props}
        
      />
    );
  
    const Switch = ({ checked, onChange }) => (
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
          />
          <div className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${checked ? 'transform translate-x-4' : ''}`}></div>
        </div>
      </label>
    );
  
    const Label = ({ children, ...props }) => (
      <label {...props} className="block text-sm font-medium text-gray-700 mb-1">
        {children}
      </label>
    );
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex items-center space-x-2">
          <Switch
            checked={enableComment}
            onChange={() => setEnableComment(!enableComment)}
          />
          <Label htmlFor="enableComment">Enable Comments</Label>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="category">Categories</Label>
          <div className="flex space-x-2">
            <input
              id="category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add a category"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="button" onClick={handleAddCategory}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                {category}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
  
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    );
  };
  

const CreatePost = () => (
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-lg"
>
    <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
    <p className="text-gray-600">Use this form to create a new post.</p>
    <FormComponent />
</motion.div>
);







export {CreatePost}