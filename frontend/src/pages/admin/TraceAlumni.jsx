import React from 'react'
import Filtering from '../../components/admin/Filtering'

function TraceAlumni() {
  return (
    <section className='w-full lg:w-[70%] px-8 pt-3 md:pt-9 min-h-screen'>
      <h2 className='text-3xl text-purple-900 font-semibold hidden lg:block'>Tracer</h2>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Filter</button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box sm:w-11/12 sm:max-w-5xl">
          <h3 className="font-bold text-lg">Filter</h3>
          <Filtering />

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>

      
      <div className="flex flex-col gap-4 w-[100%]">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="bg-blue-500 skeleton h-32 w-full"></div>
      </div>
    </section>
  )
}

export default TraceAlumni