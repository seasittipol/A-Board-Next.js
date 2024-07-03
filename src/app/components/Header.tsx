"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import Link from "next/link";

export default function Header() {
  const { authUser }: any = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.replace("/home");
  };
  return (
    <div className="bg-major h-[60px] flex justify-between items-center px-8">
      <Link href="/home">
        <div>a board</div>
      </Link>
      {authUser ? (
        <div className="flex justify-center items-center gap-2">
          {/* <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          /> */}
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
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
      ) : (
        <Button onClick={() => router.push("/auth/register")}>Sign In</Button>
      )}
    </div>
  );
}
