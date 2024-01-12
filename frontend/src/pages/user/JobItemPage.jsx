import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineTag,
    HiOutlineLightBulb,
    HiOutlineUsers,
} from "react-icons/hi";
import axios from "axios";
import baseURL from "@/apiConfig";
import AuthContext from "../../context/AuthContext";

const JobItemPage = () => {
    const { job_id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchJobItemDetails = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/api/job-details/`,
                    {
                        params: { job_id: job_id },
                    }
                );
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobItemDetails();
    }, []);

    const content = [
        "Hi, I need to learn how to get a file by myself so I don't have to spend 4 times as long having others get the wrong files. I can't code - but I know what files I need. So far my state of life is. I'm in the mongo and the compass to avoid the django with the pythons trying to get the homebrew from the GitHub to run the terminal thats wants the Xcode to run the terminal to ask for the mongo to get the json file from the server via the restapi. I am Australian and we made a commercial pretty close to how ridiculous this all is. Can someone help me out for an hour or 2 please. I just want a file.",
    ];

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
        try {
            return desc.split(".").map((sentence, sentenceIndex, array) => (
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
        } catch (error) {
            return desc;
        }
    };

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
                        {data.category &&  data.category.map((category_item, index) => (
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
                        <p className="font-semibold">{data.num_applicants} Applicants</p>
                    </div>

                    <div className="mt-14">
                        <h6 className="text-xl text-black-2 font-medium mb-4">
                            Posted by:
                        </h6>
                        <p className="font-medium leading-3">{data.posted_by}</p>
                        <p className="mb-7">Lucena city 6:11 AM</p>

                        <p className="font-medium mb-4">2 jobs posted</p>
                        <p className="mb-7 text-sm">Member since Mar 1, 2023</p>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default JobItemPage;
