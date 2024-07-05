"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Post } from "../types/type";
import usePost from "../hooks/usePost";
import BlogPost from "../components/BlogPost";
import SearchBar from "../components/SearchBar";
import { sortIdDesc } from "../utility/sortId";
import useSearch from "../hooks/useSearch";
import useAuth from "../hooks/useAuth";

export default function home() {
  const { setUrlPath }: any = useAuth();
  const { posts, findAllPosts }: any = usePost();
  const { selectCommunity }: any = useSearch();

  useEffect(() => {
    findAllPosts();
    setUrlPath(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <div className="w-full sm:w-3/4 min-h-screen flex flex-col gap-6 sm:py-8 sm:pr-8 px-4">
      <SearchBar />
      <div className="flex flex-col rounded-xl overflow-auto w-full">
        {!selectCommunity
          ? posts
              .sort(sortIdDesc)
              .map((post: Post, index: number) => (
                <BlogPost
                  key={index}
                  postId={post.id}
                  title={post.title}
                  body={post.body}
                  category={post.category}
                  user={post.user}
                  comment={post._count}
                />
              ))
          : posts
              .filter((post: Post) => post.category === selectCommunity)
              .sort(sortIdDesc)
              .map((post: Post, index: number) => (
                <BlogPost
                  key={index}
                  postId={post.id}
                  title={post.title}
                  body={post.body}
                  category={post.category}
                  user={post.user}
                  comment={post._count}
                />
              ))}
      </div>
    </div>
  );
}
