import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import icon_alumni from "../../images/icon-alumni.png";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  let { logoutUser, user } = useContext(AuthContext);
  return (
    <>
      <div className="navbar text-white sticky top-0 w-full md:px-9 sm:px-0 z-9 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="bg-slate-800 text-gray-400 menu menu-md dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-64">
              <li className="py-2">
                <a className="menu-title text-whiten">Find Work</a>
                <ul className="px-3 py-4 shadow bg-black rounded-box w-52">
                  <li>
                    <NavLink to="/u/jobs">Find Work</NavLink>
                  </li>
                  <li>
                    <NavLink to="/u/sdfd">Saved Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/u/sdfd">Job Application</NavLink>
                  </li>
                </ul>
              </li>
              <li className="py-2">
                <a className="menu-title text-whiten">News and Update</a>
                <ul className="px-3 py-4 shadow bg-black rounded-box w-52">
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
          <Link
            to="/u/"
            className="btn btn-ghost lg:text-xl text-white align-middle lg:flex text-sm">
            {" "}
            <img
              src={icon_alumni}
              alt="Icon Alumni"
              className="hidden md:inline mr-2"
            />
            DLL Alumni Association
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex text-gray-400">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Find Work</summary>
                <ul className="p-2 w-56 bg-slate-800">
                  <li>
                    <NavLink to="/u/jobs">Find Work</NavLink>
                  </li>
                  <li>
                    <NavLink to="/u/fg">Saved Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/u/fgfd">Job Application</NavLink>
                  </li>
                </ul>
              </details>
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
              className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-3xl">
                  {user.first_name[0].toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="bg-slate-800 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
              <li>
                <NavLink to="/u/my-profile/" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/u/settings/edit-profile">Settings</NavLink>
              </li>
              <li onClick={logoutUser}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
