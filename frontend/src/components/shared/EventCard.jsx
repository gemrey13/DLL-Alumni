import React from "react";
import baseURL from "@/apiConfig";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";

const EventCard = ({ eventList }) => {
  return (
    <>
      {eventList &&
        eventList.map((eventItem) => (
          <Link
            to={`/event/${eventItem.title}`}
            key={eventItem.id}
            className="m-8 flex h-150 flex-col gap-5 bg-bodydark1 rounded-md opacity-100 transition duration-300 ease-in-out hover:opacity-70">
            <img
              src={`${baseURL}${eventItem.poster_image}`}
              alt={eventItem.title}
              className="object-cover w-full h-2/3 rounded-t-md"
            />

            <div className="p-3 h-1/3">
              <h5 className="text-lg text-black font-semibold">
                {eventItem.title}
              </h5>
              <p className="flex items-center justify-start">
                <HiOutlineLocationMarker size={15} />
                <span className="line-clamp-1 text-sm">
                  {eventItem.location}
                </span>
              </p>
              <p className="line-clamp-2 mt-4 text-base text-black">
                {eventItem.description}
              </p>
              <p className="text-right mt-5 lg:mt-10">-{eventItem.organizer}</p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default EventCard;
