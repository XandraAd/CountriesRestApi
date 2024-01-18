/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { HiOutlineMoon } from "react-icons/hi2";
import { MdOutlineLightMode } from "react-icons/md";

const NavBar = ({ toggle, isDarkMode }) => {
  return (
    <>
      <div className={` flex justify-around items-center   z-999 w-screen
       h-[4rem] 
       ${isDarkMode ? 'bg-gray-700 text-white' : ' bg-white'} 
       shadow-lg
        shadow-white-500/50 
       
  
       md:h-[5rem]  
       md:px-1 
       md:justify-between 
       md:pl-[3rem]
       
       
         `}>
        <h1 className='font-bold'>Where in the world?</h1>
        <div className='flex items-center  ml-[3rem] md:mr-12'>
          {isDarkMode ? (
            <>
              <HiOutlineMoon onClick={toggle} className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`} />
              <span className='p-2'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </>
          ) : (
            <>
              <MdOutlineLightMode onClick={toggle} className={`cursor-pointer  ${isDarkMode ? 'text-white' : 'text-black'}`} />
              <span className='p-2'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
