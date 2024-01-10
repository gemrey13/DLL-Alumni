import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/header";

const UserLayout = () => {
    return (
        <>
            <Header />
            <main className="px-3 md:px-22 bg-whiter">
                <Outlet />
            </main>
        </>
    );
};

export default UserLayout;

