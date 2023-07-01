import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TableAlumni from '../components/TableAlumni';

const Tracer = () => {
  const data = [1];
  

  return (
    <>
    <Navbar />
      <div className="text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24">

      <div>

        <div className='flex mt-3 flex-row-reverse sm:flex-row'>
          <h1 className='font-black text-2xl flex-1 hidden sm:block'>Alumni Tracer</h1>
          <form className=''>
            <span className='flex'>
            <input type='text' className='sm:focus:w-72 w-52 p-2 rounded-md bg-gray-100 transition-width duration-500' placeholder='Search Alumni . . . .' />
              <button className='relative top-auto right-10'>
              <i className='bx bx-search text-blue-600 text-2xl ' ></i>
              </button>
            </span>
            
          </form>
          <span className='ml-2 mr-4 sm:ml-3 sm:mr-2 transition-transform duration-200 hover:scale-110'>
            <button><i className='bx bxs-plus-square text-blue-600 hover:text-blue-800 text-4xl'></i></button>
          </span>
          <span className='mr-2 sm:mr-6 transition-transform duration-200 hover:scale-110'>
            <button><i className='bx bx-filter text-black hover:font-black text-4xl'></i></button>
          </span>
        </div>
      </div>


      <TableAlumni />
      </div>
    </>
  );
}

export default Tracer;
