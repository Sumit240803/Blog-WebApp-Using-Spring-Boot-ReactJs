import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-white w-full mt-44">
        <section className=' text-5xl py-16 font-bold font-sans '>
            <h1 className="text-center">Why Thought Flow</h1>
        </section>
        <div className="flex justify-around py-20">
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">Your Platform</h1>
                <p className="text-center font-sans text-xl py-3">We Give You A Platform To Share Your Content</p>
            </div >
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">Earn with Us!</h1>
                <p className="text-center font-sans text-xl py-3">100% share of Ad Revenue for the Ads generated on your Blog Page</p>
            </div>
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">
                    Grow
                </h1>
                <p className="text-center font-sans text-xl py-3">Connect with Wide Audience To Grow Your Community</p>
            </div>
        </div>
        <div className=" border-t-2 border-black w-full py-10"></div>
        <section className=' text-5xl py-16 font-bold font-sans '>
            <h1 className="text-center">About Us</h1>
        </section>
        <div className="flex justify-around pt-20 pb-40">
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">1M+ Users</h1>
                <p className="text-center font-sans text-xl py-3">We have more than 1 million users reading our content daily. Published by our trusted authors.</p>
            </div >
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">10K+ Reading Content</h1>
                <p className="text-center font-sans text-xl py-3">We currently have thousands of different reading material. Read What You Love.</p>
            </div>
            <div className="border-2 border-blue-100 p-4 w-1/4 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-semibold font-sans pb-3">
                    We Are Growing
                </h1>
                <p className="text-center font-sans text-xl py-3">People from Around the World Are Reading Our Content.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs;