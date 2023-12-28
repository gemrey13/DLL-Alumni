import React from "react";
import sir_rovie from "../../images/sir_rovie.png";

function Hero() {
  return (
    <div className="hero mt-12 lg:mt-32 px-5">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="relative hidden lg:block lg:ml-32">
          <img
            src={sir_rovie}
            className="max-w-sm rounded-lg shadow-2xl w-72"
          />
          <div className="w-96 h-48 bg-yellow-400 absolute z-[-100] -bottom-0 -left-36" />
          <div className="w-80 h-96 bg-yellow-400 absolute z-[-100] top-36 left-16" />
        </div>
        <div>
          <h1 className="text-yellow-500 text-5xl font-bold leading-10">
            Welcome to Alumni Web Portal
          </h1>
          <h1 className="text-white text-5xl font-bold leading-10">
            Empowering Education, <br />
            Connecting Alumni!
          </h1>
          <p className="py-6 text-gray-400">
            Your All-in-One Online Portal and Alumni Office Information <br />
            System with Tracer Study for Curriculum Analysis.
          </p>
          <button className="btn btn-warning text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
