import React, { useState, useEffect } from 'react';

const Card = (props) => {
  const { color } = props;
  return (
    <>
      <div className={`${color} w-full space-y-2 p-4 rounded-lg shadow hover:-translate-y-1 transition-transform duration-200 mr-5`}>
        <div className="text-lg font-bold text-black flex justify-between ">
          <span>Gem Rey Ranola</span>
          <span>2017</span>
        </div>

        <div className="text-gray-700 text-md font-semibold">
          A10000 <span>BSIT</span>
        </div>
        <hr className="border-gray-400" />
        <div className="text-sm text-gray-700 flex justify-between">
          <span>gemreyranola@gmail.com</span>
          <button className="px-4 py-1 bg-blue-500 rounded-md text-white">See</button>
        </div>
        <div className="text-sm text-gray-700 flex justify-between">
          <span>09**********</span>
          <button className="ml-2 py-1 bg-orange-500 px-3 rounded-md text-white">Delete</button>
        </div>
      </div>
    </>
  );
};

export default Card;
