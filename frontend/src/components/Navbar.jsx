import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    const [darkToggle, setDarkToggle] = useState(false);

      const darkSwitch = () => {
        setDarkToggle((prevDarkToggle) => {
          const newDarkToggle = !prevDarkToggle;
          localStorage.setItem('darkMode', newDarkToggle.toString());
          return newDarkToggle;
        });
      };

      useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkToggle(savedDarkMode === 'true');
        } else {
          localStorage.setItem('darkMode', darkToggle.toString());
        }
      }, []);

      useEffect(() => {
        if (darkToggle) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkToggle]);



    return (
        <div>
        <nav  className={`navbar ${darkToggle ? 'dark:bg-gray-700 dark:bg-slate-900' : ''} transition-colors duration-500`}>
            <div className="logo_item">
                <i className="bx bx-menu" id="sidebarOpen"></i>
                <img src="" alt="" /><span className='navbar-text dark:text-white'>DLL Alumni Office</span>
            </div>
            <div className="navbar_content" onClick={darkSwitch}>
                <i className="bi bi-grid"></i>
                <i className={`bx ${darkToggle? 'bx-moon' : 'bx-sun'}`} id="darkLight"></i>
                <i className='bx bx-bell'></i>
            </div>
        </nav>
        </div>
    )
}

export default Navbar;
