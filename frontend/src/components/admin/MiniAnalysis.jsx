import React from 'react'
import CourseTrendsBox from '../../components/admin/CourseTrendsBox'
import EmploymentRateBox from '../../components/admin/EmploymentRateBox'

function MiniAnalysis() {
  return (
    <>
        <h2 className='text-2xl text-purple-900 font-semibold mb-6'>Analysis</h2>
        
        <EmploymentRateBox />
        <CourseTrendsBox />
    </>
  )
}

export default MiniAnalysis