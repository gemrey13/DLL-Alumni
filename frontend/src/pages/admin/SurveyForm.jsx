import React, { useState, useEffect } from "react";
import AlumniForm from "../../components/forms/AlumniForm";
import Breadcrumb from "../../components/admin/Breadcrumb";

const ImportData = () => {
  return (
    <>
      <Breadcrumb pageName={"Survey Form"} />
      <AlumniForm />
    </>
  );
};

export default ImportData;
