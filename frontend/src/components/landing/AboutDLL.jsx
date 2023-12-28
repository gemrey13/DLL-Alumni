import React from "react";
import ITParadigm from "../../images/ITParadigm.png";
import Action1 from "../../images/Action1.png";
import Togglestarborder from "../../images/Togglestarborder.png";

function AboutDLL() {
  return (
    <section className="mt-16 lg:mt-24 relative overflow-hidden pb-8">
      <img className="w-80 h-60 absolute -left-32 top-24" src={Action1} />
      <img
        className="w-80 h-60 absolute -right-20 -bottom-12 -rotate-45"
        src={Togglestarborder}
      />

      <div className="flex justify-center flex-col items-center">
        <hr className="border-gray-800 border-t-2 w-[70%] justify-self-center my-2" />
        <h3 className="text-base md:text-2xl lg:text-3xl font-bold">
          About Dalubhasaang Lungsod ng Lucena{" "}
          <span className="hidden md:inline">(DLL)</span>
        </h3>
      </div>

      <div className="hero mt-8 md:mt-16 lg:mt-20">
        <div className="hero-content flex-col lg:flex-row-reverse items-center lg:items-start">
          <div className="flex flex-col">
            <img
              src={ITParadigm}
              className="w-72 md:w-auto max-w-md rounded-md shadow-2xl"
            />
            <button className="btn btn-warning btn-sm text-white self-center my-6">
              Read More
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base lg:text-2xl font-bold underline self-center text-gray-700">
              Vibrant Community and Our Impact
            </h1>
            <p className="py-6 max-w-lg">
              As part of the DLL family, students find themselves embraced by a
              vibrant and supportive community. We encourage student engagement
              in various clubs, organizations, and events, allowing them to
              explore their interests beyond the classroom and develop valuable
              leadership and interpersonal skills.
            </p>
            <p className="max-w-lg">
              Over the years, DLL has produced graduates who have excelled in
              various fields and made significant contributions to t heir
              communities and the nation. We take pride in the achievements of
              our alumni and their role in driving progress and positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDLL;
