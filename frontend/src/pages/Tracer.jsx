import React, { useState } from 'react';
import { Navbar, Breadcrumb, Footer, TracerAlumniTable, AlumniForm } from '../index';

const Tracer = () => {
  const [isModal, setIsModal] = useState(false);

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
          <div className="relative z-10 transition-all duration-1000 ease-in-out inset-0 bg-gray-500 bg-opacity-75" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                          Create Alumni
                        </h3>
                        <div className="mt-2">
                          <AlumniForm />
                          <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={() => setIsModal(false)} type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto">
                      Submit
                    </button>
                    <button
                      onClick={() => setIsModal(false)}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <TracerAlumniTable />
      </div>

      <Footer />
    </>
  );
};

export default Tracer;
