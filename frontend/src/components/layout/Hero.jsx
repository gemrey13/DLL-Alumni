import React from 'react';

const Hero = () => {
  return (
    <>
      <div className='flex px-[4em] py-[4em] justify-between items-center'>
        <div>
          <h1 className='text-3xl text-black font-bold'>Welcome to Alumni Web Portal - <br/>Empowering Education, Connecting<br/> Alumni!</h1>
          <p className='pt-4'>Your All-in-One Online Portal and Alumni Office Information <br/>System with Tracer Study for Curriculum Analysis</p>
          <button className=''>Get Started</button>
        </div>
        <div>
          <div className='w-[600px] h-[400px] bg-green-700'>
            <div className='w-[600px] h-[400px] bg-green-600 relative -left-12 -bottom-12'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
