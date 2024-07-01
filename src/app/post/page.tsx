"use client";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function PostPage() {
  const { authUser }: any = useAuth();
  if (!authUser) {
    window.location.replace("/home");
  }
  return <div>PostPage</div>;
}
