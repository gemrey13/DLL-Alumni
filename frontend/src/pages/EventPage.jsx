import React, { useEffect, useState } from "react";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import EventCard from "../components/shared/EventCard";
import Loader from "../common/Loader";

const EventPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/event-list/`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong....");
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

  if (data.length === 0) {
    return (
      <>
        <section className="flex items-center justify-center h-screen w-full">
          <h1 className="text-3xl">Theres no events posted.</h1>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="py-10 px-3 lg:py-20 lg:px-10">
        <h2 className="text-black font-bold text-3xl mx-8">Latest Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <EventCard eventList={data} />
        </div>
      </section>
    </>
  );
};

export default EventPage;
