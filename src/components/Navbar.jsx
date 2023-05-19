import React from 'react'
import {BsSearch} from 'react-icons/all.js'
import logo from '../assets/IFC Film.svg'


const Navbar = () => {
    return (
       <div className="grid grid-cols-12 text-black px-6 absolute w-full z-[1000] top-0 left-0 shadow-xl">
           <div className="w-[50%] grid place-items-center h-full col-span-2">
               <img src={logo} alt="logo" />
           </div>

           <div className="col-span-3 h-full">
               <ul className="flex justify-between items-center list-none h-full text-xl">
                   <li className="text-red-500 transition duration-500 ease hover:border-b-2 hover:border-b-red-600 font-medium cursor-pointer">Popular</li>
                   <li className="text-red-500 transition duration-500 ease hover:border-b-2 hover:border-b-red-600 font-medium cursor-pointer">Movies</li>
                   <li className="text-red-500 transition duration-500 ease hover:border-b-2 hover:border-b-red-600 font-medium cursor-pointer">TV Show</li>
               </ul>
           </div>

           <div className="col-span-5 flex items-center justify-center">
              <div className="w-[50%] relative opacity-70">
                  <input type="text" className="text-black w-full pl-10 text-xl py-1.5 rounded-xl border-2 border-gray-200 outline outline-gray-500" />
                  <button type='submit'><BsSearch className="absolute top-1.5 left-2 text-black" size={30} /></button>
              </div>
           </div>
           <div className="col-span-2 flex justify-end">
                login
           </div>
       </div>
    )
}

export default Navbar
