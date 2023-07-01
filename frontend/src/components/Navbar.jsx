import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    const [darkToggle, setDarkToggle] = useState(false);
    const [isSidebarClosed, setSidebarClosed] = useState(true);
    const [isMobileView, setMobileView] = useState(false);
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const handleExpandSidebar = () => {
        setSidebarClosed(false);
        setSidebarExpanded(true);
    };

    const handleCloseSidebar = () => {
        setSidebarClosed(true);
        setSidebarExpanded(false);
    };

    const handleToggleSidebar = () => {
        setSidebarClosed(!isSidebarClosed);
    };

    const darkSwitch = () => {
        setDarkToggle((prevDarkToggle) => {
            const newDarkToggle = !prevDarkToggle;
            localStorage.setItem('darkMode', newDarkToggle.toString());
            return newDarkToggle;
        });
    };


    useEffect(() => {
        if (isSidebarOpen) {
            setSidebarClosed(false);
        } else {
            setSidebarClosed(true);
        }
    }, [isSidebarOpen]);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkToggle(savedDarkMode === 'true');
        } else {
            localStorage.setItem('darkMode', darkToggle.toString());
        }


        function handleWindowResize() {
            if (window.innerWidth < 640) {
                setMobileView(true);
            } else {
                setMobileView(false);
            }
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

        const handleDOMContentLoaded = () => {
            setSidebarClosed(true);
            setSidebarExpanded(false);
        };

        document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

        return () => {
            document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        };

    }, []);

    useEffect(() => {
        if (darkToggle) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkToggle]);

    useEffect(() => {
        if (isSidebarClosed) {
            document.querySelector('.sidebar').classList.add('close');
        } else {
            document.querySelector('.sidebar').classList.remove('close');
        }
    }, [isSidebarClosed]);




    return (
        <>
        <nav  className='navbar dark:bg-gray-700 dark:bg-slate-900 bg-white transition-colors duration-500 shadow-gray-400 shadow-sm'>
            <div className="logo_item">
                <i className={`bx bx-menu ${!isMobileView? 'hidden' : ''}`} id="sidebarOpen" onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
                <img src="" alt="" /><span className='navbar-text dark:text-white'>DLL Alumni Office</span>
            </div>
            <div className="navbar_content dark:text-white" onClick={darkSwitch}>
                <i className="bi bi-grid"></i>
                <i className={`bx ${darkToggle? 'bx-moon' : 'bx-sun'}`} id="darkLight"></i>
                <i className='bx bx-bell'></i>
            </div>
        </nav>

        <nav className={`sidebar ${!isSidebarClosed ? 'close' : ''} bg-white dark:bg-gray-700 shadow-gray-900`}>
            <div className={`menu_content ${isSidebarClosed ? 'my-12' : 'my-8'}`}>
            {isSidebarClosed && <hr className='mt-5 border-slate-300 w-5 mx-auto'/>}
                <ul className="menu_items ">
                    <div className={`menu_title menu_dahsboard ${isSidebarClosed? 'hidden': ''}`}></div>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-grid-alt"></i>
                        </span>
                        <span className="navlink">Overview</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-home-alt"></i>
                        </span>
                        <span className="navlink">Home</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-user"></i>
                        </span>
                        <span className="navlink">Tracer</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-book-bookmark"></i>
                        </span>
                        <span className="navlink">Analysis</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>

                    <div href="#" className="nav_link submenu_item">
                        <span className="navlink_icon">
                            <i className="bx bx-message-square-add"></i>
                        </span>
                        <span className="navlink">Post Request</span>
                        <i className="bx bx-chevron-right arrow-left"></i>
                    </div>

                </ul>
                {isSidebarClosed && <hr className='mt-5 border-slate-300 w-5 mx-auto'/>}
                <ul className="menu_items">
                    <div className={`menu_title menu_setting ${isSidebarClosed? 'hidden': ''}`}></div>
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
                    <div className="bottom expand_sidebar" style={{ display: !isSidebarExpanded ? 'block' : 'none' }} onClick={handleExpandSidebar}>
                        <i className='bx bx-log-in'></i>
                    </div>
                    <div className="bottom collapse_sidebar" style={{ display: isSidebarExpanded ? 'block' : 'none' }} onClick={handleCloseSidebar}>
                        <i className='bx bx-log-out'></i>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;