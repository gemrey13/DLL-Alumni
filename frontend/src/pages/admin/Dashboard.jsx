import React from 'react'
import MiniBox from '../../components/admin/MiniBox'
import MiniAnalysis from '../../components/admin/MiniAnalysis'
import magnify from '../../images/magnify.png'
import notif from '../../images/notif.png'

function Dashboard() {
  return (
    <section className='w-[70%] px-8 pt-9'>
        <header className='flex justify-between items-center'>
            <div className='text-3xl text-purple-900 font-semibold'>Dashboard</div>
            <section className='flex w-[33%] justify-between items-center'>

                <div className='flex relative text-gray-600'>
                    <input className="border-2 border-gray-300 bg-white h-10 px-4 pr-9 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                    <button type='submit' className='w-6 absolute right-2 top-2'>
                        <img src={magnify} alt="magnify"/>
                    </button>
                </div>
                
                <div className='w-6'>
                    <img src={notif} alt="notif" />
                </div>
            </section>
        </header>

        <MiniBox />
        <MiniAnalysis />
    </section>
  )
}

export default Dashboard