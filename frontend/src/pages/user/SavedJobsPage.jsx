import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import JobItem from "../../components/user/JobItem";
import Loader from "../../common/Loader";

const SavedJobsPage = () => {
  let { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/user-saved-job/`, {
        params: { user_id: user.user_id, page: currentPage },
        // headers: {
        //     Authorization: `Bearer ${authTokens.access}`,
        // },
      });
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
      setLoading(false);
    } catch (error) {
      setData([]);
      toast.error("Something went wrong...");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="h-screen align-middle">
        <Loader />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <section className="flex items-center justify-center h-screen w-full">
        <h1 className="text-3xl">Theres no saved jobs.</h1>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col flex-1 mt-0 md:mt-5 w-full mb-4 py-10">
        <h1 className="border-b-[1px] lg:text-title-xl text-center lg:text-left text-title-md text-black-2 pb-2 lg:font-semibold font-medium">
          Saved Job
        </h1>
        <JobItem data={data} />
      </section>

      <div className="join grid grid-cols-3">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="join-item btn btn-outline">
          Previous
        </button>
        <span className="text-center">
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="join-item btn btn-outline">
          Next
        </button>
      </div>
    </>
  );
};

export default SavedJobsPage;
