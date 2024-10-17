"use client"
import Header from '@/app/components/Header'
import UserProfile from '@/app/components/UserProfile';
import React, { useEffect, useState } from 'react'

const All = () => {
    const [userName, setUsername] = useState('');

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);
  return (
    <div>
        <div>
            <Header username={userName}/>
        </div>
        <div>
            <UserProfile/>
        </div>
    </div>
  )
}

export default All