import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import baseURL from "@/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

const AddNewsHeader = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageCover, setImageCover] = useState([]);
  const [header, setHeader] = useState([]);

  const onsubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("header", data.header);
      formData.append("summary", data.summary);
      formData.append("description", data.description);
      formData.append("cover_image", imageCover, imageCover.name);

      const response = await axios.post(`${baseURL}/api/news-list/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("News posted");
        document.getElementById("add_news").close();
        reset(); // Reset the form
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          News list
        </h3>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div>
          <button
            onClick={() => document.getElementById("add_news").showModal()}
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
            Add news
          </button>

          <dialog id="add_news" className="modal">
            <div className="modal-box w-11/12 max-w-5xl dark:bg-boxdark">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-xl text-black dark:text-white">
                Add news details
              </h3>

              <form
                onSubmit={handleSubmit(onsubmit)}
                encType="multipart/form-data"
                className="py-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Title <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("header", {
                        required: "Title is required",
                      })}
                      value={header}
                      onChange={(e) => setHeader(e.target.value)}
                      type="text"
                      placeholder="Enter a title"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Summary <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("summary", {
                        required: "Summary is required",
                      })}
                      type="text"
                      placeholder="Enter a summary"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Attach cover image
                  </label>
                  <input
                    {...register("cover_image", {
                      required: "Cover image is required",
                    })}
                    onChange={(e) => setImageCover(e.target.files[0])}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
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
export default AddNewsHeader;
