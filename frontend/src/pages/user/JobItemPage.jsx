import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineLightBulb,
  HiOutlineUsers,
  HiOutlinePuzzle,
} from "react-icons/hi";
import axios from "axios";
import baseURL from "@/apiConfig";
import Loader from "../../common/Loader";
import {
  formatSalary,
  getExperienceLevel,
  getExperienceLevelDescription,
  calculateTimeElapsed,
  isNewJob,
  descriptionFormatter,
  formatDate,
} from "../../utils/formatting";
import toast from "react-hot-toast";

const JobItemPage = () => {
  let { user } = useContext(AuthContext);

  const { job_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJobItemDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/job-details/`, {
          params: { job_id: job_id, user_id: user.user_id },
        });
        setData(response.data);
        setIsApplied(response.data.is_applied);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchJobItemDetails();
  }, []);

  const applyJob = async (jobId) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/job-application/?job_id=${jobId}&user_id=${user.user_id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsApplied(!isApplied);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  const removeJob = async (jobId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/job-application/?job_id=${jobId}&user_id=${user.user_id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsApplied(!isApplied);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  if (error) {
    return (
      <>
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error!.</span>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="h-screen align-middle">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex lg:flex-row flex-col pt-3 lg:pt-10 pb-15">
        <section className="flex-1 border-r-0 lg:border-r-[1px] border-slate-300">
          <section className="border-b-[1px] border-slate-300 p-7">
            <h1 className="text-2xl text-black-2 font-medium py-4">
              {data.title}{" "}
              {isNewJob(data.created_at) && (
                <div className="badge badge-secondary">NEW</div>
              )}
            </h1>
            <div className="flex lg:flex-row flex-col text-base gap-4 lg:gap-8">
              <p>Posted {calculateTimeElapsed(data.created_at)}</p>
              <div className="flex lg:justify-center items-center gap-2">
                <HiOutlineLocationMarker />
                <p className="font-medium">{data.location}</p>
              </div>
            </div>
            <p className="flex items-center flex-col lg:flex-row my-2 gap-2 text-black-2">
              <HiOutlinePuzzle size={25} className="hidden lg:inline-flex" />
              Editing your profile will help you better highlight your expertise
              when submitting application to jobs like these.{" "}
              <span className="underline ml-1 text-error cursor-pointer">
                Edit your profile
              </span>
            </p>
          </section>
          <section className="border-b-[1px] border-slate-300 p-7">
            <p className="text-black-2">
              {descriptionFormatter(data.description)}
            </p>
          </section>
          <section className="border-b-[1px] border-slate-300 p-7">
            <ul className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start">
              <li className="flex justify-center items-center gap-1 text-black-2 font-medium">
                <HiOutlineClock size={25} />
                {data.Job_type}
              </li>
              <li className="flex justify-center items-start gap-1 text-black-2 font-medium">
                <HiOutlineTag size={20} />
                <section className="flex flex-col">
                  {formatSalary(data.starting_salary)}
                  <br />
                  <span className="text-sm text-gray-500">Monthly salary</span>
                </section>
              </li>
              <li className="flex justify-center items-start gap-1 text-black-2 font-medium">
                <HiOutlineLightBulb size={25} />
                <section className="flex flex-col">
                  {getExperienceLevel(data.experience_level)}
                  <br />
                  <span className="text-sm text-gray-500">
                    Looking for{" "}
                    {getExperienceLevelDescription(data.experience_level)}
                  </span>
                </section>
              </li>
            </ul>
          </section>

          <section className="p-7">
            <h3 className="text-2xl font-medium text-black-2">
              Skills and Expertise
            </h3>
            {data.category &&
              data.category.map((category_item, index) => (
                <div key={index} className="badge badge-outline ml-0 m-4">
                  {category_item}
                </div>
              ))}
          </section>
        </section>

        <aside className="py-7 pl-0 lg:pl-5 w-full lg:w-[20%]">
          <div className="flex flex-col ">
            {isApplied ? (
              <button
                onClick={() => removeJob(data.id)}
                className="btn btn-md btn-primary rounded-full mb-3">
                Remove Application
              </button>
            ) : (
              <button
                onClick={() => applyJob(data.id)}
                className="btn btn-md btn-primary rounded-full mb-3">
                Apply Now
              </button>
            )}

            <button className="btn btn-md btn-outline rounded-full">
              Save Job
            </button>
          </div>

          <div className="mt-9">
            <p className="flex items-center">
              Total applicants: <HiOutlineUsers />
            </p>
            <p className="font-semibold">{data.num_applicants} Applicants</p>
          </div>

          <div className="mt-14">
            <h6 className="text-xl text-black-2 font-medium mb-4">
              Posted by:
            </h6>
            <p className="font-medium leading-3">{data.posted_by.username}</p>
            <p className="mb-7">{calculateTimeElapsed(data.created_at)}</p>

            <p className="font-medium mb-4">
              {data.posted_by.num_posted_jobs} jobs posted
            </p>
            <p className="mb-7 text-sm">
              Member since {formatDate(data.posted_by.date_joined)}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default JobItemPage;
