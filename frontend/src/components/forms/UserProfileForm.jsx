import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import SearchSelect from "./SearchSelect";

const UserProfileForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  let { user } = useContext(AuthContext);
  const [languages, setLanguages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const resetForm = () => {
    reset();
    toast.success("Form resetted!");
  };

  const onSubmit = async (data) => {
    const promise = toast.promise(
      axios.put(
        `${baseURL}/api/update-account-information/${user.user_id}/`,
        data
      ),
      {
        loading: "Updating account. Please wait...",
        success: <b>Account Updated successfully!</b>,
        error: <b>Something went wrong.</b>,
      }
    );
    try {
      const response = await promise;
      reset();
    } catch (error) {
      toast.error("Error updating user account. Please try again.");
    }
  };

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/language-list/`);
        setLanguages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLanguages();
  }, []);

  console.log(selectedSkills);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Profile
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6.5 px-4 lg:pl-20">
            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Location <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("location", {
                  required: "Location is required",
                })}
                type="text"
                placeholder="Enter your location"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Language <span className="text-meta-1">*</span>
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  defaultValue=""
                  {...register("language", {
                    required: "Language is required",
                  })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">Select language</option>
                  {languages.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
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

            <div>
              <SearchSelect
                options={["JavaScript", "React", "Node.js", "HTML", "CSS"]}
                onSelect={setSelectedSkills}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Gender <span className="text-meta-1">*</span>
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  defaultValue=""
                  {...register("sex", {
                    required: "Sex is required",
                  })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Last name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required",
                })}
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <hr />

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Username <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                placeholder="Enter your username"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("email", {
                  required: "email is required",
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                })}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2 mb-9">
              <label className="mb-2.5 block text-black dark:text-white">
                Re-type Password <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Re-type your password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="lg:flex block justify-start mb-7 w-full">
              <button
                type="submit"
                className="btn dark:btn-neutral w-full lg:w-[20%] flex justify-center p-3 bg-primary font-medium text-gray">
                Submit
              </button>
              <div
                onClick={resetForm}
                className="btn-ghost border-graydark w-full mt-3 lg:mt-0 lg:w-[10%] btn">
                Reset
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfileForm;
