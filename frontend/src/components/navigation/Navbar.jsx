import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/navbar.css';
import avatarMale from '../../assets/avatar-male.jpg';

const Navbar = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const [isMobileView, setMobileView] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuProfile, setMenuProfile] = useState(false);
  const location = useLocation();
  const loc = location.pathname;

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


  console.log(isMenuProfile)

  return (
    <>
      <nav className="navbar text-gray-900 bg-white dark:bg-slate-900 dark:text-white transition-colors duration-500 shadow-gray-400 shadow-sm">
        <div className="logo_item">
          <i className={`bx bx-menu ${!isMobileView ? 'hidden' : ''}`} id="sidebarOpen" onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
          <img src="" alt="" />
          <span className="navbar-text dark:text-white">DLL Alumni Office</span>
        </div>
        <div className="navbar_content dark:text-white">
          <i className={`bx ${darkToggle ? 'bx-moon' : 'bx-sun'} hover: transition-transform duration-200 hover:scale-125`} id="darkLight" onClick={darkSwitch}></i>
          <i className="bx bx-bell hover: transition-transform duration-200 hover:scale-125"></i>
          <span onClick={() => isMenuProfile? setMenuProfile(false) : setMenuProfile(true)} className="w-full h-10 border-2 border-blue-600 cursor-pointer transition-colors duration-500 animate-border-color rounded-full">
            <img src={avatarMale} alt="" className="relative mt-1" />

            {isMenuProfile && (
              <div className="relative transition-all duration-1000 max-h-0">
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">   
                  <a href="#" className="transition-colors duration-200 block px-4 py-3 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">Settings</a>
                  <a href="#" className="transition-colors duration-200 block px-4 py-3 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">Logout</a>
                </div>
              </div>
            )}

          </span>
        </div>
      </nav>

      <nav className={`sidebar text-gray-900 bg-white dark:bg-slate-800 dark:text-white shadow-gray-900`}>
        <div className={`menu_content ${isSidebarClosed ? 'my-12' : 'my-8'} `}>
          {isSidebarClosed && <hr className="mt-5 border-slate-300 w-5 mx-auto" />}
          <ul className="menu_items ">
            <div className={`menu_title menu_dahsboard ${isSidebarClosed ? 'hidden' : ''}`}></div>

            <Link to="/Home" className={`nav_link submenu_item hover:bg-indigo-700 ${isSidebarExpanded && location.pathname === '/Home' ? 'bg-indigo-700 text-gray-200 hover:bg-indigo-700' : ''}`}>
              <span className={`${loc === '/Home' ? 'bg-indigo-700 text-white' : 'hover:text-white'} navlink_icon`}>
                <i className="bx bx-home-alt"></i>
              </span>
              <span className={`navlink ${loc === '/Home' ? 'text-white' : 'hover:text-white'}`}>Home</span>
              {location.pathname === '/Home' && <i className={`${isSidebarExpanded ? 'text-gray-200' : 'text-black dark:text-white'} bx bx-chevron-right arrow-left  font-bold`}></i>}
            </Link>

            <Link to="/Dashboard" className={`nav_link submenu_item hover:bg-indigo-700 ${isSidebarExpanded && location.pathname === '/Dashboard' ? 'bg-indigo-700 text-gray-200 hover:bg-indigo-700' : ''}`}>
              <span className={`${loc === '/Dashboard' ? 'bg-indigo-700 text-white' : 'hover:text-white'} navlink_icon`}>
                <i className="bx bx-grid-alt"></i>
              </span>
              <span className={`navlink ${loc === '/Dashboard' ? 'text-white' : 'hover:text-white'}`}>Dashboard</span>
              {location.pathname === '/Dashboard' && <i className={`${isSidebarExpanded ? 'text-gray-200' : 'text-black dark:text-white'} bx bx-chevron-right arrow-left  font-bold`}></i>}
            </Link>

            <Link to="/Tracer" className={`nav_link submenu_item hover:bg-indigo-700 ${isSidebarExpanded && location.pathname === '/Tracer' ? 'bg-indigo-700 text-gray-200 hover:bg-indigo-700' : ''}`}>
              <span className={`${loc === '/Tracer' ? 'bg-indigo-700 text-white' : 'hover:text-white'} navlink_icon`}>
                <i className="bx bx-user"></i>
              </span>
              <span className={`navlink ${loc === '/Tracer' ? 'text-white' : 'hover:text-white'}`}>Tracer</span>
              {location.pathname === '/Tracer' && <i className={`${isSidebarExpanded ? 'text-gray-200' : 'text-black dark:text-white'} bx bx-chevron-right arrow-left  font-bold`}></i>}
            </Link>

            <Link to="/Analysis" className={`nav_link submenu_item hover:bg-indigo-700 ${isSidebarExpanded && location.pathname === '/Analysis' ? 'bg-indigo-700 text-gray-200 hover:bg-indigo-700' : ''}`}>
              <span className={`${loc === '/Analysis' ? 'bg-indigo-700 text-white' : 'hover:text-white'} navlink_icon`}>
                <i className="bx bx-book-bookmark"></i>
              </span>
              <span className={`navlink ${loc === '/Analysis' ? 'text-white' : 'hover:text-white'}`}>Analysis</span>
              {location.pathname === '/Analysis' && <i className={`${isSidebarExpanded ? 'text-gray-200' : 'text-black dark:text-white'} bx bx-chevron-right arrow-left  font-bold`}></i>}
            </Link>

            <Link to="/#" className={`nav_link submenu_item hover:bg-indigo-700 ${isSidebarExpanded && location.pathname === '/#' ? 'bg-indigo-700 text-gray-200 hover:bg-indigo-700' : ''}`}>
              <span className={`${loc === '/#' ? 'bg-indigo-700 text-white' : 'hover:text-white'} navlink_icon`}>
                <i className="bx bx-message-square-add"></i>
              </span>
              <span className={`navlink ${loc === '/#' ? 'text-white' : 'hover:text-white'}`}>Post Request</span>
              {location.pathname === '/#' && <i className={`${isSidebarExpanded ? 'text-gray-200' : 'text-black dark:text-white'} bx bx-chevron-right arrow-left  font-bold`}></i>}
            </Link>
          </ul>

          {isSidebarClosed && <hr className="mt-5 border-slate-300 w-5 mx-auto" />}

          <ul className="menu_items">
            <div className={`menu_title menu_setting ${isSidebarClosed ? 'hidden' : ''}`}></div>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-flag"></i>
                </span>
                <span className="navlink">Notification</span>
              </Link>
            </li>

            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-medal"></i>
                </span>
                <span className="navlink">Award</span>
              </Link>
            </li>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-cog"></i>
                </span>
                <span className="navlink">Setting</span>
              </Link>
            </li>
            <li className="item">
              <Link href="#" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bx-layer"></i>
                </span>
                <span className="navlink">Features</span>
              </Link>
            </li>
          </ul>

          <div className="bottom_content">
            <div className="bottom expand_sidebar" style={{ display: !isSidebarExpanded ? 'block' : 'none' }} onClick={handleExpandSidebar}>
              <i className='bx bx-expand-horizontal' ></i>
            </div>
            <div className="bottom collapse_sidebar" style={{ display: isSidebarExpanded ? 'block' : 'none' }} onClick={handleCloseSidebar}>
             <i className='bx bx-collapse-horizontal'></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
