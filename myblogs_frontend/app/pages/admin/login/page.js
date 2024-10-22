"use client"
import Header from '@/app/components/Header';
import PopupMsg from '@/app/components/PopupMsg';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
  const router = useRouter();
  const[formData , setFormData] = useState({username : '' , password : ''});

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
  const handleSubmit =async (event)=>{
    event.preventDefault();
   // console.log(formData);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/api/auth/login`,{
        body : JSON.stringify(formData),
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        }
      })
      if(response.ok){
        setPopMsg("Login Successfull!");
        handleOpenPopup();
        setFormData({username : '' , password : ''});
        const data = await response.json();
        const token = data.token;
       // console.log(token);
        localStorage.setItem("token" , token);
        router.push("/pages/admin/dashboard");
      }else{
        setPopMsg("Register as New User or Bad Credentials :((");
        handleOpenPopup();
      }
    } catch (error) {
        console.log(error);
        setPopMsg("Bad Credentials :((")
        handleOpenPopup();

    }
  }

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/pictures/bckground.jpg')" }}>
      <div className="bg-white opacity-90 border-2 border-black border-opacity-25 rounded-3xl p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Admin-Login</h2>
        
          
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit} >
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
            
>            Login
          </button>
        </form>
      </div>
      <PopupMsg 
      message={popMsg}
      visible={isPopupVisible}
      onClose={handleClosePopup}/>
    </div>
  );
};

export default page;
