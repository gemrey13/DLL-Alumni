import React from 'react';


const Nav = () => {
	return (
		<>
			<nav className='flex justify-between items-center px-[4em] pt-[1em]'>
				<div className='flex justify-between items-center justify-between w-[50%] text-black-1'>
					<h5 className='text-5xl'>Logo</h5>
					<h5>Home</h5>
					<h5>About</h5>
					<h5>News & Update</h5>
				</div>
				<h5 className='w-1/5 text-black text-lg items-end'>Sign In</h5>
			</nav>
		</>
	)
};

export default Nav;