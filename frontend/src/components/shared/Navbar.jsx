import React from 'react'

function Navbar() {
  return (
    <div className="navbar text-gray-400">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pr-0 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>News and Update</a></li>
            </ul>
            </div>
            <a className="btn btn-ghost text-xl text-white">DLL Alumni Association</a>
        </div>
        
        <div className="navbar-end">
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1 mr-8">
                    <li className="px-3"><a>Home</a></li>
                    <li className="px-3"><a>About</a></li>
                    <li className="px-3"><a>News and Update</a></li>
                </ul>
            </div>
            <a className="btn bg-[#FFC700] btn-sm">Login</a>
        </div>
    </div>
  )
}

export default Navbar