import React, { useContext } from "react";
import sir_rovie from "../../images/sir_rovie.png";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Hero() {
  let { user } = useContext(AuthContext);

  return (
    <div className="hero pt-8 px-5">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <div className="relative hidden lg:block lg:ml-32">
          <img
            src={sir_rovie}
            className="max-w-sm rounded-lg shadow-2xl w-72 pointer-events-none select-none"
          />
          <div className="w-96 h-48 bg-yellow-400 absolute z-[-100] -bottom-0 -left-36" />
          <div className="w-80 h-96 bg-yellow-400 absolute z-[-100] top-36 left-16" />
        </div>
        <div>
          <h1 className="text-yellow-500 text-5xl font-bold leading-10 pointer-events-none select-none">
            Welcome to Alumni Web Portal
          </h1>
          <h1 className="text-white text-5xl font-bold leading-10 pointer-events-none select-none">
            Empowering Education, <br />
            Connecting Alumni!
          </h1>
          <p className="py-6 text-gray-400 pointer-events-none select-none">
            Your All-in-One Online Portal and Alumni Office Information <br />
            System with Tracer Study for Curriculum Analysis.
          </p>
          {user ? (
            <Link to="/u/jobs" className="btn btn-warning text-white">
              Find Work
            </Link>
          ) : (
            <button className="btn btn-warning text-white">Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
