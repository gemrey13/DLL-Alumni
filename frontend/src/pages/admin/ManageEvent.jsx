import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddNewsHeader from "../../components/admin/AddNewsHeader";
import TableNewsList from "../../components/tables/TableNewsList";

const ManageEvent = () => {
  return (
    <>
      <Breadcrumb pageName="Events" />
      <AddNewsHeader />
      <TableNewsList />
    </>
  );
};

export default ManageEvent;
