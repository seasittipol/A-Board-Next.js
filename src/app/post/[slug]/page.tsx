"use client";
import { findOnePostWithIdApi } from "@/app/apis/post";
import BlogComment from "@/app/components/BlogComment";
import { Comment, Post } from "@/app/types/type";
import { AxiosResponse } from "axios";
import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const fetchPost = async () => {
    const onePost: AxiosResponse<any, any> = await findOnePostWithIdApi(
      +params.slug
    );
    setPost(onePost.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  console.log("****", post?.Comment);

  return (
    <div className="flex flex-col bg-white text-black min-h-screen gap-2 p-8">
      <div className="flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              post?.user?.image ||
              "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          {post?.user?.firstName} {post?.user?.lastName}
        </div>
        <div className="flex">
          <div className="bg-grey100 px-2 py-1 rounded-md">
            {post?.category}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>{post?.title}</div>
        <div>{post?.body}</div>
        <div className="flex">
          <MessageCircle /> {post?._count?.Comment} Comments
        </div>
        <div className="py-4">
          <button className="h-[40px] w-[132px] border-2 rounded-lg border-success text-success">
            Add Comments
          </button>
        </div>
      </div>
      <div className="pl-8 flex flex-col gap-4">
        {post?.Comment?.map((comment: Comment, index: number) => (
          <BlogComment
            key={index}
            description={comment.description}
            user={comment.user}
          />
        ))}
      </div>
    </div>
  );
}
