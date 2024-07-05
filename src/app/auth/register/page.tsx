"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import InputAuth from "@/app/components/InputAuth";
import useAuth from "@/app/hooks/useAuth";

export default function Register() {
  const { handleSubmitRegister, errorHandler }: any = useAuth();
  const { authUser }: any = useAuth();

  useEffect(() => {
    if (authUser) {
      window.location.replace("/home");
    }
  }, authUser);

  return (
    <div className="w-full min-h-screen sm:h-screen flex flex-col-reverse gap-10 sm:flex-row justify-end sm:justify-center sm:items-center bg-major">
      <form
        onSubmit={handleSubmitRegister}
        className="sm:w-3/5 sm:p-36 justify-center flex"
      >
        <div className="flex flex-col text-black w-96">
          <div className="text-white">Register</div>
          <InputAuth
            name="username"
            type="text"
            placeholder="Username"
            value="username"
          />
          <label className="font-light text-red-500">
            {errorHandler.username}
          </label>
          <InputAuth
            name="firstName"
            type="text"
            placeholder="First name"
            value="firstName"
          />
          <label className="font-light text-red-500">
            {errorHandler.firstName}
          </label>
          <InputAuth
            name="lastName"
            type="text"
            placeholder="Last name"
            value="lastName"
          />
          <label className="font-light text-red-500">
            {errorHandler.lastName}
          </label>
          <InputAuth
            name="password"
            type="password"
            placeholder="Password"
            value="password"
          />
          <label className="font-light text-red-500">
            {errorHandler.password}
          </label>
          <InputAuth
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value="confirmPassword"
          />
          <label className="font-light text-red-500">
            {errorHandler.confirmPassword}
          </label>
          <InputAuth
            name="email"
            type="text"
            placeholder="Email"
            value="email"
          />
          <label className="font-light text-red-500">
            {errorHandler.email}
          </label>
          <button className="bg-success text-white rounded p-2 mt-2">
            Submit
          </button>
          <Link
            className="text-white underline w-full text-right"
            href="/auth/login"
          >
            Login
          </Link>
        </div>
      </form>
      <div className="h-96 sm:h-full sm:w-2/5 bg-minor flex flex-col justify-center items-center rounded-b-3xl sm:rounded-r-none sm:rounded-l-3xl">
        <img
          className="w-64  sm:w-96"
          src="https://plus.unsplash.com/premium_photo-1661963429761-5f27bcb6cdaa?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        a Board
      </div>
    </div>
  );
}
