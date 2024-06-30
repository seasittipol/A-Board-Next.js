"use client";
import React, { createContext, ReactNode, useState } from "react";
import { findAllPostsApi } from "../apis/post";
import { toast } from "react-toastify";

interface PostContextProviderProps {
  children: ReactNode;
}

interface PostContextType {}
const defaultValue: PostContextType = {};

export const PostContext = createContext<PostContextType>(defaultValue);

export default function PostContextProvider({
  children,
}: PostContextProviderProps) {
  const [posts, setPosts] = useState([]);
  const findAllPosts = async () => {
    try {
      const response = await findAllPostsApi();
      if (response) {
        setPosts(response.data);
      }
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  const contextValue = {
    posts,
    findAllPosts,
  };
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
