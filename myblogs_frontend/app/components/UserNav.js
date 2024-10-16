import Image from 'next/image'
import React from 'react'

const UserNav = ({username , avatar}) => {
  return (
    <div className=' bg-black flex justify-between font-semibold font-sans text-xl items-center text-white p-3'>
        <div className='flex items-center'>
            <Image src={'/pictures/user.png'} height={40} width={40} />
           <p className='pl-2'>
            {username}
            </p> 
        </div>
        <div>
            Thought Flow
        </div>
        <div>
            <button>Log Out</button>
        </div>

    </div>
  )
}

export default UserNav