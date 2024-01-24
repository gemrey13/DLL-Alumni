import React from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import AddCoursesHeader from "../../components/admin/AddCoursesHeader";
import TableCoursesList from "../../components/tables/TableCoursesList";

const ManageCourses = () => {
  return (
    <>
      <Breadcrumb pageName="Course Management" />
      <AddCoursesHeader />
      <TableCoursesList />
    </>
  );
};

export default ManageCourses;
