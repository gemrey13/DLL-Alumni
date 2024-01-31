import React, { useEffect, useState } from "react";
import news_1 from "../../images/news-1.png";
import news_2 from "../../images/news-2.png";
import news_3 from "../../images/news-3.png";
import news_4 from "../../images/news-4.png";
import block_cage_1 from "../../images/Block_Cage_1.png";
import axios from "axios";
import baseURL from "@/apiConfig";
import { formatDate, formatTimestamp } from "../../utils/formatting";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

function News() {
  const [news, setNews] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/news-list/`);
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSystemUpdates = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/system-updates-list/`);
      setUpdates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchSystemUpdates();
  }, []);

  const newsToDisplay = news.slice(1, 4);

  if (loading) {
    return (
      <section className="h-screen">
        <Loader />
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <>
        <section className="flex items-center justify-center h-screen w-full">
          <h1 className="text-3xl">Theres no news posted.</h1>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="hidden lg:flex px-20 justify-between text-2xl mt-20 mb-8">
        <h2 className="w-[83%]">Latest News</h2>
        <h2 className="w-[18%]">System Updates</h2>
      </div>
      <section className="block lg:flex px-7 lg:px-20 mt-10 lg:mt-0">
        <Link
          to={`/news/${news[0].header}`}
          className="block lg:flex bg-gray-950 justify-between lg:mr-11 opacity-100 transition duration-300 ease-in-out hover:opacity-90">
          <div className="w-[100%] lg:w-[30%] p-8">
            <h2 className="text-white text-2xl">{news[0].header}</h2>
            <p className="text-red-600">{formatDate(news[0].posted_at)}</p>
            <p className="text-gray-400 text-xl">{news[0].summary}</p>
          </div>
          <div className="flex-1">
            <img
              src={`${baseURL}/${news[0].cover_image}`}
              alt={news[0].header}
              className="object-fill h-full"
            />
          </div>
        </Link>
        <aside className="mt-8 lg:mt-0">
          {updates.map((update, index) => (
            <div key={update.id} className="flex mb-7 ">
              <div className="text-3xl underline mr-4">{index + 1}</div>
              <div>
                <h2 className="text-red-700 font-bold">{update.title}</h2>
                <p className="line-clamp-4">{update.description}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>

      <section className="block md:flex px-7 gap-4 md:px-20 mt-14 justify-evenly relative overflow-hidden">
        {newsToDisplay.map((news, index) => (
          <Link
            to={`/news/${news.header}`}
            key={index}
            className="w-4/6 flex-col mb-6 lg:mb-0 opacity-100 transition duration-300 ease-in-out hover:opacity-80">
            <img
              src={`${baseURL}/${news.cover_image}`}
              alt={news.header}
              className="object-cover w-[90%] h-[70%] max-w-94 max-h-94"
            />
            <div className="w-[100%] md:w-[70%]">
              <p className="text-gray-800 font-semibold mt-2">{news.header}</p>
              <p>
                {formatDate(news.posted_at)} • {formatTimestamp(news.posted_at)}
              </p>
            </div>
          </Link>
        ))}
        <img
          className="w-96 h-80 absolute -z-10 -right-36 -bottom-10"
          src={block_cage_1}
        />
      </section>
    </>
  );
}

export default News;
