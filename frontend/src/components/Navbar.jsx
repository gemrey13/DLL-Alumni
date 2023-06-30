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
        <nav  className='navbar dark:bg-gray-700 dark:bg-slate-900 bg-white transition-colors duration-500'>
            <div className="logo_item">
                <i className="bx bx-menu" id="sidebarOpen"></i>
                <img src="" alt="" /><span className='navbar-text dark:text-white'>DLL Alumni Office</span>
            </div>
            <div className="navbar_content dark:text-white" onClick={darkSwitch}>
                <i className="bi bi-grid"></i>
                <i className={`bx ${darkToggle? 'bx-moon' : 'bx-sun'}`} id="darkLight"></i>
                <i className='bx bx-bell'></i>
            </div>
        </nav>

        <nav className="sidebar close bg-white">
            <div className="menu_content">
                <ul className="menu_items">
                    <div className="menu_title menu_dahsboard"></div>

                    <li className="item">
                        <a href="" className="nav_link">
                            <span className="navlink_icon">
                                <i className="bx bx-grid-alt"></i>
                            </span>
                            <span className="navlink">Overview</span>
                        </a>
                    </li>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-home-alt"></i>
                        </span>
                        <span className="navlink">Home</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>
                    <ul className="menu_items submenu">
                        <a href="#" className="nav_link sublink">Under Development</a>
                        <a href="#" className="nav_link sublink">Under Development</a>
                    </ul>
                    <li className="item">
                        <a href="" className="nav_link">
                            <span className="navlink_icon">
                                <i className='bx bx-user'></i>
                            </span>
                            <span className="navlink">Alumni</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className='bx bx-message-square-add'></i>
                            </span>
                            <span className="navlink">Post Request</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className='bx bx-book-bookmark'></i>
                            </span>
                            <span className="navlink">Tracer</span>
                        </a>
                    </li>
 
                </ul>
                <ul className="menu_items">
                    <div className="menu_title menu_setting"></div>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className="bx bx-flag"></i>
                            </span>
                            <span className="navlink">Notification</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className="bx bx-medal"></i>
                            </span>
                            <span className="navlink">Award</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className="bx bx-cog"></i>
                            </span>
                            <span className="navlink">Setting</span>
                        </a>
                    </li>
                    <li className="item">
                        <a href="#" className="nav_link">
                            <span className="navlink_icon">
                                <i className="bx bx-layer"></i>
                            </span>
                            <span className="navlink">Features</span>
                        </a>
                    </li>
                </ul>

                <div className="bottom_content">
                    <div className="bottom expand_sidebar">
                        <i className='bx bx-log-in'></i>
                    </div>
                    <div className="bottom collapse_sidebar">
                        <i className='bx bx-log-out'></i>
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}

export default Navbar;
