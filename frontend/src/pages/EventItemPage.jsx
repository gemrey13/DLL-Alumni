import React from "react";
import { useParams } from "react-router-dom";

const EventItemPage = () => {
  const { title } = useParams();

  return (
    <>
      <section className="py-10 px-3 lg:py-20 lg:px-10">
        <h2 className="text-black font-bold text-3xl mx-8">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2"></div>
      </section>
    </>
  );
};

export default EventItemPage;
