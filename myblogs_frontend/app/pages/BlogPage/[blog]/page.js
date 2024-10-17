"use client"
import AddComment from '@/app/components/AddComment';
import Header from '@/app/components/Header';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [reqBlog, setReqBlog] = useState(null);
    const[userName , setUsername] = useState('');
    const {blog} = useParams();
    const fetchBlogById = async(id)=>{
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/public/getBlogById/${id}`);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setReqBlog(data);
            }
        } catch (error) {
            
        }
    }
    const formatContent =(content)=>{
        return content.split('\n').map((item,index)=>(
            <p key={index}>{item}</p>
        ))
    }
   useEffect(()=>{
       const username = localStorage.getItem("username")
       if(username){
        setUsername(username);
       }
        fetchBlogById(blog);
    },[])

  return (
    <div>

    <Header username={userName}/>
    <div className='p-3 m-2  h-screen'>
        { reqBlog ? 
        
        <div>
            <div className='text-center font-bold text-5xl font-sans'>
                {reqBlog.title}
                
            </div>
            <div className='shadow-md shadow-black p-6 text-lg my-7 mx-3 border-2 bg-gray-100 text-gray-700 border-black border-opacity-30 rounded-xl'>
            {formatContent(reqBlog.content)}
                </div>
                
            
            <div className='bg-white text-black p-2 border border-black border-opacity-25 rounded-2xl w-64 mx-auto my-2'>
                <AddComment id={blog}/>
            </div>
           { <div className='p-4 border border-green-700 w-64 m-auto bg-black text-white text-md bg-opacity-80 rounded-2xl'>
                {reqBlog.comments.length > 0 ? reqBlog.comments.map((comment)=>(
                        <li key={comment.id} className='list-none'>
                            <div className='shadow-sm shadow-black my-2 pb-1 border border-x-0 border-b-white border-opacity-25 rounded-xl'>
                            <p className='text-sm pl-2 pt-1 pr-2'>
                            {comment.user.name} 
                            </p> 
                            <p className='italic pl-2 pt-1 pr-2'>
                                {comment.comment}
                                </p>
                            </div>
                        </li>
                )) : "No comments to display"}
            </div>}
            
        </div>: "Fetching Blog Wait."
}
    </div>
    </div>
  )
}

export default page

