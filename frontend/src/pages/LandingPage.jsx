import React, { useEffect, useState } from "react";
import Hero from "../components/landing/Hero";
import News from "../components/landing/News";
import Carousel from "../components/landing/Carousel";
import AboutDLL from "../components/landing/AboutDLL";
import Location from "../components/landing/Location";
import FAQ from "../components/landing/FAQ";
import blob_hero from "../images/blob_hero.png";

function LandingPage() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    const handleContentLoad = () => {
      // This function will be called when the DOM content is fully loaded
      setIsContentLoaded(true);
    };

    document.addEventListener("DOMContentLoaded", handleContentLoad);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("DOMContentLoaded", handleContentLoad);
    };
  }, []);

  return !isContentLoaded ? (
    <>
      <div className="w-full h-screen pt-8 md:px-16 sm:px-0 z-[-2] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
        <img
          src={blob_hero}
          alt="Blob 1"
          className="absolute -left-72 md:-left-80 hidden md:block pointer-events-none select-none"
        />
        <Hero />
      </div>
      <News />
      <Carousel />
      <AboutDLL />
      <Location />
      <FAQ />
    </>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default LandingPage;
