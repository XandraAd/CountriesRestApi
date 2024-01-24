/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import NavBar from './NavBar';

const Layout = ({ isDarkMode, toggleDarkMode, children }) => {
  


    
        return (
          <div className={`${isDarkMode ? "dark" : "bg-slate-150"} `}>
            <NavBar toggle={toggleDarkMode} isDarkMode={isDarkMode} />
            {children}
          </div>
        );
      };
      

export default Layout