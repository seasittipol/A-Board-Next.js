"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import { Search } from "lucide-react";
import { Post } from "../types/type";
import Link from "next/link";
import usePost from "../hooks/usePost";
import BlogPost from "../components/BlogPost";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";

export default function home() {
  const { authUser }: any = useAuth();
  const { posts, findAllPosts }: any = usePost();

  useEffect(() => {
    findAllPosts();
  }, []);

  return (
    <div className="w-3/4 min-h-screen flex flex-col gap-6 py-8 pr-8">
      <SearchBar />
      <div className="flex flex-col rounded-xl overflow-auto w-full">
        {posts.map((post: Post, index: number) => (
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
