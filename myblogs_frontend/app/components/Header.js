import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = ({username}) => {
  const router = useRouter();
  const handleLogout =()=>{
    try {
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      router.push("/")
    } catch (error) {

      
    }
  }
  return (
    <div>

    {username ?
        <div className=' bg-black flex justify-between font-semibold font-sans text-xl items-center text-white p-3'>
        <div className='flex items-center pl-4'>
            <Image src={'/pictures/user.png'} height={40} width={40} />
           <p className='pl-2'>
            {username}
            </p> 
            <Link href={'/pages/profile'} className='px-5'>Profile</Link>
            <Link href={'/pages/myBlogs'}>My Blogs</Link>
        </div>
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    </div> : <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>
    <Link href="/" className="text-lg font-semibold">
      Home
    </Link>
    <Link href="/pages/BlogPage/All">
      Blogs
    </Link>
      </div>
    <h1 className="flex-grow text-center text-3xl font-bold ">
        <span className="">
        Thought Flow
        </span>
        </h1>
    <Link href="/pages/login" className="text-lg font-semibold pr-2">
      Login |
    </Link>
    <Link href="/pages/register" className="text-lg font-semibold">
      Register
    </Link>     
    </nav>
}
    </div>
  )
}

export default Header