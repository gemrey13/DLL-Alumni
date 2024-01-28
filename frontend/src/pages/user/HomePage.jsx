import React, { useEffect, useContext, useState } from "react";
import JobItem from "../../components/user/JobItem";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import baseURL from "@/apiConfig";
import toast from "react-hot-toast";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";
import { convertToTitleCase } from "../../utils/formatting";

const HomePage = () => {
  let { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/job-recommendation`, {
          params: { user_id: user.user_id, page: currentPage },
        });
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong...");
      }
    };
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
      <section className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-3xl">Please update your profile</h1>
        <div>
          <Link
            to="/u/my-profile/"
            className="w-fit flex hover:underline items-center">
            <HiOutlinePencilAlt size={20} />
            <p>Update your profile here</p>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12">
        <h1 className="text-4xl text-black-2 font-semibold">
          Hi {convertToTitleCase(user.first_name)} ! 👋
        </h1>
        <Link
          to="/u/my-profile/"
          className="w-fit flex hover:underline items-center">
          <HiOutlinePencilAlt size={20} />
          <p>Edit your profile</p>
        </Link>

        <section className="flex flex-col flex-1 mt-0 md:mt-5 w-full mb-4">
          <h4 className="font-medium text-xl text-black-2 mt-10">
            Jobs recommended for you
          </h4>
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
      </section>
    </>
  );
};

export default HomePage;
