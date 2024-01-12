import React from "react";
import {
    HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineTag,
    HiOutlineLightBulb,
    HiOutlineUsers,
} from "react-icons/hi";

const JobItemPage = () => {
    const content = [
        "Hi, I need to learn how to get a file by myself so I don't have to spend 4 times as long having others get the wrong files. I can't code - but I know what files I need. So far my state of life is. I'm in the mongo and the compass to avoid the django with the pythons trying to get the homebrew from the GitHub to run the terminal thats wants the Xcode to run the terminal to ask for the mongo to get the json file from the server via the restapi. I am Australian and we made a commercial pretty close to how ridiculous this all is. Can someone help me out for an hour or 2 please. I just want a file.",
    ];

    return (
        <>
            <div className="flex pt-10 pb-15">
                <section className="flex-1 border-r-[1px] border-slate-300">
                    <section className="border-b-[1px] border-slate-300 p-7">
                        <h1 className="text-2xl text-black-2 font-medium py-4">
                            Mongo Django Python Homebrew Terminal Xcode with
                            some Celery. I just need a file -wtf
                        </h1>
                        <div className="flex text-base gap-8">
                            <p>Posted 59 minutes ago</p>
                            <div className="flex justify-center items-center gap-2">
                                <HiOutlineLocationMarker />
                                <p className="font-medium">Worldwide</p>
                            </div>
                        </div>
                    </section>
                    <section className="border-b-[1px] border-slate-300 p-7">
                        <p className="text-black-2">
                            {content[0]
                                .split(".")
                                .map((sentence, sentenceIndex, array) => (
                                    <React.Fragment key={sentenceIndex}>
                                        {sentence.trim()}
                                        {sentenceIndex !== array.length - 1 && (
                                            <>
                                                .<br />
                                                <br />
                                            </>
                                        )}
                                    </React.Fragment>
                                ))}
                        </p>
                    </section>
                    <section className="border-b-[1px] border-slate-300 p-7">
                        <ul className="flex justify-between items-start">
                            <li className="flex justify-center items-center gap-1 text-black-2 font-medium">
                                <HiOutlineClock size={25} />
                                Full-Time
                            </li>
                            <li className="flex justify-center items-start gap-1 text-black-2 font-medium">
                                <HiOutlineTag size={20} />
                                <section className="flex flex-col">
                                    $50.00
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        Monthly salary
                                    </span>
                                </section>
                            </li>
                            <li className="flex justify-center items-start gap-1 text-black-2 font-medium">
                                <HiOutlineLightBulb size={25} />
                                <section className="flex flex-col">
                                    Entry Level
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        Looking for early graduates
                                    </span>
                                </section>
                            </li>
                        </ul>
                    </section>

                    <section className="p-7">
                        <h3 className="text-2xl font-medium text-black-2">
                            Skills and Expertise
                        </h3>
                        <div className="badge badge-outline ml-0 m-4">Web development</div>
                        <div className="badge badge-outline ml-0 m-4">Web design</div>
                        <div className="badge badge-outline ml-0 m-4">Software development</div>
                    </section>
                </section>
                <aside className="py-7 pl-5 w-[20%]">
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
                        <p className="font-semibold">24 Applicants</p>
                    </div>

                    <div className="mt-14">
                        <h6 className="text-xl text-black-2 font-medium mb-4">
                            Posted by:
                        </h6>
                        <p className="font-medium leading-3">John Doe</p>
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
