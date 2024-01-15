import React from "react";
import { Link } from "react-router-dom";
import {
    formatSalary,
    getExperienceLevel,
    calculateTimeElapsed,
    isNewJob,
} from "../../utils/formatting";

const JobItem = ({ data }) => {
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
                                <p className="text-black-2 line-clamp-2">
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
