import React, { useState } from "react";
import Block_Slab_1 from "../../images/Block_Slab_1.png";
import Cylinder_Long_Standing from "../../images/Cylinder_Long_Standing.png";

function FAQ() {
  const [selectedAccordion, setSelectedAccordion] = useState("1");

  const handleAccordionChange = (accordionId) => {
    setSelectedAccordion(accordionId);
  };

  return (
    <div className="flex flex-col items-center mt-16 md:mt-24 justify-center relative">
      <img
        src={Cylinder_Long_Standing}
        alt="Cylinder_Long_Standing"
        className="absolute rotate-[12.05deg] w-80 -left-48 lg:-left-32 top-10 pointer-events-none select-none"
      />
      <div className="w-[80%]">
        <h1 className="text-xl lg:text-3xl font-semibold">
          Frequently Asked Questions{" "}
          <span className="hidden md:inline">(FAQ)</span>
        </h1>
        <p className="pt-3 mb-7">
          Read what our successful alumni and educators have to say in our
          platform.
        </p>
      </div>

      <div className="join join-vertical w-[80%]">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
            checked={selectedAccordion === "1"}
            onChange={() => handleAccordionChange("1")}
          />
          <div className="collapse-title text-xl font-medium">
            How can I get started?
          </div>
          <div className="collapse-content">
            <p>
              Fill in your personal information, including your name, email
              address, and create a secure password. Once logged in, take a few
              moments to explore the dashboard or main interface. This is where
              you'll access all the features and settings.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
            checked={selectedAccordion === "2"}
            onChange={() => handleAccordionChange("2")}
          />
          <div className="collapse-title text-xl font-medium">
            Is DAOIS only for alumni, or can current students also use it?
          </div>
          <div className="collapse-content">
            <p>
              Fill in your personal information, including your name, email
              address, and create a secure password. Once logged in, take a few
              moments to explore the dashboard or main interface. This is where
              you'll access all the features and settings.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
            checked={selectedAccordion === "3"}
            onChange={() => handleAccordionChange("3")}
          />
          <div className="collapse-title text-xl font-medium">
            What is the Tracer Study feature, and how does it help curriculum
            analysis?
          </div>
          <div className="collapse-content">
            <p>
              Fill in your personal information, including your name, email
              address, and create a secure password. Once logged in, take a few
              moments to explore the dashboard or main interface. This is where
              you'll access all the features and settings.
            </p>
          </div>
        </div>
      </div>

      <div className=" flex flex-row w-[80%] justify-around items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mt-12 md:mt-0 py-2 md:py-5">
            Still have questions?
          </h1>
          <p>Contact us for more information.</p>
          <button className="btn btn-warning btn-sm text-white self-center my-6">
            Click Here!
          </button>
        </div>
        <div className="w-[90%] md:w-[30%]  rotate-[164.55deg] pointer-events-none select-none">
          <img src={Block_Slab_1} alt="Slab"/>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
