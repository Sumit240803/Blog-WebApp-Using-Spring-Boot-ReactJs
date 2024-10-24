"use client"
import AddComment from '@/app/components/AddComment';
import BlogLoading from '@/app/components/BlogLoading';
import Header from '@/app/components/Header';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SingleBlog = () => {
    const [reqBlog, setReqBlog] = useState(null);
    const[userName , setUsername] = useState('');
    const[userImage , setUserImage] = useState('');
    const[loading , setLoading] = useState(false);
    const {blog} = useParams();
    const fetchBlogById = async(id)=>{
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/public/getBlogById/${id}`);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setReqBlog(data);
                setLoading(false);
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
    const user = localStorage.getItem("user");
    if (user) {
      const loggedUser = JSON.parse(user);
      setUsername(loggedUser.username);
      setUserImage(loggedUser.avatar)
    }
        fetchBlogById(blog);
    },[blog])

  return (
    <div>

    <Header username={userName} image={userImage}/>
    <div className=' min-h-screen bg-black'>
        {loading ? <BlogLoading/> : reqBlog ? 
        
        <div>
            <div className='text-center text-white py-2 font-bold text-5xl font-mono'>
                {reqBlog.title}

            </div>
            <div className='text-center text-green-500 text-lg font-bold'> By : {reqBlog.user.username}</div>
            <div className='shadow-sm shadow-white font-medium p-6 text-lg my-7 mx-3 border-2 bg-gray-100 text-gray-700 border-black border-opacity-30 rounded-xl'>
            {reqBlog.image ? 
            <Image src={reqBlog.image} width={150} height={50} alt='img' className='mx-auto w-32'/>
            : ''}
            {formatContent(reqBlog.content)}
                </div>
                
            
            <div className='bg-black text-white p-2 border border-white border-opacity-25 rounded-2xl w-1/2 mx-auto my-2'>
                <AddComment id={blog}/>
            </div>
           { <div className='p-4 border w-1/2 m-auto bg-black text-white text-md bg-opacity-80 rounded-2xl'>
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

export default SingleBlog

