import React, {useContext} from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import AuthContext from "../../context/AuthContext";


const Profile = () => {
    let { user } = useContext(AuthContext);

    return (
        <>
            <section className="flex w-full border-slate-800 lg:border border-b rounded-t-2xl p-7 mt-10 gap-3 items-center">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-18">
                        <span className="text-3xl">{user.first_name[0]}</span>
                    </div>
                </div>

                <section className="flex flex-1 lg:flex-row flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-black-2">
                            {user.first_name} {user.last_name}
                        </h1>
                        <p className="flex gap-2 text-sm lg:text-base font-semibold items-center">
                            <HiOutlineLocationMarker />
                            {user.profile_info.location} - {user.email}
                        </p>
                    </div>

                    <div className="lg:flex hidden gap-5 w-[30%] justify-between pr-7">
                        <button className="btn btn-primary rounded-2xl w-1/2">
                            Edit Profile
                        </button>
                        <button className="btn btn-outline rounded-2xl w-1/2">
                            Deactivate Profile
                        </button>
                    </div>
                </section>
            </section>

            <section className="flex lg:flex-row flex-col-reverse">

                <aside className="w-full lg:w-[30%] border-l border-slate-800 border-r p-8">
                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl mb-4 font-medium">Education</h3>

                        <p className="text-black text-lg font-medium">{user.user_education.school_name}</p>
                        <p className="font-medium">
                            {user.user_education.course} {user.user_education.school_year}
                        </p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl font-medium">Gender</h3>
                        <p className="text-black text-lg font-medium">{user.profile_info.sex}</p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl font-medium">Languages</h3>
                        <ul>
                            {user.profile_info.languages.map((lang, index) => (
                                <li key={index} className="text-black text-lg font-medium">{lang}: <span>Conversational</span></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black-2 text-2xl font-medium">Account Links</h3>

                        <ul>
                            {user.account_links.map((link, index) => (
                                <li key={index} className="text-black text-lg font-medium">{link.link}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <section className="flex-1 w-full lg:w-3/4 border-slate-800 border-x lg:border-r lg:border-l-0">
                    <header className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-6">
                            {user.user_job.specialty}
                        </h1>
                        <p className="">
                            {user.user_job.description}
                        </p>
                    </header>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            Work experience
                        </h1>
                        {user.user_work_experience.map((experience, index) => (
                            <p key={index}>{experience.content}</p>
                        ))}
                    </section>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            BIO
                        </h1>
                        <p>{user.profile_info.bio}</p>
                    </section>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            Skills
                        </h1>
                        {user.profile_info.skills.skills.map((skill, index) => (
                            <p key={index} className="badge badge-outline ml-0 m-4">
                                {skill}
                            </p>
                        ))}
                    </section>
                </section>
            </section>
        </>
    );
};

export default Profile;
