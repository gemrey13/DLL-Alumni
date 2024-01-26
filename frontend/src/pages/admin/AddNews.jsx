import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddJobHeader from "../../components/admin/AddJobHeader";
import AddNewsHeader from "../../components/admin/AddNewsHeader";

const AddNews = () => {
  return (
    <>
      <Breadcrumb pageName="News " />
      <AddNewsHeader />
    </>
  );
};

export default AddNews;
