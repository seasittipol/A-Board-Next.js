"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import Link from "next/link";

export default function Header() {
  const { authUser, handleToggleNav, handleLogout }: any = useAuth();
  const router = useRouter();

  return (
    <div className="bg-major h-[60px] flex justify-between items-center px-8">
      <Link href="/home">
        <div>a board</div>
      </Link>
      {authUser ? (
        <>
          <button
            className="absolute right-8 z-10 sm:hidden"
            type="button"
            onClick={handleToggleNav}
          >
            ☰
          </button>
          <div className="hidden sm:flex justify-center items-center gap-2">
            <div>
              {authUser.firstName} {authUser.lastName}
            </div>
            <div className="dropdown dropdown-end text-black">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={
                      authUser?.image ||
                      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {/* <li>
                <a>Profile</a>
                </li>
                <li>
                <a>Settings</a>
                </li> */}
                <li>
                  <div onClick={handleLogout}>Logout</div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Button onClick={() => router.push("/auth/register")}>Sign In</Button>
      )}
    </div>
  );
}
