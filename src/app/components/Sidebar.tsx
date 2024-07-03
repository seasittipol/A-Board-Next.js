"use client";
import { HomeIcon, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="w-1/4 flex flex-col p-8">
      <div className="flex h-10 items-center gap-2">
        <HomeIcon />
        <button onClick={() => router.push("/home")}>Home</button>
      </div>
      <div className="flex h-10 items-center gap-2">
        <SquarePen />
        <button onClick={() => router.push("/post")}>Our Blog</button>
      </div>
    </div>
  );
}
