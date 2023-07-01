import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Tracer = () => {
  const data = [1];
  

  return (
    <>
    <Navbar />
      <div className="text-black dark:text-white ml-6 sm:mr-4 my-20 sm:ml-24 sm:my-24">

      <div>
        <h1 className='font-extralight text-2xl'>Alumni Tracer</h1>

        <div className='flex mt-3'>
          <form className='flex-1'>
            <input type='text' className='w-full p-2 ml-2 rounded-md bg-gray-100' placeholder='Search Alumni . . . .' />
          </form>
          <span className='ml-3'>
            <button><i class='bx bxs-plus-square text-blue-600 text-4xl'></i></button>
          </span>
          <span className='mr-3'>
            <button><i class='bx bx-filter text-black text-4xl'></i></button>
          </span>
        </div>
      </div>

        <div className="overflow-auto rounded-lg shadow hidden sm:block mt-4" id="table-container">
            <table className="w-full">
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
                <tbody class="divide-y divide-gray-100">
                <tr className='bg-white'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>

                  <tr className='bg-white'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-gray-200'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                  <tr className='bg-white'>
                    <td class="w-auto p-3 text-sm text-black whitespace-nowrap">A10000</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="w-auto p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <button className='px-4 py-1 bg-blue-500 rounded-md text-white'>See</button>
                      <button className='ml-2 py-1 bg-orange-500 px-3 rounded-md text-white'>Delete</button>
                    </td>
                  </tr>
                {/*{data.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'bg-white' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">A10000</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">BSIT</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button>See</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}*/}
                </tbody>
              </table>
        
        </div>
      </div>
    </>
  );
}

export default Tracer;
