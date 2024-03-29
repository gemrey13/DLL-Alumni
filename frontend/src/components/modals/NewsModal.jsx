import React, { forwardRef } from "react";
import { convertToTitleCase } from "../../utils/formatting";
import baseURL from "@/apiConfig";
import { formatDate, formatTimestamp } from "../../utils/formatting";

const NewsModal = forwardRef(({ newsData, onClose }, ref) => {
  return (
    <dialog ref={ref} className="modal" id="jobModal" open>
      <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
        <h3 className="font-bold text-lg dark:text-white text-black">
          {convertToTitleCase(newsData.header)}
        </h3>
        <span className="text-sm mr-2">{formatDate(newsData.posted_at)}</span>
        <span className="text-sm">{formatTimestamp(newsData.posted_at)}</span>

        <p className="py-4">{newsData.summary}</p>
        <hr />
        <section className="sm:flex items-center gap-5">
          <img
            src={`${baseURL}${newsData.cover_image}`}
            alt={newsData.header}
            className="object-scale-down h-67 lg:h-94 w-100 rounded-md"
          />
          <p className="text-black-2 dark:text-white">{newsData.description}</p>
        </section>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});
export default NewsModal;
