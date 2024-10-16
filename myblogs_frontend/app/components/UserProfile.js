"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserProfile = () => {
  const[allBlogs , setAllBlogs] = useState([]);
  const blogFeed = async()=>{
    try {
      const response =await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/public/showAllBlogs`)
      if(response.ok){
        const data =await response.json();
        console.log(data);
        setAllBlogs(data);
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
      blogFeed();
  },[])
  return (
    <div className='h-auto bg-green-100 w-full'>
      <h1 className='text-center font-bold text-2xl font-sans'>Explore </h1>
        {allBlogs.map((blogs)=>(
          <div key={blogs.id} className='bg-white flex border-2 border-gray-500 p-4 my-4 w-1/2 mx-auto border-opacity-30 rounded-r-full' > 
             <Image height={30} width={80} src={"/pictures/user.png"}/>
             <div className='flex flex-col items-center justify-center px-20'>
             <h1 className='pl-12 text-center font-bold text-xl font-sans pb-2'>
              {blogs.title}
              </h1>
              <p>
              {blogs.content.length > 15 ? blogs.content.substring(0,25) + "...." : blogs.content }  
              </p>
              <Link href={`/pages/BlogPage/${blogs.id}`}>Read More</Link>
             </div>
          </div>
        ))}
    </div>
  )
}

export default UserProfile