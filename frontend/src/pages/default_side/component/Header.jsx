import React from 'react'

export default function Nav() {
  return (
	<div className="navbar bg-white">
		<div className="navbar-start">
			<div className="dropdown">
			<label tabIndex="0" className="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</label>
			<ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-slate-700 rounded-box w-52">
				<li><a>Home</a></li>
				<li>
				<a>News & Update</a>
				<ul className="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</li>
				<li><a>About</a></li>
			</ul>
			</div>
			<a className="btn btn-ghost normal-case md:text-2xl text-xl text-slate-900 font-bold">DLL Alumni</a>
		</div>

		<div className="navbar-center hidden lg:flex font-mono">
			<ul className="menu menu-horizontal px-1 text-slate-700 text-lg">
			<li><a>Home</a></li>
			<li tabIndex="0">
				<details>
				<summary>News & Update</summary>
				<ul className="p-2 text-black">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</details>
			</li>
			<li><a>About</a></li>
			</ul>
		</div>
		<div className="navbar-end">
			<a className="btn bg-sky-400">Sign In</a>
		</div>
	</div>
  )
}
