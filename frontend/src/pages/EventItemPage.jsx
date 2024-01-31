import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseURL from "@/apiConfig";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../common/Loader";
import AuthContext from "../context/AuthContext";
import { HiOutlineLocationMarker, HiOutlineChevronLeft } from "react-icons/hi";
import {
  formatDate,
  formatTimestamp,
  isNewJob,
  descriptionFormatter,
} from "../utils/formatting";
import blob_cross from "../images/blob-cross.png";

const EventItemPage = () => {
  const { title } = useParams();
  let { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isParticipate, setIsParticipate] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/event-participate/`, {
        params: { title: title, user_id: user.user_id },
      });
      setData(response.data);
      setIsParticipate(response.data.is_participate);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong.....");
    }
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/event-list/`, {
        params: { title: title },
      });
      setData(response.data[0]);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong.....");
    }
  };

  const participateEvent = async (eventID) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/event-participate/?event_id=${eventID}&user_id=${user.user_id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsParticipate(!isParticipate);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  const unparticipateEvent = async (eventID) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/event-participate/?event_id=${eventID}&user_id=${user.user_id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsParticipate(!isParticipate);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      fetchEventDetails();
    }
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
      <section className="py-10 px-3 lg:py-20 lg:px-15 relative overflow-hidden">
        <div className="flex justify-between gap-2">
          <h2 className="text-black font-bold text-lg lg:text-3xl">
            {title}{" "}
            {isNewJob(data.created_at) && (
              <span className="badge badge-secondary">NEW</span>
            )}
          </h2>

          <Link
            to="/event"
            className="flex flex-nowrap items-center hover:text-primary relative after:bg-primary after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-[110%] after:transition-all after:duration-300">
            <HiOutlineChevronLeft />
            Go back
          </Link>
        </div>

        <p className="flex items-center justify-start border-b pb-2">
          <HiOutlineLocationMarker size={15} />
          <span className="line-clamp-1 text-sm">{data.location}</span>
        </p>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10 items-center">
          <img
            src={`${baseURL}/${data.poster_image}`}
            alt="asd"
            className="object-contain h-75 w-full "
          />

          <div className="flex flex-col gap-6 justify-between">
            <section className="text-black ">
              <p>
                Start: {formatDate(data.start_date)} •{" "}
                {formatTimestamp(data.start_date)}
              </p>
              <p>
                End: {formatDate(data.end_date)} •{" "}
                {formatTimestamp(data.end_date)}
              </p>
              <p>Participants: {data.num_participants}</p>
            </section>

            <div>
              <p className="text-black">
                {descriptionFormatter(data.description)}
              </p>
              <p className="text-right mt-5 lg:mt-7">-{data.organizer}</p>
            </div>
            {user && (
              <>
                {isParticipate ? (
                  <div className="self-end mt-4 w-full">
                    <button
                      onClick={() => unparticipateEvent(data.id)}
                      className="btn btn-md btn-outline rounded-lg mb-3 w-full">
                      Unparticipate
                    </button>
                  </div>
                ) : (
                  <div className="self-end mt-4 w-full">
                    <button
                      onClick={() => participateEvent(data.id)}
                      className="btn btn-md btn-primary rounded-lg mb-3 w-full">
                      Participate
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <img
          className="w-96 h-80 absolute -z-10 -right-36 -bottom-10"
          src={blob_cross}
        />
      </section>
    </>
  );
};

export default EventItemPage;
