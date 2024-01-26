import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "@/apiConfig";
import Loader from "../../common/Loader";

import { formatDate, formatTimestamp } from "../../utils/formatting";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/news-list/`);
        console.log(response.data.length);
        console.log(response.data);
        if (response.data.length > 4) {
          const news_item = response.data.slice(4);
          setNews(news_item);
          console.log(news_item);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
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
      {news &&
        news.map((news) => (
          <Link className="block lg:flex mx-7 lg:px-20 py-5 border-t hover:bg-meta-9 opacity-100 transition duration-300 ease-in-out hover:opacity-80">
            <div className="w-full lg:w-[30%]">
              <img
                src={`${baseURL}/${news.cover_image}`}
                alt={news.header}
                className="object-fill h-full"
              />
            </div>
            <div className="flex-1 lg:py-0 py-4 lg:px-5 px-0">
              <h3 className="text-gray-800 font-semibold text-xl">
                {news.header}
              </h3>
              <p>{formatDate(news.posted_at)}</p>
              <p className="pt-8 text-black-2 line-clamp-5">
                {news.description}
              </p>
            </div>
          </Link>
        ))}
    </>
  );
};

export default NewsList;
