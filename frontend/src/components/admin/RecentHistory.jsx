import React from 'react'

function RecentHistory() {
  return (
    <section className='w-[100%]'>
      <div className='flex justify-between items-end mb-3 mt-4'>
        <h2 className='text-2xl text-purple-900 font-semibold'>Recent History</h2>
        <p className='text-sm text-purple-900 font-semibold btn btn-ghost btn-xs'><a>SEE ALL</a></p>
      </div>


      <div className="overflow-x-auto">
        <table className="table table-xs lg:table-md table-pin-rows table-pin-cols text-neutral-500 text-base">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Year Graudated</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-base-200">
              <th className='text-purple-600'>#5045</th>
              <td>Menemedez, Menard</td>
              <td>2022-2023</td>
              <td>menardmenemedez@gmail.com</td>
              <td>Employed</td>
            </tr>
            <tr>
              <th className='text-purple-600'>#5036</th>
              <td>Balingbing, John Rovie</td>
              <td>2022-2023</td>
              <td>roviepogi@gmail.com</td>
              <td>Employed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecentHistory