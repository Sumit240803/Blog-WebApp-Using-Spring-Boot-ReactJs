"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import BlogLoading from './BlogLoading';

const UserProfile = () => {
  const[allBlogs , setAllBlogs] = useState([]);
  const[page ,setPage] = useState(0);
  const[hasMore , setHasMore] = useState(true);
  const[loading ,setLoading] = useState(false);
  const blogFeed = async()=>{
    try {
      setLoading(true);
      const response =await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/public/getAllBlogs?page=${page}&size=5`)
      if(response.ok){
        const data =await response.json();
        setLoading(false);
       // console.log(data);
        setAllBlogs(data);
        if(data.length ===5){
          setHasMore(true);
        }else{
          setHasMore(false);
        }
        //console.log(hasMore);
      }
    } catch (error) {
      
    }
  }
  const handlePrevious = ()=>{
    if(page>0){
      setPage((page)=> page-1);
    }
  }
  const handleNext = ()=>{
    if(hasMore){
      setPage((page)=>page+1);
      
    }
  }
  useEffect(()=>{
      blogFeed();
  },[page])
  return (
    <div className='h-auto min-h-screen bg-gray-950 w-full'>
    <div>
      
      <h1 className='text-center font-bold py-3 text-white text-3xl font-sans'>Explore </h1>
      { loading ? <BlogLoading/> : allBlogs.map((blogs)=>(
          <div key={blogs.id} className='shadow-md shadow-gray-400 bg-lime-200 opacity-95 flex border-2 border-gray-500 px-16 py-4 my-4 w-1/2 mx-auto border-opacity-30 rounded-xl justify-between' > 
             {blogs.image ? <Image src={blogs.image} className='h-26 ' height={20} width={80}/> : 
             <Image height={30} width={80} src={"/pictures/user.png"} alt='image'/>
             }
             <div className='flex flex-col items-center justify-evenly '>
             <h1 className='text-center text-amber-950 font-bold text-2xl font-sans pb-2'>
              {blogs.title}
              </h1>
              <p className='text-center '>
              {blogs.content.length > 15 ? blogs.content.substring(0,25) + "...." : blogs.content }  
              </p>
              <Link className='text-green-600' href={`/pages/BlogPage/${blogs.id}`}>Read More</Link>
             </div>
          </div>
        ))}
        <div className='flex justify-between px-16 py-4 font-bold font-sans '>
          <button className='text-xl border-2 border-green-950 p-2 rounded-xl bg-black text-white' onClick={handlePrevious}>Previous</button>
          <button className='text-xl border-2 border-green-950 p-2 rounded-xl bg-black text-white' onClick={handleNext}>Next</button>
        </div>
  
    </div>
       
    </div>
  )
}

export default UserProfile