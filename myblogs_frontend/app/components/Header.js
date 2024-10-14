import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
    <Link href="/" className="text-lg font-semibold">
      Home
    </Link>
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
  )
}

export default Header