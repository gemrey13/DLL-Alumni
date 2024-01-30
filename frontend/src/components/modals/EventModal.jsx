import React, { forwardRef } from "react";
import baseURL from "@/apiConfig";
import {
  formatDate,
  formatTimestamp,
  convertToTitleCase,
} from "../../utils/formatting";

const EventModal = forwardRef(({ eventData, onClose }, ref) => {
  console.log(eventData);
  return (
    <dialog ref={ref} className="modal" id="jobModal" open>
      <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
        <h3 className="font-bold text-2xl dark:text-white text-black">
          {convertToTitleCase(eventData.title)}
        </h3>
        <span className="text-sm mr-2">{formatDate(eventData.created_at)}</span>
        <span className="text-sm">{formatTimestamp(eventData.created_at)}</span>

        <p className="py-4 dark:text-white text-black">
          Organizer: {eventData.organizer}
        </p>
        <hr />

        <section className="sm:flex items-center gap-5">
          <img
            src={`${baseURL}${eventData.poster_image}`}
            alt={eventData.title}
            className="object-scale-down h-67 lg:h-94 w-100 rounded-md"
          />
          <div className="flex flex-col items-start gap-6">
            <div>
              <p className="text-black-2 dark:text-white">
                Start date: {formatDate(eventData.start_date)}{" "}
                {formatTimestamp(eventData.start_date)}
              </p>
              <p className="text-black-2 dark:text-white">
                End date: {formatDate(eventData.end_date)}{" "}
                {formatTimestamp(eventData.end_date)}
              </p>
            </div>
            <p className="text-black-2 dark:text-white">
              Location: {eventData.location}
            </p>
            <p className="text-black-2 dark:text-white">
              {eventData.description}
            </p>
          </div>
        </section>

        <hr className="py-4" />
        {eventData.num_participants !== 0 && (
          <>
            <h3 className="dark:text-white ">Participants:</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="dark:text-white">
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.participants_names.map((participant, index) => (
                    <tr
                      key={index + 1}
                      className="hover:bg-bodydark dark:hover:bg-boxdark-2">
                      <th>{index + 1}</th>
                      <td>
                        {participant.first_name} {participant.last_name}
                      </td>
                      <td>{participant.email}</td>
                      <td>{participant.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});
export default EventModal;
