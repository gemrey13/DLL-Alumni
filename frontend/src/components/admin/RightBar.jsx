import React from 'react'
import EventsCalendar from './EventsCalendar'
import Activities from './Activities'

function RightBar() {
  return (
    <aside className='hidden lg:block w-[30%] pt-9 px-8 bg-white'>
        <h2 className='text-3xl text-purple-900 font-semibold hidden lg:block'>Events</h2>

        <EventsCalendar />
        <Activities />
        
    </aside>
  )
}

export default RightBar