import React from 'react'
import Typewriter from './Typewriter';


const Hero = () => {
    
    const sentence = ["Share What You Think","Read content and Grow Together!","THOUGHT FLOW BY TECHYARD"]
    return (
       <main >
        <div className="pt-20 flex justify-between">
      <div className="p-4 text-5xl w-1/3 h-fit text-wrap border-2 bg-emerald-400 shadow-2xl drop-shadow-xl brightness-125 backdrop-brightness-125 border-white text-center rounded-full ml-32">
       <Typewriter texts={sentence} speed={100} />
      </div>
      <div className="bg-emerald-400 w-1/4 h-1/2 border border-white shadow-lg shadow-fuchsia-400  mr-32">
        <ul className="p-7 font-sans text-2xl font-semibold shadow-2xl drop-shadow-xl backdrop-brightness-125 ">
            <li className="py-2 drop-shadow-2xl">
                Create Your Own Blogs
            </li>
            <li className="py-2 drop-shadow-2xl">
                Publish Under Your Name
            </li>
            <li className="py-2 drop-shadow-2xl">
                Grow With Us
            </li>
            <li className="py-2 drop-shadow-2xl">
                Create Your Own Community
            </li>
        </ul>
      </div>
        </div>
       </main>
    );
}

export default Hero