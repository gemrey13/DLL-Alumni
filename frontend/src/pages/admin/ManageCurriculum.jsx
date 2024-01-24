import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import TableCurriculumList from "../../components/tables/TableCurriculumList";
import AddCurriculumHeader from "../../components/admin/AddCurriculumHeader";

const ManageCurriculum = () => {
  return (
    <>
      <Breadcrumb pageName="Curriculum Management" />
      <AddCurriculumHeader />
      <TableCurriculumList />
    </>
  );
};

export default ManageCurriculum;
