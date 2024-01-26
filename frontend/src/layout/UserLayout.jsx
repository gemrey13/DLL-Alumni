import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const UserLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="px-3 md:px-22 pb-8 bg-whiten h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
