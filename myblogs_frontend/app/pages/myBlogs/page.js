"use client"
import UserNav from '@/app/components/UserNav'
import React, { useEffect, useState } from 'react'

const page = () => {
    const username = localStorage.getItem("username");
    const [userBlog , setUserBlog] = useState([]);
    const userBlogs =async()=>{

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/myBlogs`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setUserBlog(data);
                console.log(data);
            }else{
                console.log("error")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        userBlogs();
    },[]);
  return (
    <div>
       <div>
        <UserNav username={username}/>
       </div>
        <div className='p-4 flex'>
            {userBlog.length>0 ? userBlog.map((blog)=>(
                <div key={blog.id} className='p-4 m-3 border border-lime-500 bg-black text-white font-semibold text-xl w-1/5'>
                    <h1>{blog.title}</h1>
                    <p className='text-lg font-semibold font-sans'>{blog.content.length >25 ? blog.content.substring(0,25) + "..." : blog.content }</p>
                    <button className='text-sm font-semibold font-sans'>Read More</button>
                </div>
            )) : "No Blogs Right Now"}
        </div>
    </div>
  )
}

export default page