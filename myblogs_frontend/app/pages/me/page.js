"use client"
import Header from '@/app/components/Header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const page = () => {
    const[me , setMe] = useState(null);
    const[showInput , setShowInput] = useState(false);
    const[image , setImage] = useState('');
    const[ loading,setLoading] = useState(false);
    const[uploaded , setUploaded] = useState(false);
    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
          setUploaded(true);
          setShowInput(false);  // Store the base64 encoded image
        };
      };
      const uploadImage = async()=>{
        setLoading(true);
        try {
            const response = await fetch('/api/upload', {
              method: "POST",
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({ data: image })  // Send base64 image to the API
            });
            if(response.ok){
                const data = await response.json();
                setLoading(false);
                updateAvatar(data.url);
              //  console.log(data.url);
            }
      }catch(error){
            console.log(error);
      }}
      const updateAvatar = async(url)=>{
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/updateAvatar`,{
                method : "PUT",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body : url
            })
            if(response.ok){
                setShowInput(false);
                setUploaded(false);
            }
        } catch (error) {
            
        }
      }
    useEffect(()=>{
        const myUser = localStorage.getItem('user');
        if(myUser){
            setMe(JSON.parse(myUser));
        }
    },[]);
    
  return (
    <div className='bg-black text-white h-screen'>
        {me ? (
            <div>
                <Header username={me.username} image={me.avatar}/>
                
                <div className=''>
                    <Image className='mx-auto my-3  p-3 border border-white shadow-sm shadow-white w-52 rounded-full h-52 ' src={me.avatar} width={150} height={30} alt='User Image Here'/>
                </div>
                    <div className=' w-fit mx-auto p-4'>
                         <button onClick={()=>setShowInput(true)}>Update Image</button>
                         {showInput? <div> <label htmlFor='upload'>Upload Image</label> <input id='upload' type='file' accept="image/**" onChange={handleImage} ></input> </div> : ''}
                        {uploaded? 
                         <button onClick={uploadImage} >Update Image</button>
                        : ''}
                         {loading ? "Uploading...." : ''}
                        
                    </div>
                <div className='bg-green-50 shadow-md shadow-purple-400 text-black text-2xl font-semibold font-sans border-2 border-white border-opacity-25 rounded-lg w-fit p-7 mx-auto'>
                <div>Username :  {me.username} </div>
                <div>Name :  {me.name} </div>
                <div>Email : {me.email} </div>
                <div>Total Blogs : {me.blogs.length} </div>
                </div>
            </div>
        ) : "Login Please "}
    </div>
  )
}

export default page