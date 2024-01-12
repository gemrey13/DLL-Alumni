import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import AuthContext from "../../context/AuthContext";

const JobItemPage = () => {
    const { job_id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchJobItemDetails = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/api/job-details/`,
                    {
                        params: { job_id: job_id },
                    }
                );
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchJobItemDetails();
    }, []);

    const formatSalary = (salary) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 0,
        }).format(salary);
    };

    const getExperienceLevel = (level) => {
        switch (level) {
            case 1:
                return "Entry Level";
            case 2:
                return "Intermediate";
            case 3:
                return "Expert";
            default:
                return "Unknown";
        }
    };

    const getExperienceLevelDescription = (level) => {
        switch (level) {
            case 1:
                return "early graduates";
            case 2:
                return "have a experience in the fields";
            case 3:
                return "strong knowledge and mastery in the field";
            default:
                return "Unknown";
        }
    };

    const calculateTimeElapsed = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference = now - createdDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
        }
    };

    const isNewJob = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference = now - createdDate;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));

        return hours <= 1;
    };

    const descriptionFormatter = (desc) => {
        const sentences = desc.split(".");
        try {
            if (sentences.length === 2) {
                return desc;
            } else {
                return sentences.map((sentence, sentenceIndex, array) => (
                    <React.Fragment key={sentenceIndex}>
                        {sentence.trim()}
                        {sentenceIndex !== array.length - 1 && (
                            <>
                                .<br />
                                <br />
                            </>
                        )}
                    </React.Fragment>
                ));
            }
        } catch (error) {
            return desc;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <>
            <div className="flex lg:flex-row flex-col pt-3 lg:pt-10 pb-15">
                <section className="flex-1 border-r-0 lg:border-r-[1px] border-slate-300">
                    <section className="border-b-[1px] border-slate-300 p-7">
                        <h1 className="text-2xl text-black-2 font-medium py-4">
                            {data.title}
                        </h1>
                        <div className="flex lg:flex-row flex-col text-base gap-4 lg:gap-8">
                            <p>
                                Posted {calculateTimeElapsed(data.created_at)}
                            </p>
                            <div className="flex lg:justify-center items-center gap-2">
                                <HiOutlineLocationMarker />
                                <p className="font-medium">{data.location}</p>
                            </div>
                        </div>
                        <p className="flex items-center flex-col lg:flex-row my-2 gap-2 text-black-2">
                            <HiOutlinePuzzle
                                size={25}
                                className="hidden lg:inline-flex"
                            />
                            Editing your profile will help you better highlight
                            your expertise when submitting application to jobs
                            like these.{" "}
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
                                    <span className="text-sm text-gray-500">
                                        Monthly salary
                                    </span>
                                </section>
                            </li>
                            <li className="flex justify-center items-start gap-1 text-black-2 font-medium">
                                <HiOutlineLightBulb size={25} />
                                <section className="flex flex-col">
                                    {getExperienceLevel(data.experience_level)}
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        Looking for{" "}
                                        {getExperienceLevelDescription(
                                            data.experience_level
                                        )}
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
                                <div
                                    key={index}
                                    className="badge badge-outline ml-0 m-4">
                                    {category_item}
                                </div>
                            ))}
                    </section>
                </section>

                <aside className="py-7 pl-0 lg:pl-5 w-full lg:w-[20%]">
                    <div className="flex flex-col ">
                        <button className="btn btn-md btn-primary rounded-full mb-3">
                            Apply Now
                        </button>
                        <button className="btn btn-md btn-outline rounded-full">
                            Save Job
                        </button>
                    </div>

                    <div className="mt-9">
                        <p className="flex items-center">
                            Total applicants: <HiOutlineUsers />
                        </p>
                        <p className="font-semibold">
                            {data.num_applicants} Applicants
                        </p>
                    </div>

                    <div className="mt-14">
                        <h6 className="text-xl text-black-2 font-medium mb-4">
                            Posted by:
                        </h6>
                        <p className="font-medium leading-3">
                            {data.posted_by.username}
                        </p>
                        <p className="mb-7">
                            {calculateTimeElapsed(data.created_at)}
                        </p>

                        <p className="font-medium mb-4">{data.posted_by.num_posted_jobs} jobs posted</p>
                        <p className="mb-7 text-sm">
                            Member since{" "}
                            {formatDate(data.posted_by.date_joined)}
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default JobItemPage;
