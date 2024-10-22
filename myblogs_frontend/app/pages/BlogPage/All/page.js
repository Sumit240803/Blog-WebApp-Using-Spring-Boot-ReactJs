"use client"
import Header from '@/app/components/Header'
import UserProfile from '@/app/components/UserProfile';
import React, { useEffect, useState } from 'react'

const All = () => {
    const [userName, setUsername] = useState('');
    const [userImage , setUserImage] = useState('');
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const loggedUser = JSON.parse(user);
      setUsername(loggedUser.username);
      setUserImage(loggedUser.avatar)
    }
  }, []);
  return (
    <div>
        <div>
            <Header username={userName} image={userImage}/>
        </div>
        <div>
            <UserProfile/>
        </div>
    </div>
  )
}

export default All