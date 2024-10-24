"use client";
import Header from '@/app/components/Header';
import UserProfile from '@/app/components/UserProfile';
import React, { useEffect, useState } from 'react';

const Profilepage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const profileData = async (token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/user/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                localStorage.setItem("username",data.username);
                localStorage.setItem("user",JSON.stringify(data)); // Store user data in state
               
            } else {
               // console.log("Nothing.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            // If not authenticated, you might want to handle this case
           // console.log("User is not authenticated.");
        } else {
            setIsAuthenticated(true);
            profileData(token); // Pass the token to profileData
        }
    }, []);

    return (
        <div className=''>
            {isAuthenticated ? (
                <>
                    {user && (
                        <main className='min-h-screen flex flex-col' >
                        <div>
                            <Header username={user.username} image={user.avatar} />
                        </div>
                        <div className='flex flex-1'>
                            
                           
                            <UserProfile className="flex-grow"/>
                            
                        </div>
                        <div>

                        </div>
                        </main>
                    )}
                </>
            ) : (
                <h1>Please log in to view your profile.</h1>
            )}
        </div>
    );
};

export default Profilepage;
