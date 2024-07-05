"use client";
import { ArrowRightFromLine, HomeIcon, SquarePen } from "lucide-react";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const {
    openNav,
    handleToggleNav,
    urlPath,
    handleClickHomePage,
    handleClickOurBlogPage,
  }: any = useAuth();
  return (
    <div
      className={
        openNav
          ? "absolute sm:static z-10 sm:z-0 top-0 bottom-0 w-full -right-full translate-x-[-100%] sm:translate-x-0 bg-black bg-opacity-50 sm:bg-opacity-0 sm:w-1/4 flex flex-col sm:p-8 items-end sm:justify-start"
          : "hidden absolute sm:static z-10 sm:z-0 top-0 bottom-0 w-full -right-full bg-black bg-opacity-50 sm:bg-opacity-0 sm:w-1/4 sm:flex flex-col sm:p-8 items-end sm:justify-start"
      }
    >
      <div className="bg-major sm:bg-opacity-0 h-full w-[280px] sm:w-full p-6 sm:p-0 text-white sm:text-black">
        <button className="sm:hidden py-4" onClick={handleToggleNav}>
          <ArrowRightFromLine />
        </button>
        <div className="flex h-10 items-center gap-2">
          <HomeIcon />
          <button
            className={urlPath === "home" ? "font-bold" : ""}
            onClick={handleClickHomePage}
          >
            Home
          </button>
        </div>
        <div className="flex h-10 items-center gap-2">
          <SquarePen />
          <button
            className={urlPath === "post" ? "font-bold" : ""}
            onClick={handleClickOurBlogPage}
          >
            Our Blog
          </button>
        </div>
      </div>
    </div>
  );
}
