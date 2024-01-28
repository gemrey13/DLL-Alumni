import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddNewsHeader from "../../components/admin/AddNewsHeader";
import TableNewsList from "../../components/tables/TableNewsList";

const AddNews = () => {
  return (
    <>
      <Breadcrumb pageName="News " />
      <AddNewsHeader />
      <TableNewsList />
    </>
  );
};

export default AddNews;
