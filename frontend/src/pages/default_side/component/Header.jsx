import React from 'react'

export default function Nav() {
  return (
	// <nav className='flex justify-between items-center px-[4em] py-[2em]'>
	// 	<div className='flex justify-between items-center justify-between w-[50%] text-black-1'>
	// 		<h5 className='text-5xl'>Logo</h5>
	// 		<h5>Home</h5>
	// 		<h5>About</h5>
	// 		<h5>News & Update</h5>
	// 	</div>
	// 	<h5 className='w-1/5 text-black text-lg text-right'>Sign In</h5>
	// </nav>
	<div class="navbar bg-green-800">
		<div class="navbar-start">
			<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
			</label>
			<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<li><a>Home</a></li>
				<li>
				<a>News & Update</a>
				<ul class="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</li>
				<li><a>About</a></li>
			</ul>
			</div>
			<a class="btn btn-ghost normal-case text-xl text-white">DLL Alumni</a>
		</div>

		<div class="navbar-center hidden lg:flex font-mono ">
			<ul class="menu menu-horizontal px-1 text-white text-lg">
			<li><a>Home</a></li>
			<li tabindex="0">
				<details>
				<summary>News & Update</summary>
				<ul class="p-2 text-black">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
				</details>
			</li>
			<li><a>About</a></li>
			</ul>
		</div>
		<div class="navbar-end">
			<a class="btn">Sign In</a>
		</div>
	</div>
  )
}
