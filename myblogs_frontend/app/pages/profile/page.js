"use client";
import SideNav from '@/app/components/sideNav';
import UserNav from '@/app/components/UserNav';
import UserProfile from '@/app/components/userProfile';
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
                setUser(data); // Store user data in state
                console.log(data);
            } else {
                console.log("Nothing.");
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
            console.log("User is not authenticated.");
        } else {
            setIsAuthenticated(true);
            profileData(token); // Pass the token to profileData
        }
    }, []);

    return (
        <div className='min-h-screen flex'>
            {isAuthenticated ? (
                <>
                    {user && (
                        <main className='flex-grow' >
                        <div>
                            <UserNav username={user.username} />
                        </div>
                            <SideNav/>
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
