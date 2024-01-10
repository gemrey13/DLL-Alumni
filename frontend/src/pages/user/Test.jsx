import React, { useState } from "react";

const Test = () => {
    const [entryLevel, setEntryLevel] = useState(false);
    const [intermediate, setIntermediate] = useState(false);
    const [expert, setExpert] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <div className="navbar text-white sticky top-0 w-full md:px-9 sm:px-0 z-99999 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="bg-slate-800 text-gray-400 menu menu-md dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            <li>
                                <a>Find Work</a>
                            </li>
                            <li className="py-2">
                                <a className="menu-title text-whiten">
                                    News and Update
                                </a>
                                <ul className="">
                                    <li>
                                        <a>News</a>
                                    </li>
                                    <li>
                                        <a>System Updates</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Events</a>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl hidden md:inline-flex">
                        DLL Alumni Asssociation
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex text-gray-400">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>Find Work</a>
                        </li>
                        <li>
                            <details>
                                <summary>News and Update</summary>
                                <ul className="p-2 bg-slate-800">
                                    <li>
                                        <a>News</a>
                                    </li>
                                    <li>
                                        <a>System Updates</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a>Events</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end text-gray-400 ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="bg-slate-800 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* END NAVBAR */}

            <main className="px-22 bg-whiter">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered input-accent w-full max-w-2xl rounded-full mt-13 mb-7"
                />

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                    className="btn lg:hidden inline-flex"
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }>
                    Advanced Search
                </button>
                <dialog
                    id="my_modal_1"
                    className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                            Press ESC key or click the button below to close
                        </p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <h1 className="border-b-[1px] text-title-xl text-black-2 pb-2 font-medium">
                    Jobs
                </h1>

                <div className="flex h-screen">
                    <aside className="w-72.5">
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
                    </aside>
                    <section className="flex flex-col flex-1 mt-15 w-full pl-7">
                        <select className="self-end select select-sm border-gray-400 w-full mb-8 max-w-xs">
                            <option disabled selected>
                                Sort by: 
                            </option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Relevance</option>
                        </select>

                        <div className="w-full border-t-[1px]">
                            <div className="card-body">
                                <p className="text-xs">Posted 11 seconds ago</p>
                                <h2 className="card-title text-2xl text-black-2">
                                    Shoes!
                                    <div className="badge badge-secondary">
                                        NEW
                                    </div>
                                </h2>
                                <p>Expected salary: 30,000php - Expert - Full time</p>
                                <p className="text-black-2">
                                    We need someone to transfer our website
                                    design from Figma to our existing Webflow
                                    account, publish the site, and ensure it
                                    includes a landing page, a 'Book a Demo'
                                    page, and links to the Terms of Service and
                                    Privacy Policies.
                                </p>
                                <div className="card-actions mt-3 justify-start">
                                    <div className="badge badge-outline">
                                        Information technology
                                    </div>
                                    <div className="badge badge-outline">
                                        Accounting
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full border-t-[1px]">
                            <div className="card-body">
                                <p className="text-xs">Posted 11 seconds ago</p>
                                <h2 className="card-title text-2xl text-black-2">
                                    Shoes!
                                    <div className="badge badge-secondary">
                                        NEW
                                    </div>
                                </h2>
                                <p>Expected salary: 30,000php - Expert - Full time</p>
                                <p className="text-black-2">
                                    We need someone to transfer our website
                                    design from Figma to our existing Webflow
                                    account, publish the site, and ensure it
                                    includes a landing page, a 'Book a Demo'
                                    page, and links to the Terms of Service and
                                    Privacy Policies.
                                </p>
                                <div className="card-actions mt-3 justify-start">
                                    <div className="badge badge-outline">
                                        Information technology
                                    </div>
                                    <div className="badge badge-outline">
                                        Accounting
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full border-t-[1px]">
                            <div className="card-body">
                                <p className="text-xs">Posted 11 seconds ago</p>
                                <h2 className="card-title text-2xl text-black-2">
                                    Shoes!
                                    <div className="badge badge-secondary">
                                        NEW
                                    </div>
                                </h2>
                                <p>Expected salary: 30,000php - Expert - Full time</p>
                                <p className="text-black-2">
                                    We need someone to transfer our website
                                    design from Figma to our existing Webflow
                                    account, publish the site, and ensure it
                                    includes a landing page, a 'Book a Demo'
                                    page, and links to the Terms of Service and
                                    Privacy Policies.
                                </p>
                                <div className="card-actions mt-3 justify-start">
                                    <div className="badge badge-outline">
                                        Information technology
                                    </div>
                                    <div className="badge badge-outline">
                                        Accounting
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Test;
