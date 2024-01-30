import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddEventHeader from "../../components/admin/AddEventHeader";
import TableEventList from "../../components/tables/TableEventList";

const ManageEvent = () => {
  return (
    <>
      <Breadcrumb pageName="Events" />
      <AddEventHeader />
      <TableEventList />
    </>
  );
};

export default ManageEvent;
