"use client";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { Search } from "lucide-react";
import { Post } from "../types/type";
import Link from "next/link";
import usePost from "../hooks/usePost";
import BlogPost from "../components/BlogPost";

export default function home() {
  const { posts, findAllPosts }: any = usePost();

  useEffect(() => {
    findAllPosts();
  }, []);

  console.log(posts);
  return (
    <div className="w-full flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 flex border rounded-md items-center px-2">
          <Search />
          <input className="bg-grey100 outline-none p-2" placeholder="Search" />
        </div>
        <div>Community &#9900;</div>
        <Button>Create +</Button>
      </div>
      <div className="flex flex-col">
        {posts.map((post: Post) => (
          <Link href={`/post/${post.id}`}>
            <BlogPost
              title={post.title}
              body={post.body}
              category={post.category}
              user={post.user}
              comment={post._count}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
