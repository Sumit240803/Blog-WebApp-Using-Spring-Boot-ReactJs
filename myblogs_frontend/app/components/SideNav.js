import React from 'react'
import Link from 'next/link'
const SideNav = () => {
  return (
    <div className='h-auto w-1/6 text-xl font-semibold font-sans text-white  p-10  bg-purple-800 '>
        <div className=' ' ><Link href='/pages/addBlog' className='bg-black border-2 border-white border-opacity-30 p-2 rounded-3xl fixed'>Add Blog</Link></div>
        <div className=' py-20 '><Link href='/pages/myBlogs' className='bg-black border-2 border-white border-opacity-30 p-2 rounded-3xl fixed'>My Blogs</Link></div>
        <div className=' '><Link href='/pages/addBlog' className='bg-black border-2 border-white border-opacity-30 p-2 rounded-3xl fixed'>Settings</Link></div>
    </div>
  )
}

export default SideNav