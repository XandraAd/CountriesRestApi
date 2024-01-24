/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { HiOutlineMoon } from "react-icons/hi2";
import { MdOutlineLightMode } from "react-icons/md";


const NavBar = ({ toggle, toggleDarkMode, isDarkMode }) => {


  const handleToggleClick = () => {
    if (toggle) {
      toggle();
    }
    if (toggleDarkMode) {
      toggleDarkMode();
    }
  };

  

  useEffect(() => {
    //console.log("isDarkMode in NavBar:", isDarkMode);
  }, [isDarkMode]);
  return (
    <>
    <div
            className={`flex justify-around items-center fixed top-0 z-40 w-screen
           h-[5rem]   
           ${isDarkMode ? "bg-gray-700 text-white" : " bg-white"} 
           shadow-lg
           shadow-white-500/50 
           md:h-[6rem]  
           md:px-1 
           md:justify-between 
           md:pl-[3rem]
           
           xl:pr-[2rem]
           2xl:pr-0
           
          
            
           `}
          >
           
           <h1 className="font-bold cursor-pointer">Where in the world?</h1>
           
        
       
            
            <div className="flex items-center ml-[2rem] md:mr-10 lg:mr-12 xl:mr-3 2xl:xl:mr-14 hover:bg-slate-600 ">
              {isDarkMode ? (
                <>
                  <HiOutlineMoon
                    onClick={handleToggleClick}
                    className={`cursor-pointer ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  />
                  <span className="p-2">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </>
              ) : (
                <>
                  <MdOutlineLightMode
                    onClick={handleToggleClick}
                    className={`cursor-pointer  ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  />
                  <span className="p-2">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </>
              )}
            </div>
          </div>
              
   
 
     
    </>
  );
};

export default NavBar;
