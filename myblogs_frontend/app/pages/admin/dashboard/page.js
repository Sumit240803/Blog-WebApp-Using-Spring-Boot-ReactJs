"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const[userComp ,setUserCom] = useState(false);
    const[blogComp ,setBlogCom] = useState(false);
    const[commComp ,setCommCom] = useState(false);
    const[users , setUsers] = useState([]);
    const[blogs , setBlogs] = useState([]);
    const[comments, setComments] = useState([]);
    const[userPage ,setUserPage] = useState(0);
    const[blogPage ,setBlogPage] = useState(0);
    const[commentPage ,setCommentPage] = useState(0);
    const route = useRouter();
    const[moreUser , setMoreUser] = useState(false);
    const[moreBlog , setMoreBlog] = useState(false);
    const[moreComment , setMoreComment] = useState(false);
    const allUsers =async()=>{
        setBlogCom(false);
        setUserCom(true);
        setCommCom(false);
        const token = localStorage.getItem("token");
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allUser?page=${userPage}&size=10`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setUsers(data);
                if(data.length ==10){
                    setMoreUser(true);
                }else{
                    setMoreUser(false);
                }
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allBlog?page=${blogPage}&size=10`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setBlogs(data);
                if(data.length ==10){
                    setMoreBlog(true);
                }else{
                    setMoreBlog(false);
                }
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/allComments?page=${commentPage}&size=10`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                setComments(data);
                if(data.length ==10){
                    setMoreComment(true);
                }else{
                    setMoreComment(false);
                }
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleLogout = ()=>{
         localStorage.clear();
         route.push("/")
    }

    //
    const handleNextUser = ()=>{
            if(moreUser){
                setUserPage((prev)=>prev+1);
                allUsers();
            }
    }
    const handlePreviousUser = ()=>{
        if(userPage>0){
            setUserPage((prev)=>prev-1);
            allUsers();
        }
    }
    //

    const handleNextBlog = ()=>{
            if(moreBlog){
                setBlogPage((prev)=>prev+1);
                allBlogs();
            }
    }
    const handlePreviousBlog = ()=>{
        if(userPage>0){
            setBlogPage((prev)=>prev-1);
            allBlogs();
        }
    }
    //

    const handleNextComment = ()=>{
            if(moreUser){
                setCommentPage((prev)=>prev+1);
                allComments();
            }
    }
    const handlePreviousComment = ()=>{
        if(userPage>0){
            setCommentPage((prev)=>prev-1);
            allComments();
        }
    }

    const deleteUser = async(id)=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/removeUser/${id}`,{
                method : "DELETE",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                console.log("Deleted User");
            }
        } catch (error) {
            console.log("Error : ",error);
        }
    }
    const deleteBlog = async(id)=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/deleteBlog/${id}`,{
                method : "DELETE",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                console.log("Deleted Blog");
            }
        } catch (error) {
            console.log("Error : ",error);
        }
    }
    const deleteComment = async(id)=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/admin/deleteComment/${id}`,{
                method : "DELETE",
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                console.log("Deleted Comment");
            }
        } catch (error) {
            console.log("Error : ",error);
        }
    }

    return (
        <div>
            <nav className='flex justify-between p-4 border border-black bg-green-300 shadow-md shadow-black font-bold text-lg'>
                <div>
                    Admin DashBoard
                </div>
                <button onClick={handleLogout}>
                    LogOut
                </button>
            </nav>
            <div className='flex min-h-screen'>
            <div className='w-1/6  border-2 border-black bg-black font-bold text-white'>
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
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Delete</th>
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
                    <td className='text-center'>{user.roles}</td>
                    <td className='text-center border-black bg-red-100'><button className='text-center' onClick={()=>deleteUser(user.id)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>
    <div className='flex justify-between p-4'>
    <button className=' rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handlePreviousUser}>Previous</button>
    <button className=' rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handleNextUser}>Next</button>
    </div>
</div>
 : blogComp ? <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Delete</th>
            </tr>
        </thead>
        <tbody>
        {blogs.map((blog) => (
                <tr key={blog.id} className="border-b">
                    <td className="px-4 py-2 text-center">{blog.title}</td>
                    <td className="px-4 py-2 text-center">{blog.user.username}</td>
                    <td className='text-center bg-red-100'><button className='text-center' onClick={()=>deleteBlog(blog.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
    </table>
    <div className='flex justify-between p-4'>
    <button className=' rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handlePreviousBlog}>Previous</button>
    <button className='rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handleNextBlog}>Next</button>
    </div>
 </div> : commComp ? <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Blog</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Delete</th>
            </tr>
        </thead>
        <tbody>
        {comments.map((comment) => (
                <tr key={comment.id} className="border-b">
                    <td className="px-4 py-2 text-center">{comment.comment}</td>
                    <td className="px-4 py-2 text-center">{comment.blog.title}</td>
                    <td className="px-4 py-2 text-center">{comment.user.username}</td>
                    <td className='text-center bg-red-100'><button  onClick={()=>deleteComment(comment.id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
    </table>
    <div className='flex justify-between p-3'>
    <button className='rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handlePreviousComment}>Previous</button>
    <button className='rounded-lg bg-lime-800 p-3 text-white font-semibold' onClick={handleNextComment}>Next</button>
    </div>
 </div> : 'Nothing right now'}
            </div>
            </div>
        </div>
    )
}

export default page