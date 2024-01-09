import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const LandingLayout = () => {
    return (
        <>
            <div className="sticky top-0 w-full md:px-9 sm:px-0 z-99999 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950">
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
