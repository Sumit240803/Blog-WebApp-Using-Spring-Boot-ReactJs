"use client"
import { useEffect, useState } from "react";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";


export default function Home() {
  const [userName, setUsername] = useState('');

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/pictures/bckground.jpg')" }} >
      <div>
        <Header username={userName}/>
      </div> 
      <div>
        <Hero/>
      </div>
      <div>
        <AboutUs/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
