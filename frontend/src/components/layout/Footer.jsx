import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="text-black dark:text-white ml-4 sm:mr-0 mt-20 sm:ml-20 sm:mt-24">
        <div className="w-full border-t-2 px-8 py-6 lg:flex justify-between items-center bg-white dark:bg-slate-600">
          <p className="mb-2 lg:mb-0">© Copyright 2023</p>

          <div className="flex">
            <a href="#" className="mr-6 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="mr-6 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              About Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
