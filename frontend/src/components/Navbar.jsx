
import React, { useState, useEffect } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    // const body = document.querySelector("body");
    // const darkLight = document.querySelector("#darkLight");
    // const sidebar = document.querySelector(".sidebar");
    // const submenuItems = document.querySelectorAll(".submenu_item");
    // const darkModePref = localStorage.getItem('darkMode');

        
    // document.addEventListener("DOMContentLoaded", () => {
    //     sidebar.classList.add("close");

    //     if (sidebar.classList.contains("close")) {
    //         sidebarExpand.style.display = "block";
    //         sidebarClose.style.display = "none";
    //     } else {
    //         sidebarExpand.style.display = "none";
    //         sidebarClose.style.display = "block";
    //     }
    // });

    // const sidebarExpand = () => {
    //     sidebar.classList.remove("close", "hoverable");
    //     sidebarExpand.style.display = "none";
    //     sidebarClose.style.display = "block";
    // }

    // const sidebarClose = () => {
    //     sidebar.classList.add("close", "hoverable");
    //     sidebarExpand.style.display = "block";
    //     sidebarClose.style.display = "none";
    // }

    // const sidebarOpen = () => {
    //     sidebar.classList.toggle("close")
    // }


    // submenuItems.forEach((item, index) => {
    //     item.addEventListener("click", () => {
    //         item.classList.toggle("show_submenu");
    //         submenuItems.forEach((item2, index2) => {
    //             if (index !== index2) {
    //                 item2.classList.remove("show_submenu");
    //             }
    //         });
    //     });
    // });


    // if (window.innerWidth < 768) {
    //     sidebar.classList.add("close");
    // } else {
    //     sidebar.classList.remove("close");
    // }



    useEffect(() => {
    if (darkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    }, [darkMode]);

    const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    };

    return (
    <div>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {/* Rest of your application */}
    </div>
    );
    


  return (
    <>
        <nav className="navbar">
            <div className="logo_item">
                <i className="bx bx-menu" id="sidebarOpen" onClick={sidebarOpen}></i>
                <img src="" alt="" /><span className="navbar-text">DLL Alumni Office</span>
            </div>
            <div className="navbar_content">
                <i className="bi bi-grid"></i>
                <i className='bx bx-sun' id="darkLight"></i>
                <i className='bx bx-bell'></i>
            </div>
        </nav>  
                
        <div className="sidebar close">
            <div className="menu_content">
                <ul className="menu_items">
                    <div className="menu_title menu_dahsboard"></div>
                    <li className="item">
                        <a href="{% url 'AlumniManagement:dashboard' %}" className="nav_link">
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
                        <a href="{% url 'AlumniManagement:alumni' %}" className="nav_link">
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
                    <div className="bottom expand_sidebar" onClick={sidebarExpand}>
                        <i className='bx bx-log-in'></i>
                    </div>
                    <div className="bottom collapse_sidebar" onClick={sidebarClose}>
                        <i className='bx bx-log-out'></i>
                    </div>
                </div>
            </div>
        </div>  
    </>
  );
}

export default Navbar;
