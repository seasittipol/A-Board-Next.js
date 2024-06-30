"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { login } from "@/app/apis/auth";
import { toast } from "react-toastify";
import useAuth from "@/app/hooks/useAuth";

export default function Login() {
  const { authUser }: any = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      window.location.replace("/home");
    }
  }, authUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = { username, password };
      const response = await login(data);
      const token = response.data.accessToken;
      localStorage.setItem("ACCESS_TOKEN", token);
      setUsername("");
      setPassword("");
      window.location.replace("/home");
    } catch (err: any) {
      toast.error(err?.response.data.message);
      console.log(err?.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center  items-center bg-major">
      <form onSubmit={handleSubmit} className="w-3/5 p-36 justify-center flex">
        <div className="flex flex-col gap-2 text-black w-96">
          <div className="text-white">Login</div>
          <input
            className="rounded p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-success text-white rounded p-2">Submit</button>
          <Link
            className="text-white underline w-full text-right"
            href="/auth/register"
          >
            Sign In
          </Link>
        </div>
      </form>
      <div className="h-full w-2/5 bg-minor flex flex-col justify-center items-center rounded-l-3xl">
        <img
          className="w-96"
          src="https://plus.unsplash.com/premium_photo-1661963429761-5f27bcb6cdaa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        a Board
      </div>
    </div>
  );
}
