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
    <div className="flex flex-col w-screen">
      <Header />
      <div className="flex bg-grey100 text-black h-full w-screen">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
