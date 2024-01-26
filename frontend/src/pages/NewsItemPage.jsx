import React from "react";
import news_4 from "../images/news-4.png";
import block_cage_1 from "../images/Block_Cage_1.png";

import {
  formatDate,
  formatTimestamp,
  descriptionFormatter,
} from "../utils/formatting";

const NewsItemPage = () => {
  return (
    <>
      <section className="w-8/12 mx-auto py-16 relative">
        <h1 className="text-3xl text-black font-bold">
          Debating for a Brighter Tomorrow: Exploring Contemporary Issues
        </h1>
        <p>Posted at Jan 26 2024 12:56 PM</p>

        <div className="w-8/12 bg-bodydark1 my-5 mx-auto">
          <img src={news_4} alt="asd" className="object-fill h-full w-full" />
          <p className="p-3">
            As part of our commitment to empowering our students and recent
            graduates, this program connects them with experienced alumni
            mentors in their chosen fields.
          </p>
        </div>

        <section>
          <p className="text-black-2">
            As part of our commitment to empowering our students and recent
            graduates, this program connects them with experienced alumni
            mentors in their chosen fields. <br /> <br />
            As part of our commitment to empowering our students and recent
            graduates, this program connects them with experienced alumni
            mentors in their chosen fields.
            <br />
            <br />
            As part of our commitment to empowering our students and recent
            graduates, this program connects them with experienced alumni
            mentors in their chosen fields.As part of our commitment to
            empowering our students and recent graduates, this program connects
            them with experienced alumni mentors in their chosen fields.
          </p>
        </section>
        <img
          className="w-96 h-80 absolute -z-10 -left-[28rem] top-22"
          src={block_cage_1}
        />
      </section>
    </>
  );
};

export default NewsItemPage;
