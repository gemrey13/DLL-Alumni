import React from 'react'
import Filtering from '../../components/admin/Filtering'
import filter_img from '../../images/filter.svg'
import TableAlumni from './TableAlumni'

function TraceAlumni() {
  return (
    <section className='w-full lg:w-[70%] px-8 pt-3 md:pt-9 min-h-screen'>
      <header className='flex lg:flex-row justify-between items-center mb-6'>
        <h2 className='text-3xl text-purple-900 font-semibold hidden lg:block'>Tracer</h2>
        <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}><img src={filter_img} alt="filter" className='w-3'/>Filter</button>
      </header>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box sm:w-11/12 sm:max-w-5xl">
            <h3 className="font-bold text-xl mb-5">Filter</h3>
            <Filtering />

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
            </div>
          </div>
        </dialog>
      <TableAlumni />
    </section>
  )
}

export default TraceAlumni