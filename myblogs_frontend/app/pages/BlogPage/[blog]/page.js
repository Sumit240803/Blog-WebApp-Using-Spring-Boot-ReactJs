"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [reqBlog, setReqBlog] = useState(null);
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
    useEffect(()=>{
        fetchBlogById(blog);
    },[])

  return (
    <div>
        { reqBlog ?  
        <div>
            <div>
                {reqBlog.title}
            </div>
            <div>
                {reqBlog.content}
            </div>
            <div>
                {reqBlog.comments.length > 0 ? reqBlog.comments.map((comment)=>(
                        <li key={comment.id}>
                            {comment}
                        </li>
                )) : "No comments to display"}
            </div>
        </div> : "Fetching Blog Wait."
}
    </div>
  )
}

export default page