
import React from "react";
import ImportExportIcon from "../assets/import-export.svg?react";

const Banner = () => {
  return (
    <section className="w-full bg-linear-to-r from-[#023E8A] to-[#48CAE4] py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Empower Your Import & Export Business
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold opacity-90">
            Manage, Monitor & Grow Seamlessly
          </h2>

          <p className="opacity-80 max-w-md">
            A powerful platform designed to simplify global trade operations.
            Track shipments, manage documents, and analyze performance in one
            unified dashboard.
          </p>

          <button className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg bg-linear-to-r from-[#023E8A] to-[#48CAE4] hover:opacity-90 transition">
            Learn More
          </button>
        </div>

        {/* Right Section */}
        <div className="">
          <ImportExportIcon className="h- w-full object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
