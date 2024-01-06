import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const LandingLayout = () => {
    return (
        <>
            <div className="w-full pt-3 md:pt-6 h-[5em] lg:h-[6em] md:px-16 sm:px-0 z-[-2] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
                <Navbar />
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default LandingLayout;
