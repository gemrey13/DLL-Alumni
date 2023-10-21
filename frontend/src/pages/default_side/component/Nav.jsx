import React from 'react'

export default function Nav() {
  return (
	<nav className='flex justify-between items-center px-[4em] py-[2em]'>
		<div className='flex justify-between items-center justify-between w-[50%] text-black-1'>
			<h5 className='text-5xl'>Logo</h5>
			<h5>Home</h5>
			<h5>About</h5>
			<h5>News & Update</h5>
		</div>
		<h5 className='w-1/5 text-black text-lg text-right'>Sign In</h5>
	</nav>
  )
}
