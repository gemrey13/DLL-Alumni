import news_4 from "../images/news-4.png";
import block_cage_1 from "../images/Block_Cage_1.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "@/apiConfig";
import Loader from "../common/Loader";
import {
  formatDate,
  formatTimestamp,
  descriptionFormatter,
} from "../utils/formatting";
import toast from "react-hot-toast";

const NewsItemPage = () => {
  const { header } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/news-details/?header=${header}`
        );
        setDetails(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong!");
        console.log(error);
      }
    };
    fetchNewsDetails();
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
      <section className="w-8/12 mx-auto py-16 relative">
        <h1 className="text-3xl text-black font-bold">{details.header}</h1>
        <p>
          Posted at {formatDate(details.posted_at)}{" "}
          {formatTimestamp(details.posted_at)}
        </p>

        <div className="w-8/12 bg-bodydark1 my-5 mx-auto">
          <img
            src={`${baseURL}/${details.cover_image}`}
            alt="asd"
            className="object-fill h-full w-full"
          />
          <p className="p-3">{details.summary}</p>
        </div>

        <section>
          <p className="text-black-2">
            {details && descriptionFormatter(details.description)}
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
