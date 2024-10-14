import Header from '@/app/components/Header';
import React from 'react';

const page = () => {
  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/pictures/bckground.jpg')" }}>
      <div className="absolute top-0 w-full">
        <Header />
      </div>

      <div className="bg-white opacity-90 border-2 border-black border-opacity-25 rounded-3xl p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>
        
        <form className="flex flex-col space-y-5">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
