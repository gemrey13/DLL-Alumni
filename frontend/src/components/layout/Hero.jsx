import React from 'react';

const Hero = () => {
  return (
    <>
      <div className='flex px-[4em] pt-[4em] pb-[20em] items-center'>
        <div className='w-1/2'>
          <h1 className='text-4xl text-black font-bold font-mono'>Welcome to Alumni Web Portal - <br/>Empowering Education, Connecting<br/> Alumni!</h1>
          <p className='pt-4 leading-normal'>Your All-in-One Online Portal and Alumni Office Information <br/>System with Tracer Study for Curriculum Analysis</p>
          <button className='relative bottom-0 mt-[3em] text-black font-bold text-xl'>Get Started</button>
        </div>
        <div className='w-1/2 flex justify-center'>
          <div className='w-[600px] h-[400px] bg-green-700'>
            <div className='w-[600px] h-[400px] bg-green-600 relative -left-12 -bottom-12'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
