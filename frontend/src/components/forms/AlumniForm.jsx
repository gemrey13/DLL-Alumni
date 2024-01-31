import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "@/apiConfig";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AlumniForm = () => {
  const { register, watch, handleSubmit, reset, formState } = useForm();
  const { isSubmitting } = formState;

  const [coursesData, setCoursesData] = useState([]);
  const [isEmployed, setIsEmployed] = useState(false);
  const [isPromoted, setIsPromoted] = useState(false);
  const [isRelated, setIsRelated] = useState(false);
  const [isPursued, setIsPursued] = useState(false);
  const [years, setYears] = useState([]);
  const [rows, setRows] = useState([
    {
      name: "",
      dateEmployed: "",
      employmentStatus: "",
      monthlySalary: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        name: "",
        dateEmployed: "",
        employmentStatus: "",
        monthlySalary: "",
      },
    ]);
  };

  useEffect(() => {
    const data = {
      year_graduated: watch("year_graduated"),
    };
    fetchCoursesForCurriculum(data);
  }, [watch("year_graduated")]);

  const fetchCoursesForCurriculum = async (year_graduated) => {
    try {
      const response = await axios.get(`${baseURL}/api/curriculum`, {
        params: year_graduated,
      });
      setCoursesData(response.data);
    } catch (err) {
      console.error("Error fetching Courses List:", err);
    }
  };

  const employmentData = rows.map((row) => ({
    name: row.name,
    dateEmployed: row.dateEmployed,
    employmentStatus: row.employmentStatus,
    monthlySalary: row.monthlySalary,
  }));

  employmentData.map((row) => {
    if (row.dateEmployed === "") {
      row.dateEmployed = null;
    }
  });

  const submitForm = async (data) => {
    const postData = {
      ...data,
      employmentData,
    };

    const promise = toast.promise(
      axios.post(`${baseURL}/api/alumni-form/`, postData),
      {
        loading: "Submitting...",
        success: <b>Form submitted successfully!</b>,
        error: <b>Failed to submit form.</b>,
      }
    );
    try {
      const response = await promise;
      setRows([
        {
          name: "",
          dateEmployed: "",
          employmentStatus: "",
          monthlySalary: "",
        },
      ]);
      setIsEmployed(false);
      setIsPromoted(false);
      setIsRelated(false);
      setIsPursued(false);
      reset();
    } catch (error) {}
  };

  const resetForm = () => {
    setRows([
      {
        name: "",
        dateEmployed: "",
        employmentStatus: "",
        monthlySalary: "",
      },
    ]);
    setIsEmployed(false);
    setIsPromoted(false);
    setIsRelated(false);
    reset();
    toast.success("Tracer Survey Form Reset!");
  };

  const employment_statuses = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Intern",
    "Freelance",
    "Self-employed",
    "Consultant",
    "Remote",
    "Student",
  ];

  useEffect(() => {
    const fetchCurriculumYears = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/curriculum-year-list/`
        );
        setYears(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurriculumYears();
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Dalubhasaan ng Lungsod ng Lucena Tracer Survey Form
          </h3>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  First name <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("fname", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Last name <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("lname", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  M.I. <span className="text-gray-400">(Optional)</span>{" "}
                </label>
                <input
                  {...register("mi")}
                  type="text"
                  placeholder="Enter your middle initial"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Religion <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("religion", {
                    required: "Religion is required",
                  })}
                  type="text"
                  placeholder="Enter your religion"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Civil Status <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("civil_status", {
                    required: "Marital status is required",
                  })}
                  type="text"
                  placeholder="Enter your status"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Date of birth <span className="text-meta-1">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    {...register("date_of_birth", {
                      required: "Date of birth is required",
                    })}
                    type="date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2.5 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Facebook Account <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("facebook_account", {
                    required: "Facebook account is required",
                  })}
                  type="text"
                  placeholder="Enter your facebook account"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mobile Number <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("contact_number", {
                    required: "Contact number is required",
                  })}
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Home Address{" "}
                <span className="text-gray-400">
                  (Country, Region, Province, City, Barangay, Zip code)
                </span>{" "}
                <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("alumni_address", {
                  required: "Address is required",
                })}
                type="text"
                placeholder="Enter your address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-black dark:text-white">
                  Year Graduated <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register("year_graduated", {
                      required: "Year Graduated is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select curriculum</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
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

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Course <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register("course", {
                      required: "Course is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select Course</option>
                    {coursesData.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_id}
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

            <hr className="mb-2.5 border-b border-stroke dark:border-strokedark" />
            <label className="font-medium mb-4.5 block text-black dark:text-white">
              Current Job{" "}
              <span className="text-gray-400">
                (Leave blank if dont have job)
              </span>{" "}
            </label>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Current Job Position
                </label>
                <input
                  {...register("job_position")}
                  type="text"
                  placeholder="Enter job position"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Approximate Monthly Salary
                </label>
                <input
                  {...register("salary")}
                  type="number"
                  placeholder="Enter salary"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company Address{" "}
                  <span className="text-gray-400">
                    (Country, Region, Province, City, Barangay, Zip code)
                  </span>{" "}
                </label>
                <input
                  {...register("current_job_address")}
                  type="text"
                  placeholder="Enter your job address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company Affiliation
                </label>
                <input
                  {...register("company_affiliation")}
                  type="text"
                  placeholder="Enter company name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Employment Status <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register("current_job_employment_status", {
                      required: "Employment Status is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Select Status</option>
                    {employment_statuses.map((status, key) => (
                      <option key={`current_job-${key}`} value={status}>
                        {status}
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

              <div className="w-full xl:w-1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Satisfaction <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register("satisfaction_rate", {
                      required: "Satisfaction rate is required",
                    })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Please rate</option>
                    <option value="5">Very Satisfied</option>
                    <option value="4">Satisfied</option>
                    <option value="3">Neutral</option>
                    <option value="2">Dissatisfied</option>
                    <option value="1">Very Dissatisfied</option>
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

            <div className="mb-4.5 px-12 py-5">
              <div className="mb-5">
                <label
                  htmlFor="checkboxLabelOne"
                  className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      {...register("employed_within_6mo")}
                      type="checkbox"
                      id="checkboxLabelOne"
                      className="sr-only"
                      onChange={() => {
                        setIsEmployed(!isEmployed);
                      }}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        isEmployed &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}>
                      <span
                        className={`opacity-0 ${isEmployed && "!opacity-100"}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  Have you been employed immediately 6 months or less after
                  graduation?
                </label>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="checkboxLabelTwo"
                  className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      {...register("promoted_in_current_job")}
                      type="checkbox"
                      id="checkboxLabelTwo"
                      className="sr-only"
                      onChange={() => {
                        setIsPromoted(!isPromoted);
                      }}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        isPromoted &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}>
                      <span
                        className={`opacity-0 ${isPromoted && "!opacity-100"}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  Have you been promoted in your current job?
                </label>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="checkboxLabelFour"
                  className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      {...register("pursued_further_education")}
                      type="checkbox"
                      id="checkboxLabelFour"
                      className="sr-only"
                      onChange={() => {
                        setIsPursued(!isPursued);
                      }}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        isPursued &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}>
                      <span
                        className={`opacity-0 ${isPursued && "!opacity-100"}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  Pursued further education?
                </label>
              </div>

              <div>
                <label
                  htmlFor="checkboxLabelThree"
                  className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      {...register("getting_jobs_related_to_experience")}
                      type="checkbox"
                      id="checkboxLabelThree"
                      className="sr-only"
                      onChange={() => {
                        setIsRelated(!isRelated);
                      }}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        isRelated &&
                        "border-primary bg-gray dark:bg-transparent"
                      }`}>
                      <span
                        className={`opacity-0 ${isRelated && "!opacity-100"}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                            fill="#3056D3"
                            stroke="#3056D3"
                            strokeWidth="0.4"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  Do you think your getting jobs related to your experience,
                  skills and knowledge learned in Dalubhasaan ng Lungsod ng
                  Lucena?
                </label>
              </div>
            </div>

            <hr className="mb-2.5 border-b border-stroke dark:border-strokedark" />
            <label className="font-medium mb-4.5 block text-black dark:text-white">
              Employment Record{" "}
              <span className="text-gray-400">
                (Begin with your first job after graduation)
              </span>{" "}
            </label>

            <div className="mb-4.5 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Name of the Company
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Date Employed
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Employment Status
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Approximate Monthly Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <input
                            required
                            type="text"
                            value={row.name}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <input
                            required
                            type="date"
                            value={row.dateEmployed}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "dateEmployed",
                                e.target.value
                              )
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                              required
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "employmentStatus",
                                  e.target.value
                                )
                              }
                              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                              <option value="ss">Select Status</option>
                              {employment_statuses.map((status, key) => (
                                <option key={key} value={status}>
                                  {status}
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
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <input
                            required
                            type="number"
                            value={row.monthlySalary}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "monthlySalary",
                                e.target.value
                              )
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4.5 flex justify-center">
              <button
                onClick={handleAddRow}
                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-6">
                +Add Employment Record
              </button>
            </div>

            <hr className="mb-2.5 border-b border-stroke dark:border-strokedark" />
            <label className="font-medium mb-4.5 block text-black dark:text-white">
              Professional Growth <span className="text-gray-400"></span>{" "}
            </label>

            <div className="mb-6">
              <textarea
                {...register("description")}
                rows={6}
                placeholder="(Please state higher educational attainment earned, training, skills,affiliations,professional registrations/licenses, awards and recognitions achieved)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
            </div>

            <div className="lg:flex block">
              <label
                htmlFor="my_modal_6"
                className="btn dark:btn-neutral w-full lg:w-[70%] flex  justify-center p-3 bg-primary font-medium text-gray">
                Submit
              </label>
              <div
                onClick={resetForm}
                className="btn-ghost border-graydark w-full mt-3 lg:mt-0 lg:w-[30%] btn">
                Reset
              </div>
            </div>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">System Notice!</h3>
                <p className="py-4">Are you sure want to submit this entry?</p>
                <div className="modal-action">
                  <button
                    onClick={() => {
                      const checkbox = document.getElementById("my_modal_6");
                      if (checkbox && checkbox.checked) {
                        checkbox.checked = false;
                      }
                    }}
                    disabled={isSubmitting}
                    type="submit"
                    className="btn w-1/3 flex justify-center rounded-lg bg-primary p-3 font-medium text-gray">
                    {isSubmitting && (
                      <span className="w-fit animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></span>
                    )}
                    Submit Entry
                  </button>
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AlumniForm;
