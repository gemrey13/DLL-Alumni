import React from "react";
import { Link } from "react-router-dom";

const JobItem = ({ data }) => {
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

    return (
        <>
            {data &&
                data.map((job_item, index) => (
                    <Link
                        key={index}
                        to={`/u/job-item/${job_item.id}`}
                        className="hover:bg-slate-300">
                        <div className="w-full border-t-[1px]">
                            <div className="card-body">
                                <p className="text-xs">
                                    Posted{" "}
                                    {calculateTimeElapsed(job_item.created_at)}
                                </p>
                                <h2 className="card-title text-2xl text-black-2">
                                    {job_item.title}
                                    {isNewJob(job_item.created_at) && (
                                        <div className="badge badge-secondary">
                                            NEW
                                        </div>
                                    )}
                                </h2>
                                <p>
                                    Expected salary:{" "}
                                    {formatSalary(job_item.starting_salary)} -{" "}
                                    {getExperienceLevel(
                                        job_item.experience_level
                                    )}{" "}
                                    - {job_item.Job_type}
                                </p>
                                <p className="text-black-2">
                                    {job_item.description}
                                </p>
                                <p className="text-md">
                                    {job_item.num_applicants} applicants
                                </p>
                                <div className="card-actions mt-3 justify-start">
                                    {job_item.category.map(
                                        (category_item, index) => (
                                            <div
                                                key={index}
                                                className="badge badge-outline">
                                                {category_item}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default JobItem;
