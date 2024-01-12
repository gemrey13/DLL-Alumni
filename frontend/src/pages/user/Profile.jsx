import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Profile = () => {
    return (
        <>
            <section className="flex w-full border-slate-800 border rounded-t-2xl p-7 mt-10 gap-3 items-center">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-18">
                        <span className="text-3xl">G</span>
                    </div>
                </div>

                <section className="flex flex-1 justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-black-2">
                            Gem Rey Rañola
                        </h1>
                        <p className="flex gap-2 text-base font-semibold items-center">
                            <HiOutlineLocationMarker />
                            Lucena City - 12:34 am
                        </p>
                    </div>

                    <div className="flex gap-5 w-[30%] justify-between pr-7">
                        <button className="btn btn-primary rounded-2xl w-1/2">
                            Edit Profile
                        </button>
                        <button className="btn btn-outline rounded-2xl w-1/2">
                            Deactivate Profile
                        </button>
                    </div>
                </section>
            </section>

            <section className="flex">
                <aside className="w-[30%] border-l border-slate-800 border-r p-8">
                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl mb-4 font-medium">Education</h3>

                        <p className="text-black text-lg font-medium">Dalubhasaang Lungsod ng Lucena</p>
                        <p className="font-medium">
                            Bachelor of Science in Information Technology, Web
                            development 2021-2024
                        </p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl font-medium">Gender</h3>
                        <p className="text-black text-lg font-medium">Male</p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-black-2 text-2xl font-medium">Languages</h3>
                        <ul>
                            <li className="text-black text-lg font-medium">English: <span>Conversational</span></li>
                            <li className="text-black text-lg font-medium">Tagalog: <span>Native or Bilingual</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black-2 text-2xl font-medium">Account Links</h3>

                        <ul>
                            <li className="text-black text-lg font-medium">facebook.com</li>
                            <li className="text-black text-lg font-medium">instagram.com</li>
                        </ul>
                    </div>
                </aside>
                <section className="flex-1 w-3/4 border-slate-800 border-r">
                    <header className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-6">
                            Web Developer | Django | Python | ReactJs
                        </h1>
                        <p className="">
                            My work focuses more on Web development. Im still in
                            college so i have a little amount of experience but
                            i done enough project to get a work here.
                        </p>
                    </header>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            Work history
                        </h1>
                        <p>No items</p>
                    </section>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            BIO
                        </h1>
                        <p>No items</p>
                    </section>
                    <section className="border-b border-slate-800 p-8">
                        <h1 className="text-black-2 font-medium text-2xl pb-4">
                            Skills
                        </h1>
                        <p className="badge badge-outline ml-0 m-4">
                            Responsive Design
                        </p>
                        <p className="badge badge-outline ml-0 m-4">React</p>
                        <p className="badge badge-outline ml-0 m-4">Django</p>
                        <p className="badge badge-outline ml-0 m-4">
                            Web Application
                        </p>
                        <p className="badge badge-outline ml-0 m-4">
                            Web Development
                        </p>
                        <p className="badge badge-outline ml-0 m-4">
                            JavaScript
                        </p>
                        <p className="badge badge-outline ml-0 m-4">PHP</p>
                        <p className="badge badge-outline ml-0 m-4">Linux</p>
                        <p className="badge badge-outline ml-0 m-4">
                            Tailwind CSS
                        </p>
                    </section>
                </section>
            </section>
        </>
    );
};

export default Profile;
