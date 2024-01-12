import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/shared/Footer";

const UserLayout = () => {
    return (
        <>
            <Header />
            <main className="px-3 md:px-22 pb-8 bg-white h-full">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default UserLayout;

