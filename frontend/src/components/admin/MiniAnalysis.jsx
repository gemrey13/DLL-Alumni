import React from 'react'
import CourseTrendsBox from '../../components/admin/CourseTrendsBox'
import EmploymentRateBox from '../../components/admin/EmploymentRateBox'

function MiniAnalysis() {
  return (
    <section className='hidden md:block'>
        <h2 className='text-2xl text-purple-900 font-semibold mb-6'>Analysis</h2>
        
        <section className='flex'>
            <div className='w-[100%] lg:w-[64%] '>
                <EmploymentRateBox />
                <CourseTrendsBox />
            </div>

            <aside className='w-[36%] flex justify-end'>
                <div className="w-56 h-80 bg-white rounded-2xl">
                </div>
            </aside>

        </section>
    </section>
  )
}

export default MiniAnalysis