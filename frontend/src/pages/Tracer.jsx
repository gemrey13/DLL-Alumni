import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Tracer = () => {
  const data = [1];
  

  return (
    <>
    <Navbar />
      <div className="text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24">

      <div>

        <div className='flex mt-3 flex-row-reverse sm:flex-row'>
          <h1 className='font-extralight text-2xl flex-1 hidden sm:block'>Alumni Tracer</h1>
          <form className=''>
            <span className='flex'>
            <input type='text' className='sm:focus:w-72 w-52 p-2 ml-2 rounded-md bg-gray-100 transition-width duration-500' placeholder='Search Alumni . . . .' />
              <button className='relative top-auto right-10'>
              <i className='bx bx-search text-blue-600 text-2xl ' ></i>
              </button>
            </span>
            
          </form>
          <span className='ml-2 mr-4 sm:ml-3 sm:mr-2'>
            <button><i className='bx bxs-plus-square text-blue-600 text-4xl'></i></button>
          </span>
          <span className='mr-2 sm:mr-6'>
            <button><i className='bx bx-filter text-black text-4xl'></i></button>
          </span>
        </div>
      </div>

        <div className="overflow-auto rounded-lg shadow hidden sm:block mt-4" id="table-container">
            <table className="w-full shadow-gray-700 shadow-md bg-gray-400">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr className='text-md'>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">ID</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">First Name</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">Last Name</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">Course</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">Grad Year</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">Email</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-left">Mobile No.</th>
                        <th className="w-auto px-3 py-4 font-semibold tracking-wide text-center"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                <tr className='bg-white hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200 hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200 hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200 hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>

                  <tr className='bg-white hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200 hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white hover:-translate-y-1 transition-transform duration-200'>
                    <td className="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap"></td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                {/*{data.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'bg-white' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">A10000</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button>See</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}*/}
                </tbody>
              </table>
              
        </div>
        <div className='bg-white space-y-2 p-4 rounded-lg shadow border-l-4 border-black hover:border-green  hover:-translate-y-1 transition-transform duration-200 mt-5 mr-5'>

          <div className='text-lg font-bold text-black flex justify-between '>
            <span>Gem Rey Ranola</span>
            <span>2017</span>
          </div>

          <div className='text-gray-700 text-md font-semibold'>A10000 <span>BSIT</span></div>
          <hr className='border-gray-400' />
          <div className='text-sm text-gray-700 flex justify-between'>
            <span>gemreyranola@gmail.com</span> 
            <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
          </div>
          <div className='text-sm text-gray-700 flex justify-between'>
            <span>09**********</span>
            <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Tracer;
