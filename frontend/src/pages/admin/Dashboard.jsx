import React from 'react'
import MiniBox from '../../components/admin/MiniBox'
import MiniAnalysis from '../../components/admin/MiniAnalysis'

function Dashboard() {
  return (
    <section className='w-[70%] px-8 pt-9'>
        <div className='text-3xl text-purple-900 font-semibold mb-5'>Dashboard</div>

        <MiniBox />
        <MiniAnalysis />
    </section>
  )
}

export default Dashboard