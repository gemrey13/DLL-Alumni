import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";
import SearchSelect from "./SearchSelect";
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [accountLink, setAccountLink] = useState("");
  const [accountLinks, setAccountLinks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const resetForm = () => {
    reset();
    toast.success("Form resetted!");
  };

  const onSubmit = async (data) => {
    data.accountLinks = accountLinks;
    data.selectedSkills = selectedSkills;
    try {
      const response = await axios.put(
        `${baseURL}/api/update-profile-information/${user.user_id}/`,
        data
      );
      reset();
      navigate("/confirm-changes");
    } catch (error) {
      toast.error("Error updating user information. Please try again.");
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

    const getCategoryList = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/job-category-list/`);
        setCategoryList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLanguages();
    getCategoryList();
  }, []);

  const handleAccountLinkChange = (e) => {
    setAccountLink(e.target.value);
  };

  const handleAddAccountLink = () => {
    if (accountLink.trim() !== "") {
      setAccountLinks((prevLinks) => [...prevLinks, accountLink]);
      setAccountLink("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddAccountLink();
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = accountLinks.filter(
      (selected) => selected !== option
    );
    setAccountLinks(updatedOptions);
  };

  if (
    !user ||
    !user.profile_info ||
    !user.user_work_experience ||
    !user.user_job ||
    !user.user_education
  ) {
    return <div>sdasd</div>;
  }

  const location = user.profile_info?.location || "";
  const bio = user.profile_info?.bio || "";
  const specialty = user.user_job?.specialty || "";
  const description = user.user_job?.description || "";
  const school_name = user.user_education?.school_name || "";
  const course = user.user_education?.course || "";
  const school_year = user.user_education?.school_year || "";

  const firstWorkExperience = user.user_work_experience[0] || "";

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
                defaultValue={location}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Language <span className="text-meta-1">*</span>
              </label>
              <div className="relative z-1 bg-transparent dark:bg-form-input">
                <select
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

            <div className="mt-4">
              <SearchSelect
                options={categoryList}
                onSelect={setSelectedSkills}
              />
            </div>

            <div className="w-full xl:w-1/2 mt-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Gender <span className="text-meta-1">*</span>
              </label>
              <div className="relative z-1 bg-transparent dark:bg-form-input">
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

            <div className="w-full xl:w-1/2 mb-4.5 mt-4">
              <label
                htmlFor="bio"
                className="mb-2.5 block text-black dark:text-white">
                BIO <span className="text-meta-1">*</span>
              </label>
              <textarea
                {...register("bio", {
                  required: "BIO is required",
                })}
                defaultValue={bio}
                id="bio"
                rows="4"
                className="font-medium block p-2.5 w-full text-sm appearance-none rounded border border-stroke text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your bio here..."></textarea>
            </div>

            <div className="w-full xl:w-1/2 mb-4.5 mt-4">
              <label
                htmlFor="experience"
                className="mb-2.5 block text-black dark:text-white">
                Work Experience <span className="text-meta-1">*</span>
              </label>
              <textarea
                {...register("experience", {
                  required: "experience is required",
                })}
                defaultValue={firstWorkExperience.content}
                id="experience"
                rows="4"
                className="font-medium block p-2.5 w-full text-sm appearance-none rounded border border-stroke text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your experience here..."></textarea>
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Job specialty <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("specialty", {
                  required: "Location is required",
                })}
                type="text"
                placeholder="Enter your specialty"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={specialty}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5 mt-4">
              <label
                htmlFor="description"
                className="mb-2.5 block text-black dark:text-white">
                Job description <span className="text-meta-1">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "description is required",
                })}
                defaultValue={description}
                id="description"
                rows="4"
                className="font-medium block p-2.5 w-full text-sm appearance-none rounded border border-stroke text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your job description here..."></textarea>
            </div>

            <hr />
            <h3 className="text-black-2 font-medium text-xl mb-5">Education</h3>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                School name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("school_name", {
                  required: "School name is required",
                })}
                type="text"
                placeholder="Enter your school name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={school_name}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Course <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("course", {
                  required: "Course is required",
                })}
                type="text"
                placeholder="Enter your course"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={course}
              />
            </div>

            <div className="w-full xl:w-1/2 mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                School year <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("school_year", {
                  required: "School year is required",
                })}
                type="text"
                placeholder="Enter your school year"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                defaultValue={school_year}
              />
            </div>

            <hr />
            <h3 className="text-black-2 font-medium text-xl mb-5">
              Account links
            </h3>

            <div className="mt-3 w-full xl:w-1/2 mb-4.5">
              <label className="block text-black dark:text-white mb-1">
                Add account link:
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  placeholder="Enter account link..."
                  value={accountLink}
                  onChange={handleAccountLinkChange}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="ml-2 px-4 py-2 btn bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
                  onClick={handleAddAccountLink}>
                  Add
                </div>
              </div>
              <div className="mt-3">
                <h4>Account Links:</h4>
                {accountLinks.map((link, index) => (
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

            <div className="lg:flex block justify-start mb-7 w-full">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full lg:w-[20%] btn btn-primary transition bg-opacity-100 hover:bg-opacity-80">
                {isSubmitting && (
                  <span className="w-fit animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></span>
                )}
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
