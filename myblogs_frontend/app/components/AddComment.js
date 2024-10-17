"use client"
import React, { useState } from 'react'

const AddComment = ({id}) => {
    const[comment, setComment] = useState({comment : ''});
    const handleChange =(event)=>{
        const {name , value} = event.target;
        setComment((prevFromData)=>({...prevFromData , [name]:value}));
      }
    const handlePostComment =async ()=>{
        try {
            const token = localStorage.getItem("token");
            const response =await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/addComment/${id}`,{
                method : "POST",
                body : JSON.stringify(comment),
                headers : {
                    "Content-Type" : "application/json",
                     "Authorization": `Bearer ${token}`
                }
            })
            if(!response.ok){
               console.log("error")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <div>

            <form className='flex justify-around'>
                <textarea
                id='comment'
                name = "comment"
                value={comment.comment}
                onChange={handleChange}
                placeholder='Write a comment here'
                rows={2}
                className='focus:outline-none border border-black border-opacity-25 p-1'
                >
                </textarea>
                <button onClick={handlePostComment}> Add </button>
            </form>
        </div>
    </div>
  )
}

export default AddComment