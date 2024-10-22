"use client";
import Header from '@/app/components/Header';
import React, { useEffect, useState } from 'react';

const BlogForm = () => {
  const [blog, setBlog] = useState({ content: '', title: '', image: '' });
  const [image, setImage] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const[username , setUsername] = useState('');
  const[userImage , setUserImage] = useState('');
  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
      const loggedUser = JSON.parse(user);
      setUsername(loggedUser.username);
      setUserImage(loggedUser.avatar);
    }
  },[]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);  // Store the base64 encoded image
    };
  };

  const uploadImage = async () => {
    setLoading(true);  // Show a loading state when uploading
    try {
      const response = await fetch('/api/upload', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ data: image })  // Send base64 image to the API
      });

      if (response.ok) {
        setIsImageUploaded(true);
        const data = await response.json();
        setBlog((prevBlog) => ({ ...prevBlog, image: data.url }));  // Only update the image field
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/addBlog`, {
        method: 'POST',
        body: JSON.stringify(blog),  // Send the blog data
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Blog submitted successfully!');
        setBlog({ content: '', title: '', image: '' });  // Reset form on success
        setIsImageUploaded(false);
        setImage('');  // Clear image state
      } else {
        alert('Error submitting the blog. Try Again after some time.');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className='top-0 m-0'>
      <div className='top-0'>
        <Header className='top-0' username={username} image={userImage} />
      </div>
      <div className='w-3/4 my-10 mx-auto bg-black text-yellow-200 p-6 border-2 border-green-500 rounded'>
        <h2 className='text-2xl font-bold text-center mb-4'>Add a New Blog</h2>
        <form onSubmit={handleFormSubmit}>
          
          {/* Blog Title */}
          <div className='mb-4'>
            <label htmlFor='title' className='block text-lg font-semibold mb-2'>Blog Title</label>
            <input
              type='text'
              className='w-full p-2 border-2 focus:outline-none bg-gray-200 border-gray-400 rounded'
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
              className='w-full p-2 text-black border-2 focus:outline-none bg-gray-200 border-gray-400 rounded'
              rows='8'
              value={blog.content}
              onChange={handleChange}
              placeholder='Enter blog content'
              name='content'
              id='content'
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className='mb-4'>
            <label htmlFor='image-uploader' className='block text-lg font-semibold mb-2'>Upload Your Image</label>
            <input type='file' accept='image/*' onChange={handleImage}></input>
            <button type="button" onClick={uploadImage} disabled={loading || isImageUploaded} className='bg-green-700 text-white py-2 px-4 rounded ml-4'>
              {loading ? 'Uploading...' : isImageUploaded ? 'Image Uploaded' : 'Upload Image'}
            </button>
          </div>

          {/* Image upload success message */}
          {isImageUploaded && <p>Image Uploaded Successfully.</p>}
          
          {/* Submit Blog */}
          <button type='submit' className='bg-purple-800 text-white py-2 px-4 rounded' disabled={!isImageUploaded}>
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
