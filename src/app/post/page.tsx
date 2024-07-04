"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import { Post } from "../types/type";
import BlogPost from "../components/BlogPost";
import { sortIdDesc } from "../utility/sortId";
import useSearch from "../hooks/useSearch";

export default function PostPage() {
  const { authUser }: any = useAuth();
  const { fetchPostWithUserId, postWithUserId }: any = usePost();
  const { selectCommunity, setSelectCommunity }: any = useSearch();

  useEffect(() => {
    fetchPostWithUserId();
  }, authUser);

  return (
    <div className="w-3/4 min-h-screen flex flex-col gap-6 py-8 pr-8">
      <SearchBar />
      <div className="flex flex-col rounded-xl overflow-auto">
        {!selectCommunity
          ? postWithUserId
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
          : postWithUserId
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
