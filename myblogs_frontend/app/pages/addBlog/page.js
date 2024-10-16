"use client";
import React, { useState } from 'react';

const BlogForm = () => {
  const [blog , setBlog] = useState({content : '', title : ''})
  const handleChange =(event)=>{
    const {name , value} = event.target;
    setBlog((prevFromData)=>({...prevFromData , [name]:value}));
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    
    

    try {
        const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/addBlog`, {
        method: 'POST',
        body: JSON.stringify(blog),
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
             // Send form data as the body of the request
      });

      if (response.ok) {
        alert('Blog submitted successfully!');
      } else {
        alert('Error submitting the blog.');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className='w-1/2 mx-auto bg-white p-6 border-2 border-gray-400 rounded'>
      <h2 className='text-2xl font-bold text-center mb-4'>Add a New Blog</h2>
      <form onSubmit={handleFormSubmit}>
        
        {/* Blog Title */}
        <div className='mb-4'>
          <label htmlFor='title' className='block text-lg font-semibold mb-2'>Blog Title</label>
          <input
            type='text'
            className='w-full p-2 border-2 border-gray-400 rounded'
            value={blog.title}
            onChange={handleChange}
            placeholder='Enter blog title'
            name='title'
            id='title'
            required
          />
        </div>

        {/* Content */}
        <div className='mb-4'>
          <label htmlFor='content' className='block text-lg font-semibold mb-2'>Content</label>
          <textarea
            className='w-full p-2 border-2 border-gray-400 rounded'
            rows='5'
            value={blog.content}
            onChange={handleChange}
            placeholder='Enter blog content'
            name='content'
            id='content'
            required
          ></textarea>
        </div>

       
        

        <button type='submit' className='bg-purple-800 text-white py-2 px-4 rounded'>
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
