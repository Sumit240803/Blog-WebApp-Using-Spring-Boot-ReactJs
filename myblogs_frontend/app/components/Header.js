import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = ({ username, image }) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header>
      {username ? (
        <div className="bg-emerald-600 opacity-90 flex justify-between items-center text-white p-3 w-full">
          <div className="flex items-center space-x-5 pl-4">
            <Link href="/pages/me">
              <Image src={image} className="w-10 h-10 rounded-full" height={40} width={40} alt="Profile Image" />
            </Link>
            <p className="pl-2 font-semibold text-xl">
              <Link href="/pages/me">{username}</Link>
            </p>
            <Link href="/pages/profile" className="px-2">
              Profile
            </Link>
            <Link href="/pages/myBlogs">My Blogs</Link>
            <Link href="/pages/addBlog" className="px-2">
              Add Blog
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <div>
            <Link href="/" className="text-lg font-semibold pr-4">
              Home
            </Link>
            <Link href="/pages/BlogPage/All" className="font-bold">
              Blogs
            </Link>
          </div>
          <h1 className="flex-grow text-center text-3xl font-bold">
            <span>Thought Flow</span>
          </h1>
          <div>
            <Link href="/pages/login" className="text-lg font-semibold pr-2">
              Login
            </Link>
            <span className="px-1">|</span>
            <Link href="/pages/register" className="text-lg font-semibold">
              Register
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
