import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddJobHeader from "../../components/admin/AddJobHeader";
import TableJobList from "../../components/tables/TableJobList";

const AddJob = () => {
  return (
    <>
      <Breadcrumb pageName="Add Job" />
      <AddJobHeader />
      <TableJobList />
    </>
  );
};

export default AddJob;
