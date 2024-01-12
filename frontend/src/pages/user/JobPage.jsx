import React, { useState, useEffect, useContext } from "react";
import { HiAdjustments } from "react-icons/hi";
import JobItem from "../../components/user/JobItem";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseURL from "@/apiConfig";

const JobPage = () => {
    const { register, watch } = useForm();
    let { authTokens } = useContext(AuthContext);

    const [entryLevel, setEntryLevel] = useState(false);
    const [intermediate, setIntermediate] = useState(false);
    const [expert, setExpert] = useState(false);
    const [data, setData] = useState([]);
    const [jobCategory, setJobCategory] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        fetchData();
        fetchJobCategory();
        fetchJobType();
    }, []);

    useEffect(() => {
        const selectedLevels = [];

        if (entryLevel) {
            selectedLevels.push(1);
        }

        if (intermediate) {
            selectedLevels.push(2);
        }

        if (expert) {
            selectedLevels.push(3);
        }

        const data = {
            title: watch("title"),
            category: watch("job_category"),
            experience_level:
                selectedLevels.length > 0 ? selectedLevels.join(",") : "",
            Job_type: watch("Job_type"),
            order_by: watch("sort_by"),
        };
        fetchData(data);
    }, [
        watch("title"),
        watch("job_category"),
        entryLevel,
        intermediate,
        expert,
        watch("Job_type"),
        watch("sort_by"),
    ]);

    const fetchJobCategory = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/job-category-list`
            );
            setJobCategory(response.data);
        } catch (error) {
            setJobCategory([]);
        }
    };

    const fetchJobType = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/job-type-list`);
            setJobType(response.data);
        } catch (error) {
            setJobType([]);
        }
    };

    const fetchData = async (formValues) => {
        try {
            const response = await axios.get(
                `${baseURL}/api/job-list/`,
                {
                    params: formValues,
                    // headers: {
                    //     Authorization: `Bearer ${authTokens.access}`,
                    // },
                }
            );
            setNextPage(response.data.next);
            setData(response.data.results);
        } catch (error) {
            setData([]);
        }
    };

    const loadMoreData = async () => {
        try {
            const response = await axios.get(nextPage);
            setData([...data, ...response.data.results]);
            setNextPage(response.data.next);
        } catch (err) {
            setData([]);
            setNextPage(null);
        }
    };

    return (
        <>
            <div className="flex align-middle justify-center pt-13">
                <input
                    {...register("title")}
                    type="text"
                    placeholder="Search"
                    className="input input-bordered input-accent w-full max-w-2xl rounded-full  mb-7"
                />

                <button
                    className="btn btn-ghost lg:hidden inline-flex"
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }>
                    <HiAdjustments size={30} />
                </button>
            </div>
            <dialog
                id="my_modal_1"
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Filter By</h3>
                    <div className="">
                        <form method="dialog">
                            <h4 className="text-lg text-black font-medium mt-8 mb-3">
                                Category
                            </h4>
                            <select className="select select-sm border-gray-400 w-full max-w-xs">
                                <option disabled selected>
                                    Select Categories
                                </option>
                                <option>Auto</option>
                                <option>Dark mode</option>
                                <option>Light mode</option>
                            </select>

                            <h4 className="text-lg text-black font-medium mt-8 mb-3">
                                Experience level
                            </h4>
                            <div className="mb-2">
                                <label
                                    htmlFor="checkboxLabelOne"
                                    className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="checkboxLabelOne"
                                            className="sr-only items-center"
                                            onChange={() => {
                                                setEntryLevel(!entryLevel);
                                            }}
                                        />
                                        <div
                                            className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                                entryLevel &&
                                                "border-primary bg-gray dark:bg-transparent"
                                            }`}>
                                            <span
                                                className={`opacity-0 ${
                                                    entryLevel && "!opacity-100"
                                                }`}>
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
                                    Entry Level
                                </label>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="checkboxLabelTwo"
                                    className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="checkboxLabelTwo"
                                            className="sr-only items-center"
                                            onChange={() => {
                                                setIntermediate(!intermediate);
                                            }}
                                        />
                                        <div
                                            className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                                intermediate &&
                                                "border-primary bg-gray dark:bg-transparent"
                                            }`}>
                                            <span
                                                className={`opacity-0 ${
                                                    intermediate &&
                                                    "!opacity-100"
                                                }`}>
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
                                    Intermediate
                                </label>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="checkboxLabelThree"
                                    className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="checkboxLabelThree"
                                            className="sr-only items-center"
                                            onChange={() => {
                                                setExpert(!expert);
                                            }}
                                        />
                                        <div
                                            className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                                expert &&
                                                "border-primary bg-gray dark:bg-transparent"
                                            }`}>
                                            <span
                                                className={`opacity-0 ${
                                                    expert && "!opacity-100"
                                                }`}>
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
                                    Expert
                                </label>
                            </div>

                            <h4 className="text-lg text-black font-medium mt-8 mb-3">
                                Job type
                            </h4>
                            <select className="select select-sm border-gray-400 w-full max-w-xs">
                                <option disabled selected>
                                    Select Job Type
                                </option>
                                <option>Internship</option>
                                <option>Contract</option>
                                <option>Part-time</option>
                                <option>Full-time</option>
                            </select>
                            <button className="btn w-full btn-primary mt-12">
                                Apply
                            </button>
                            <button className="btn w-full btn-ghost btn-outline mt-2">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            <h1 className="border-b-[1px] lg:text-title-xl text-center lg:text-left text-title-md text-black-2 pb-2 lg:font-semibold font-medium">
                Jobs
            </h1>

            <div className="flex h-full flex-col md:flex-row">
                <aside className="w-full md:w-72.5 lg:block hidden">
                    <h4 className="text-lg text-black font-medium mt-8 mb-3">
                        Category
                    </h4>
                    <select
                        {...register("job_category")}
                        className="select select-sm border-gray-400 w-full max-w-xs">
                        <option selected value="">
                            Select Categories
                        </option>
                        {jobCategory.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <h4 className="text-lg text-black font-medium mt-8 mb-3">
                        Experience level
                    </h4>
                    <div className="mb-2">
                        <label
                            htmlFor="checkboxLabelOne"
                            className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                            <div className="relative">
                                <input
                                    {...register("entry_level")}
                                    type="checkbox"
                                    id="checkboxLabelOne"
                                    className="sr-only items-center"
                                    onChange={() => {
                                        setEntryLevel(!entryLevel);
                                    }}
                                />
                                <div
                                    className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                        entryLevel &&
                                        "border-primary bg-gray dark:bg-transparent"
                                    }`}>
                                    <span
                                        className={`opacity-0 ${
                                            entryLevel && "!opacity-100"
                                        }`}>
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
                            Entry Level
                        </label>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="checkboxLabelTwo"
                            className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                            <div className="relative">
                                <input
                                    {...register("intermediate")}
                                    type="checkbox"
                                    id="checkboxLabelTwo"
                                    className="sr-only items-center"
                                    onChange={() => {
                                        setIntermediate(!intermediate);
                                    }}
                                />
                                <div
                                    className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                        intermediate &&
                                        "border-primary bg-gray dark:bg-transparent"
                                    }`}>
                                    <span
                                        className={`opacity-0 ${
                                            intermediate && "!opacity-100"
                                        }`}>
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
                            Intermediate
                        </label>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="checkboxLabelThree"
                            className="flex cursor-pointer select-none items-center text-lg text-black-2 font-satoshi">
                            <div className="relative">
                                <input
                                    {...register("expert")}
                                    type="checkbox"
                                    id="checkboxLabelThree"
                                    className="sr-only items-center"
                                    onChange={() => {
                                        setExpert(!expert);
                                    }}
                                />
                                <div
                                    className={`mr-4 flex h-6 w-6 items-center justify-center rounded border-gray-500 border ${
                                        expert &&
                                        "border-primary bg-gray dark:bg-transparent"
                                    }`}>
                                    <span
                                        className={`opacity-0 ${
                                            expert && "!opacity-100"
                                        }`}>
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
                            Expert
                        </label>
                    </div>

                    <h4 className="text-lg text-black font-medium mt-8 mb-3">
                        Job type
                    </h4>
                    <select
                        {...register("Job_type")}
                        className="select select-sm border-gray-400 w-full max-w-xs">
                        <option selected value="">
                            Select Job Type
                        </option>
                        {jobType.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </aside>

                <section className="flex flex-col flex-1 mt-0 md:mt-15 w-full p-0 md:pl-7">
                    <select
                        {...register("sort_by")}
                        className="self-end select select-sm border-gray-400 mb-8 max-w-xs hidden md:block">
                        <option selected value="">
                            Sort by:
                        </option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="relevance">Relevance</option>
                    </select>

                    <JobItem data={data} />

                    {nextPage && (
                        <div className="flex justify-center lg:self-end mt-4">
                            <button
                                onClick={loadMoreData}
                                className="px-4 py-2 font-medium text-white bg-primary w-full lg:w-fit my-5 rounded-lg hover:bg-primary-dark">
                                Load More
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default JobPage;
