import React from 'react'
import MiniBox from '../../components/admin/MiniBox'
import MiniAnalysis from '../../components/admin/MiniAnalysis'
import magnify from '../../images/magnify.png'
import notif from '../../images/notif.png'
import CourseTrendsBox from '../../components/admin/CourseTrendsBox'
import EmploymentRateBox from '../../components/admin/EmploymentRateBox'

function Dashboard() {
  return (
    <section className='w-full lg:w-[70%] px-8 pt-3 md:pt-9'>
        <header className='flex lg:flex-row justify-between items-center'>
            <div className='text-3xl text-purple-900 font-semibold hidden lg:block'>Dashboard</div>

            <section className='flex w-[100%] lg:w-[33%] justify-center lg:justify-between items-center'>
                <div className='flex relative text-gray-600'>
                    <input className="border-2 border-gray-300 bg-white h-12 lg:h-10 px-5 lg:px-4 lg:pr-9 pr-10 rounded-lg lg:text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                    <button type='submit' className='w-6 absolute right-2 top-3 lg:top-2'>
                        <img src={magnify} alt="magnify"/>
                    </button>
                </div>
                
                <div className='w-6 hidden lg:block'>
                    <img src={notif} alt="notif" />
                </div>
            </section>
            
        </header>

        <MiniBox />
        <MiniAnalysis />


        <EmploymentRateBox />
        <CourseTrendsBox />
    </section>
  )
}

export default Dashboard