"use client";
import { createCommentApi } from "@/app/apis/comment";
import { deletePostWithIdApi, findOnePostWithIdApi } from "@/app/apis/post";
import BlogComment from "@/app/components/BlogComment";
import Button from "@/app/components/Button";
import useAuth from "@/app/hooks/useAuth";
import usePost from "@/app/hooks/usePost";
import { Comment, Post } from "@/app/types/type";
import { AxiosResponse } from "axios";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { slug: string } }) {
  const { authUser }: any = useAuth();
  const { fetchPostWithUserId, findAllPosts }: any = usePost();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const fetchPost = async () => {
    const onePost: AxiosResponse<any, any> = await findOnePostWithIdApi(
      +params.slug
    );
    setPost(onePost.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleClickComment = async () => {
    try {
      const data: Comment = {
        description: comment,
        userId: authUser.id,
        postId: +params.slug,
      };
      await createCommentApi(data);
      fetchPost();
      setOpen(!open);
      setComment("");
      toast.success("create comment success");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleEditPost = (e: any) => {
    e.stopPropagation();
  };

  const handleDeletePost = async (e: any) => {
    try {
      e.stopPropagation();
      console.log("Delete button clicked, propagation stopped.");
      await deletePostWithIdApi(+params.slug);
      findAllPosts();
      fetchPostWithUserId();
      router.push("/home");
      toast.success("Delete post success");
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  return (
    <div className="w-3/4 min-h-screen relative flex-col bg-white text-black gap-2 p-8">
      {authUser && authUser.id === post?.user?.id && (
        <div className="absolute right-0 z-10">
          <button className="px-2" onClick={handleEditPost}>
            <Pencil />
          </button>
          <button className="px-2 mr-2 z-10" onClick={handleDeletePost}>
            <Trash2 />
          </button>
        </div>
      )}
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
        <div className="break-words">{post?.body}</div>
        <div className="flex">
          <MessageCircle /> {post?._count?.Comment} Comments
        </div>
        {!open ? (
          <div className="py-4">
            <button
              className="h-[40px] w-[132px] border-2 rounded-lg border-success text-success"
              onClick={() => setOpen(!open)}
            >
              Add Comments
            </button>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-2">
            <textarea
              rows={4}
              className="border-2 rounded-lg w-full min-h-24 outline-none p-4"
              placeholder="What's on your mind..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                className="bg-white text-success border border-success h-[40px] w-[105px] rounded-md"
                onClick={() => setOpen(!open)}
              >
                Cancel
              </Button>
              <Button onClick={handleClickComment}>Comment</Button>
            </div>
          </div>
        )}
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
