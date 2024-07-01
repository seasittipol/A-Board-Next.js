"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import { Search } from "lucide-react";
import { Post } from "../types/type";
import Link from "next/link";
import usePost from "../hooks/usePost";
import BlogPost from "../components/BlogPost";
import useAuth from "../hooks/useAuth";
import { createPostApi } from "../apis/post";
import { toast } from "react-toastify";

export default function home() {
  const { authUser }: any = useAuth();
  const { posts, findAllPosts }: any = usePost();
  const [community, setCommunity] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    findAllPosts();
  }, []);

  const openModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleSubmitForm = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const data: Post = {
        category: community,
        title: title,
        body: content,
        userId: authUser.id,
      };
      await createPostApi(data);
      closeModal(e);
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCommunity(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 flex border rounded-md items-center px-2">
          <Search />
          <input
            className="bg-grey100 outline-none p-2 w-full"
            placeholder="Search"
          />
        </div>
        <select className="select select-bordered w-full max-w-36">
          <option disabled selected>
            Community
          </option>
          <option>History</option>
          <option>Exercise</option>
          <option>Travel</option>
          <option>Environment</option>
          <option>Study</option>
          <option>Game</option>
        </select>
        <Button onClick={openModal}>Create +</Button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box min-h-96">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">Create Post</h3>
              <select
                className="select select-bordered w-full max-w-52"
                onChange={handleSelectChange}
              >
                <option disabled selected>
                  Choose a community
                </option>
                <option>History</option>
                <option>Exercise</option>
                <option>Travel</option>
                <option>Environment</option>
                <option>Study</option>
                <option>Game</option>
              </select>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="What's on your mind..."
                className="input input-bordered w-full min-h-40"
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  className="bg-white text-success border border-success h-[40px] w-[105px] rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitForm}>Post</Button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="flex flex-col">
        {posts.map((post: Post) => (
          <Link href={authUser ? `/post/${post.id}` : `/auth/login`}>
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
