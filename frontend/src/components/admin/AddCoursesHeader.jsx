import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

const AddCoursesHeader = () => {
  const { register, handleSubmit, reset } = useForm();
  const [curriculumList, setCurriculumList] = useState([]);

  const onsubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/curriculum-handler/`,
        data
      );
      if (response.status === 201) {
        toast.success("Curriculum Added");
        document.getElementById("add_curriculum").close();
        reset();
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/curriculum-list/`);
        setCurriculumList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurriculum();
  }, []);
  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Courses list
        </h3>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div>
          <button
            onClick={() =>
              document.getElementById("add_curriculum").showModal()
            }
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
            Add course
          </button>

          <dialog id="add_curriculum" className="modal">
            <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-xl text-black dark:text-white">
                Add course
              </h3>

              <form onSubmit={handleSubmit(onsubmit)} className="py-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Curriculum <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        defaultValue=""
                        {...register("curriculum", {
                          required: "Curriculum is required",
                        })}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <option value="">Select Curriculum</option>
                        {curriculumList.map((curriculum) => (
                          <option
                            key={curriculum.cmo_no}
                            value={curriculum.cmo_no}>
                            {curriculum.cmo_no}
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

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Course name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("course_name", {
                        required: "Course name is required",
                      })}
                      type="text"
                      placeholder="Enter a Course name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Course ID <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("course_id", {
                        required: "Course ID is required",
                      })}
                      type="text"
                      placeholder="Enter a Course ID"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      No. of Units <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("no_units", {
                        required: "No. of Units is required",
                      })}
                      type="number"
                      placeholder="Enter the No. of Units"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Course description
                  </label>
                  <textarea
                    {...register("course_desc", {
                      required: "Course description is required",
                    })}
                    rows={4}
                    placeholder="write a course description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                </div>

                <div className="w-full flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Post the curriculum
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
export default AddCoursesHeader;
