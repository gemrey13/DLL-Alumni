import React, { useState, useEffect } from 'react';

const TracerAlumniTable = () => {
  return (
    <>
      <div className="overflow-auto rounded-lg shadow hidden sm:block mt-4" id="table-container">
        <table className="w-full shadow-gray-700 shadow-md bg-gray-400 dark:bg-slate-400">
          <thead className="bg-gray-200 dark:bg-slate-700 dark:text-white text-gray-500 border-b-2 border-gray-200">
            <tr className="text-sm ">
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">ID</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">First Name</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Last Name</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Staus</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Grad Year</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Email</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-left">Mobile No.</th>
              <th className="w-auto px-3 py-4 font-extralight tracking-wide text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-white bg-red-500 rounded-full'>Unemployed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-white bg-red-500 rounded-full'>Unemployed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full'>Employed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-white bg-red-500 rounded-full'>Unemployed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>
            <tr className="bg-white dark:bg-slate-700 dark:text-white text-gray-500  hover:-translate-y-1 transition-transform duration-200">
              <td className="w-auto p-3 text-sm whitespace-nowrap">A10000</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Gem Rey</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">Ranola</td>
              <td className="w-auto whitespace-nowrap"><span className='inline-flex px-2 text-xs font-semibold leading-5 text-white bg-red-500 rounded-full'>Unemployed</span></td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">2017</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">gemreyranola@gmail.com</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap">09**********</td>
              <td className="w-auto p-3 text-sm whitespace-nowrap text-center">
                <button className="px-4 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-700 hover:-translate-y-1 transition-transform duration-200">Edit</button>
                <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white hover:bg-orange-700 hover:-translate-y-1 transition-transform duration-200">Delete</button>
              </td>
            </tr>

            {/*{data.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'bg-white' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">A10000</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Employed</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Gem Rey</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Ranola</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">2017</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">gemreyranola@gmail.com</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">09**********</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}*/}
          </tbody>
        </table>
      </div>

      <div className="bg-white sm:hidden space-y-2 p-4 rounded-lg shadow border-l-4 border-black hover:border-green  hover:-translate-y-1 transition-transform duration-200 mt-5 mr-5">
        <div className="text-lg font-bold text-black flex justify-between ">
          <span>Gem Rey Ranola</span>
          <span>2017</span>
        </div>

        <div className="text-gray-700 text-md font-semibold">
          A10000 <span>Employed</span>
        </div>
        <hr className="border-gray-400" />
        <div className="text-sm text-gray-700 flex justify-between">
          <span>gemreyranola@gmail.com</span>
          <button className="px-4 py-1 bg-blue-500 rounded-md text-white">Edit</button>
        </div>
        <div className="text-sm text-gray-700 flex justify-between">
          <span>09**********</span>
          <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white">Delete</button>
        </div>
      </div>
    </>
  );
};

export default TracerAlumniTable;
