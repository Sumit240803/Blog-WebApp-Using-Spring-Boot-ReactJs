import React from 'react'

const PopupMsg = ({message , visible , onClose}) => {
    if(!visible) return null;
  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupMsg