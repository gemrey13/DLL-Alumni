import React from 'react';

const NewsUpdate = () => {
  return (
    <>
      <div className='px-[4em] mb-[6em]'>
        <h1 className='text-center text-xl font-semibold pb-10'>News and Updates</h1>
        <div className='flex mb-10 justify-center'>
          <div className='bg-green-500 w-[450px] h-[350px]'></div>
          <div className='bg-green-700 w-[500px] scale-110 h-[350px]'></div>
          <div className='bg-green-500 w-[450px] h-[350px]'></div>
        </div>
        <div className='text-center leading-6 mt-16'>
          <h3 className='font-semibold text-lg'>Celebrating a Milestone - 100,000 Strong Alumni Network!</h3>
          <h6 className='text-sm'>August 21, 2023</h6>
          <p className=''>
            We are delighted to announce that DAOIS has reached <br/>a significant milestone - our alumni 
            network has surpassed 100,000 <br/>members! We extend our heartfelt gratitude to all our alumni
            for being <br/>an integral part of this thriving community.
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsUpdate;
