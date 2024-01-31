import React, { useEffect, useState } from "react";
import image from "../images/news-1.png";
import image2 from "../images/me.png";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import EventCard from "../components/shared/EventCard";

const EventPage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/event-list/`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      toast.error("Something went wrong....");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
