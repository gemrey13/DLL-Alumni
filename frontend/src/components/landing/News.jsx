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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/news-list/`);
        console.log(response);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  const newsToDisplay = news.slice(1, 4);

  if (loading) {
    return (
      <section className="h-screen">
        <Loader />
      </section>
    );
  }

  return (
    <>
      <div className="hidden lg:flex px-20 justify-between text-2xl mt-20 mb-8">
        <h2 className="w-[83%]">Latest News</h2>
        <h2 className="w-[18%]">System Updates</h2>
      </div>
      <section className="block lg:flex px-7 lg:px-20 mt-10 lg:mt-0">
        <Link className="block lg:flex bg-gray-950 justify-between lg:mr-11 opacity-100 transition duration-300 ease-in-out hover:opacity-90">
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
        <aside>
          <div className="flex mb-7 mt-8 lg:mt-0">
            <div className="text-3xl underline mr-4">1</div>
            <div>
              <h2 className="text-red-700 font-bold">
                Enhancing Your Experience
              </h2>
              <p>
                Our latest system update includes performance enhancements and
                bug fixes to ensure a smoother and more reliable experience for
                all users
              </p>
            </div>
          </div>
          <div className="flex mb-7">
            <div className="text-3xl underline mr-4">2</div>
            <div>
              <h2 className="text-red-700 font-bold">The Latest Update</h2>
              <p>
                Our new system update optimizes efficiency and introduces
                exciting features for a more productive experience.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="text-3xl underline mr-4">3</div>
            <div>
              <h2 className="text-red-700 font-bold">What's New?</h2>
              <p>
                Explore our latest feature additions that enhance your
                experience and provide even more capabilities.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="block md:flex px-7 md:px-20 mt-14 justify-evenly relative overflow-hidden">
        {newsToDisplay.map((news, index) => (
          <Link
            key={index}
            className="flex-col mb-6 lg:mb-0 opacity-100 transition duration-300 ease-in-out hover:opacity-80">
            <div className="w-[100%] md:w-[70%]">
              <img src={`${baseURL}/${news.cover_image}`} alt="News 2"></img>
            </div>
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
