import React, { useState, useEffect } from 'react';
import { Navbar, useAxios } from '../index';

const Sample = () => {
  

  return (
    <>
      <div className='text-black dark:text-white ml-4 sm:mr-4 mt-20 sm:ml-24 sm:mt-24'>
        <Navbar />
        


            <h1 class="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>

    
      <div class="p-4 md:w-1/3">
        <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div class="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center"></div>
          <div class="p-6">
            <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
            <h1 class="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
            <p class="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
            <p class="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
            <p class="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
            <div class="flex items-center flex-wrap ">
              <a class="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0">
                
              </a>
              <span class="bg-indigo-300 w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1">
                
              </span>
              
            </div>
          </div>
        </div>
      </div>



      </div>
    </>
  );
};

export default Sample;
