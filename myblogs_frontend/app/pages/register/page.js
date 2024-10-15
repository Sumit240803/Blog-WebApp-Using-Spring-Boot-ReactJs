"use client"
import Header from '@/app/components/Header';
import PopupMsg from '@/app/components/PopupMsg';
import React, { useState } from 'react';

const page = () => {
  const[formData , setFormData] = useState({name :'' ,username : '',email : '' , password : ''});
  const handleChange =(event)=>{
    const {name , value} = event.target;
    setFormData((prevFromData)=>({...prevFromData , [name]:value}));
  }
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const[popMsg , setPopMsg] = useState('');
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  const handleSubmit =async(event)=>{
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/api/auth/register`,{
      body :JSON.stringify(formData),
      method : "POST",
      headers : {
      "Content-Type" : "application/json"}
      },
    );
      if(response.ok){
        setPopMsg("Registration Successfull");
        handleOpenPopup();
        setFormData({name :'', username : '' , email : '' , password : ''})
      }
    } catch (error) {
      console.log(error);
      setPopMsg("Some Error Occurred Please Try Again!")
      handleOpenPopup();
    }
  }
  return (
    <div className="h-fit bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: "url('/pictures/bckground.jpg')" }}>
      {/* Header Section */}
      <div className="w-full z-10">
        <Header />
      </div>

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center w-full mt-10 pb-20">
        <div className="bg-white opacity-95 border-2 border-black border-opacity-25 rounded-3xl p-10 shadow-lg w-1/3">
          <h2 className="text-3xl font-semibold text-center mb-8">Register</h2>
          
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Enter your full name"
                onChange={handleChange}
                value ={formData.name}
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Enter your username"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <PopupMsg 
      message={popMsg}
      visible={isPopupVisible}
      onClose={handleClosePopup}/>
    </div>
  );
};

export default page;
