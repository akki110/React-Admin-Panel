import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  
  return (
    <div className="min-h-screen">
      {/* Navbar fixed on top */}
      <div className="fixed top-0 left-0 right-0 h-16 z-40 bg-white shadow">
        <Navbar />
      </div>

      {/* Sidebar + Outlet below navbar */}
      <div className="flex pt-16">
        {" "}
        {/* push content below navbar */}
        <Sidebar />
        <div className="p-6 flex-1 ml-0 md:ml-64 ">
          <Outlet />
          <Footer />
        </div>
      </div>

      {/* Footer inside content (optional) */}
    </div>
  );
};
