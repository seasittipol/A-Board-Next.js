"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { authUser }: any = useAuth();
  const router = useRouter();
  console.log(authUser);
  return (
    <div className="bg-major h-[60px] flex justify-between items-center px-8">
      <div>a board</div>
      {authUser ? (
        <div className="flex justify-center items-center">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      ) : (
        <Button onClick={() => router.push("/auth/register")}>Sign In</Button>
      )}
    </div>
  );
}
