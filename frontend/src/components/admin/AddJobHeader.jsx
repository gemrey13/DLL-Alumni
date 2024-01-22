import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

const AddJobHeader = () => {
  const { register, handleSubmit, reset } = useForm();
  const [jobCategory, setJobCategory] = useState("");
  const [jobCategories, setJobCategories] = useState([]);
  const [jobType, setJobType] = useState([]);

  useEffect(() => {
    const fetchJobType = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/job-type-list/`);
        setJobType(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobType();
  }, []);

  const handleJobCategoriesChange = (e) => {
    setJobCategory(e.target.value);
  };

  const handleAddJobCategories = () => {
    if (jobCategory.trim() !== "") {
      setJobCategories((prevLinks) => [...prevLinks, jobCategory]);
      setJobCategory("");
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = jobCategories.filter(
      (selected) => selected !== option
    );
    setJobCategories(updatedOptions);
  };

  const onsubmit = async (data) => {
    data.category = jobCategories;
    try {
      const response = await axios.post(`${baseURL}/api/job-details/`, data);
      if (response.status === 201) {
        toast.success("Job posted");
        document.getElementById("add_job").close();
        reset();
        setJobCategories([]);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Job list
        </h3>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div>
          <button
            onClick={() => document.getElementById("add_job").showModal()}
            className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80">
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                fill=""
              />
            </svg>
            Add job
          </button>

          <dialog id="add_job" className="modal">
            <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-xl text-black dark:text-white">
                Add job details
              </h3>

              <form onSubmit={handleSubmit(onsubmit)} className="py-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Title <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("title", {
                        required: "Title is required",
                      })}
                      type="text"
                      placeholder="Enter a title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Company name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("company_name", {
                        required: "Company name is required",
                      })}
                      type="text"
                      placeholder="Enter the company name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Location <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("location", {
                        required: "Location is required",
                      })}
                      type="text"
                      placeholder="Enter the location"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Starting salary <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("starting_salary", {
                        required: "Starting salary is required",
                      })}
                      type="number"
                      placeholder="Enter the starting salary"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Experience level <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        defaultValue=""
                        {...register("experience_level", {
                          required: "Experience level is required",
                        })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Select experience level</option>
                        <option value="1">Entry level</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Expert</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Job type <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        defaultValue=""
                        {...register("Job_type", {
                          required: "Job type is required",
                        })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Select job type</option>
                        {jobType.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 w-full mb-4.5">
                  <label className="block text-black dark:text-white mb-1">
                    Add Job category:
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="Enter job category ex: Programming, Graphic Design etc..."
                      value={jobCategory}
                      onChange={handleJobCategoriesChange}
                    />
                    <div className="ml-2 btn" onClick={handleAddJobCategories}>
                      Add
                    </div>
                  </div>
                  <div className="mt-3">
                    {jobCategories.length !== 0 && <h4>Job Categories:</h4>}
                    {jobCategories.map((link, index) => (
                      <span
                        key={index}
                        className="badge badge-outline m-2 text-base">
                        {link}
                        <div onClick={() => handleRemoveOption(link)}>
                          <HiOutlineX />
                        </div>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={4}
                    placeholder="write a description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                </div>

                <div className="w-full flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Post the job
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};
export default AddJobHeader;
