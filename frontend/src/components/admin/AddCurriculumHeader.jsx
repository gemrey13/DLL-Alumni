import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

const AddCurriculumHeader = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isSubmitting } = formState;

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

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Curriculum list
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
            Add curriculum
          </button>

          <dialog id="add_curriculum" className="modal">
            <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-xl text-black dark:text-white">
                Add curriculum
              </h3>

              <form onSubmit={handleSubmit(onsubmit)} className="py-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      CMO name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("cmo_no", {
                        required: "CMO name is required",
                      })}
                      type="text"
                      placeholder="Enter a CMO name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Start year <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("start_year", {
                        required: "Start year is required",
                      })}
                      type="number"
                      placeholder="Enter a Start year"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      End year <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("end_year", {
                        required: "End year name is required",
                      })}
                      type="number"
                      placeholder="Enter the End year"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
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
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary">
                    {isSubmitting && (
                      <span className="w-fit animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></span>
                    )}
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
export default AddCurriculumHeader;
