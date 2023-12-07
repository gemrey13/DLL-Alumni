import React from 'react'
import people_color from '../../images/people_color.png'
import employed from '../../images/employed.png'
import total_alumni from '../../images/total_alumni.png'


function MiniBox() {
  return (
    <div className='flex w-[100%] flex-col lg:flex-row justify-between'>

        <div className="w-56 h-16 flex px-6 py-2 justify-between items-center bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-500 rounded-2xl shadow" >
            <section>
                <h2 className='text-white text-xl font-semibold'>Alumni</h2>
                <p className='text-slate-200'>8,054</p>
            </section>
            <div className='w-12'>  
                <img src={people_color} alt="people_color" className='' />
            </div>
        </div>

        <div className="w-56 h-16 flex px-6 py-2 justify-between items-center bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-500 rounded-2xl shadow" >
            <section>
                <h2 className='text-white text-xl font-semibold'>Total Alumni</h2>
                <p className='text-slate-200'>10,256</p>
            </section>
            <div className='w-12'>  
                <img src={total_alumni} alt="people_color" className='' />
            </div>
        </div>
        
        <div className="w-56 h-16 flex px-6 py-2 justify-between items-center bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-500 rounded-2xl shadow" >
            <section>
                <h2 className='text-white text-xl font-semibold'>Employed</h2>
                <p className='text-slate-200'>7,956</p>
            </section>
            <div className='w-12'>  
                <img src={employed} alt="people_color" className='' />
            </div>
        </div>

    </div>
  )
}

export default MiniBox