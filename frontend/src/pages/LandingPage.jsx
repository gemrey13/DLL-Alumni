import React from 'react'
import Navbar from '../components/shared/Navbar'
import blob_hero from '../images/blob_hero.png'
import Hero from '../components/landing/Hero'
import News from '../components/landing/News'
import Carousel from '../components/landing/Carousel'
import AboutDLL from '../components/landing/AboutDLL'

function LandingPage() {
  return (
    <>
        <div className="w-full h-[720px] md:h-[820px] md:px-16  sm:px-0 z-[-2] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
            <Navbar />
            <img src={blob_hero} alt='Blob 1' className='absolute -left-72 md:-left-80 hidden md:block'/>
            
            <Hero />
        </div>

        <News />
        <Carousel />
        <AboutDLL />
    </>
  )
}

export default LandingPage