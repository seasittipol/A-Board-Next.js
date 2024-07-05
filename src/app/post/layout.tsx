import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";
import Sidebar from "../components/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex bg-grey100 text-black h-full w-full pt-6 sm:pt-0">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
