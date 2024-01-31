import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseURL from "@/apiConfig";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../common/Loader";
import { HiOutlineLocationMarker, HiOutlineChevronLeft } from "react-icons/hi";
import { formatDate, formatTimestamp, isNewJob } from "../utils/formatting";

const EventItemPage = () => {
  const { title } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/event-list/?title=${title}`
      );
      setData(response.data[0]);
      console.log(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.....");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="h-screen">
        <Loader />
      </section>
    );
  }
  return (
    <>
      <section className="py-10 px-3 lg:py-20 lg:px-10 mx-8">
        <div className="flex justify-between">
          <h2 className="text-black font-bold text-3xl">
            {title}{" "}
            {isNewJob(data.created_at) && (
              <span className="badge badge-secondary">NEW</span>
            )}
          </h2>

          <Link
            to="/event"
            className="flex items-center hover:text-primary relative after:bg-primary after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-[110%] after:transition-all after:duration-300">
            <HiOutlineChevronLeft />
            Go back
          </Link>
        </div>

        <p className="flex items-center justify-start">
          <HiOutlineLocationMarker size={15} />
          <span className="line-clamp-1 text-sm">{data.location}</span>
        </p>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10 items-center">
          <img
            src={`${baseURL}/${data.poster_image}`}
            alt="asd"
            className="object-contain h-75 w-[80%]"
          />

          <div>
            <p>{data.description}</p>
            <p className="text-right mt-5 lg:mt-7">-{data.organizer}</p>
          </div>
        </section>
        <section>
          <p>
            Start: {formatDate(data.start_date)}{" "}
            {formatTimestamp(data.start_date)}
          </p>
          <p>
            End: {formatDate(data.end_date)} {formatTimestamp(data.end_date)}
          </p>
          <p>Participants: {data.num_participants}</p>
        </section>
      </section>
    </>
  );
};

export default EventItemPage;
