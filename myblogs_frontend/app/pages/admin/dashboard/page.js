"use client"
import AdminHeader from '@/app/components/adminHeader'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const[userComp ,setUserCom] = useState(false);
    const[blogComp ,setBlogCom] = useState(false);
    const[commComp ,setCommCom] = useState(false);
    const[users , setUsers] = useState([]);
    const[blogs , setBlogs] = useState([]);
    const[comments, setComments] = useState([]);
    const[page ,setPage] = useState(0);
    const route = useRouter();
    const allUsers =async()=>{
        setBlogCom(false);
        setUserCom(true);
        setCommCom(false);
        const token = localStorage.getItem("token");
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allUser?page=${page}&size=5`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setUsers(data);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const allBlogs =async()=>{
        setBlogCom(true);
        setUserCom(false);
        setCommCom(false);
        const token = localStorage.getItem("token");
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allBlog?page=${page}&size=5`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setBlogs(data);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const allComments =async()=>{
        setBlogCom(false);
        setUserCom(false);
        setCommCom(true);
        const token = localStorage.getItem("token");
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allComments?page=${page}&size=5`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setComments(data);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleLogout = ()=>{
         localStorage.clear();
         route.push("/")
    }
    return (
        <div>
            <nav className='flex justify-between p-4 border border-black'>
                <div>
                    Admin DashBoard
                </div>
                <button onClick={handleLogout}>
                    LogOut
                </button>
            </nav>
            <div className='flex min-h-screen'>
            <div className='w-1/6  border-2 border-black'>
                <div className='p-5'>
                  <button onClick={allUsers}>
                    All Users
                    </button>  
                </div>
                <div className='p-5'>
                    <button onClick={allBlogs}>
                    All Blogs
                    </button>
                </div>
                <div className='p-5'>
                    <button onClick={allComments}>
                    All Comments
                    </button>
                </div>
            </div>
            <div className='w-full p-4'>
                {userComp ? <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Blogs</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.id} className="border-b">
                    <td className="px-4 py-2 text-center">{user.username}</td>
                    <td className="px-4 py-2 text-center">{user.name}</td>
                    <td className="px-4 py-2 text-center">{user.email}</td>
                    <td className="px-4 py-2 text-center">
                        {user.blogs.length > 0 ? user.blogs.length : "No Blogs"}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
 : blogComp ? <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                
            </tr>
        </thead>
        <tbody>
        {blogs.map((blog) => (
                <tr key={blog.id} className="border-b">
                    <td className="px-4 py-2 text-center">{blog.title}</td>
                    <td className="px-4 py-2 text-center">{blog.user.username}</td>
                </tr>
            ))}
            </tbody>
    </table>
 </div> : commComp ? <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Blog</th>
                <th className="px-4 py-2">User</th>
                
            </tr>
        </thead>
        <tbody>
        {comments.map((comment) => (
                <tr key={comment.id} className="border-b">
                    <td className="px-4 py-2 text-center">{comment.comment}</td>
                    <td className="px-4 py-2 text-center">{comment.blog.title}</td>
                    <td className="px-4 py-2 text-center">{comment.user.username}</td>
                </tr>
            ))}
            </tbody>
    </table>
 </div> : 'Nothing right now'}
            </div>
            </div>
        </div>
    )
}

export default page