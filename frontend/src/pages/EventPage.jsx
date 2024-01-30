import React from "react";
import image from "../images/news-1.png";
import image2 from "../images/me.png";

const NewsPage = () => {
  return (
    <>
      <section className="py-10 px-3 lg:py-20 lg:px-10">
        <h2 className="text-black font-bold text-3xl mx-8">Latest Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="m-8 flex h-150 flex-col gap-5 bg-bodydark1 rounded-md">
            <img
              src={image}
              alt=""
              className="object-cover w-full h-2/3 rounded-md"
            />

            <div className="p-3">
              <h5 className="text-lg text-black font-semibold">
                DLLU Sports Fest 2024
              </h5>
              <p className="line-clamp-2 mt-4">
                Gear up for an exciting day of sportsmanship at the DLLU Sports
                Fest 2024. Alumni, faculty, and students are invited to
                participate in various sports activities and enjoy a day of
                friendly competition and camaraderie.
              </p>
              <p className="text-right mt-10">-DLLU Sports Committee</p>
            </div>
          </div>
          <div className="m-8 flex h-150 flex-col gap-5 bg-bodydark1 rounded-md">
            <img
              src={image2}
              alt=""
              className="object-cover w-full h-2/3 rounded-md"
            />

            <div className="p-3">
              <h5 className="text-lg text-black font-semibold">
                DLLU Sports Fest 2024
              </h5>
              <p className="line-clamp-2 mt-4">
                Gear up for an exciting day of sportsmanship at the DLLU Sports
                Fest 2024. Alumni, faculty, and students are invited to
                participate in various sports activities and enjoy a day of
                friendly competition and camaraderie.
              </p>
              <p className="text-right mt-10">-DLLU Sports Committee</p>
            </div>
          </div>
          <div className="m-8 flex h-150 flex-col gap-5 bg-bodydark1 rounded-md">
            <img
              src={image2}
              alt=""
              className="object-cover w-full h-2/3 rounded-md"
            />

            <div className="p-3">
              <h5 className="text-lg text-black font-semibold">
                DLLU Sports Fest 2024
              </h5>
              <p className="line-clamp-2 mt-4">
                Gear up for an exciting day of sportsmanship at the DLLU Sports
                Fest 2024. Alumni, faculty, and students are invited to
                participate in various sports activities and enjoy a day of
                friendly competition and camaraderie.
              </p>
              <p className="text-right mt-10">-DLLU Sports Committee</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
