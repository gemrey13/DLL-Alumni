import React, { useContext } from "react";
import icon_alumni from "../../images/icon-alumni.png";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);

  const logout = async () => {
    logoutUser();
    toast.success(`${user.first_name} has sign-out.`);
  };

  return (
    <div className="navbar text-gray-400">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden pr-0 text-white">
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
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] px-3 py-4 shadow bg-black rounded-box w-64">
            <li className="">
              <NavLink to="/" className="text-base py-1">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-base py-1">
                About
              </NavLink>
            </li>
            <li className="py-2">
              <a className="menu-title text-whiten">News and Update</a>
              <ul className="px-3 py-4 shadow bg-black rounded-box w-52">
                <li>
                  <NavLink to="/news">News</NavLink>
                </li>
                <li>
                  <a>System Updates</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/tracer-survey-form" className="text-base py-1">
                Tracer Form
              </NavLink>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl text-white align-middle lg:flex hidden md:block">
          {" "}
          <img
            src={icon_alumni}
            alt="Icon Alumni"
            className="hidden md:inline mr-2"
          />
          DLL Alumni Association
        </Link>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex flex-nowrap">
          <ul className="menu menu-horizontal px-1 mr-6 ">
            <li className="px-2">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="px-2">
              <a>About</a>
            </li>
            <li className="px-2 z-10">
              <details>
                <summary>News and Update</summary>
                <ul className="px-3 py-4 shadow bg-black rounded-box w-52">
                  <li>
                    <NavLink to="/news">News</NavLink>
                  </li>
                  <li>
                    <a>Update</a>
                  </li>
                </ul>
              </details>
            </li>
            <li className="px-2">
              <NavLink to="/tracer-survey-form">Tracer Form</NavLink>
            </li>
          </ul>
        </div>

        {user ? (
          <>
            <button onClick={logout} className="btn bg-[#FFC700] btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/auth/signin" className="btn bg-[#FFC700] btn-sm">
              Login
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="btn btn-ghost btn-sm text-white">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
