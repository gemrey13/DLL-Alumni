import React from "react";

const Header = () => {
    return (
        <>
            {/* NAVBAR */}
            <div className="navbar text-white sticky top-0 w-full md:px-9 sm:px-0 z-99999 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="bg-slate-800 text-gray-400 menu menu-md dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            <li>
                                <a>Find Work</a>
                            </li>
                            <li className="py-2">
                                <a className="menu-title text-whiten">
                                    News and Update
                                </a>
                                <ul className="">
                                    <li>
                                        <a>News</a>
                                    </li>
                                    <li>
                                        <a>System Updates</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Events</a>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl hidden md:inline-flex">
                        DLL Alumni Asssociation
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex text-gray-400">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>Find Work</a>
                        </li>
                        <li>
                            <details>
                                <summary>News and Update</summary>
                                <ul className="p-2 bg-slate-800">
                                    <li>
                                        <a>News</a>
                                    </li>
                                    <li>
                                        <a>System Updates</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a>Events</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end text-gray-400 ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="bg-slate-800 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* END NAVBAR */}
        </>
    );
};

export default Header;
