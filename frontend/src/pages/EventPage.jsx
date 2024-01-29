import React from "react";
import News from "../components/landing/News";
import NewsList from "../components/landing/NewsList";

const NewsPage = () => {
  return (
    <>
      <section className="pb-20">
        <News />
        <div className="lg:mt-22 mt-10">
          <NewsList />
        </div>
      </section>
    </>
  );
};

export default NewsPage;
