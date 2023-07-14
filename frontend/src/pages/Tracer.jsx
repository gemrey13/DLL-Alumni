import React, { useState } from 'react';
import { Navbar, Breadcrumb, Footer, TracerAlumniTable, AlumniForm } from '../index';

const Tracer = () => {
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24">
        <Breadcrumb url="Tracer" />

        <div>
          <div className="flex mt-3 flex-row-reverse sm:flex-row">
            <h1 className="font-black text-2xl flex-1 hidden sm:block">Alumni Tracer</h1>
            <form>
              <span className="flex">
                <input type="text" className="sm:focus:w-72 w-52 p-2 rounded-md bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-white transition-width duration-500" placeholder="Search Alumni . . . ." />
                <button className="relative top-auto right-10">
                  <i className="bx bx-search text-blue-600 text-2xl "></i>
                </button>
              </span>
            </form>
            <span onClick={() => setIsModal(true)} className="ml-2 mr-4 sm:ml-3 sm:mr-2 transition-transform duration-200 hover:scale-110">
              <button>
                <i className="bx bxs-plus-square text-blue-600 hover:text-blue-800 text-4xl"></i>
              </button>
            </span>
            <span className="mr-2 sm:mr-6 transition-transform duration-200 hover:scale-110">
              <button>
                <i className="bx bx-filter text-black dark:text-white hover:font-black text-4xl"></i>
              </button>
            </span>
          </div>
        </div>

        {isModal && (
          <AlumniForm closeModal={closeModal} />
        )}

        <TracerAlumniTable />
      </div>

      <Footer />
    </>
  );
};

export default Tracer;
