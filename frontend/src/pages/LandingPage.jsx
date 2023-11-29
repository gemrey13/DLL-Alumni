import React from 'react'
import Navbar from '../components/shared/Navbar'
import blob_hero from '../images/blob_hero.png'
import Hero from '../components/landing/Hero'

function LandingPage() {
  return (
    <>
        <div className="w-full h-[820px] md:px-16  sm:px-0 z-[-2] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
            <Navbar />
            <img src={blob_hero} alt='Blob 1' className='absolute -left-72'/>
            
            <Hero />
        </div>
    </>
  )
}

export default LandingPage