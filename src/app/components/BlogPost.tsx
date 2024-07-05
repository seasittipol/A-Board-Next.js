import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import usePost from "../hooks/usePost";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import useSearch from "../hooks/useSearch";
import Highlight from "./Highlight";

export default function BlogPost(props: any) {
  const { postId, title, body, category, user, comment } = props;
  const { authUser }: any = useAuth();
  const {
    editPostId,
    editCommunity,
    editTitle,
    editContent,
    handleEditPost,
    handleSaveForm,
    handleDeletePost,
  }: any = usePost();
  const { inputSearch }: any = useSearch();
  const router = useRouter();
  return (
    <>
      <div className="relative flex-col">
        <div
          className="flex flex-col border border-grey100 bg-white p-5 w-full"
          onClick={() =>
            authUser
              ? router.push(`/post/${postId}`)
              : router.push(`/auth/login`)
          }
        >
          <div className="relative flex-col">
            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-2 items-center">
                <div className="w-12 rounded-full">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={
                      user?.image ||
                      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                </div>
                <div>
                  {user?.firstName} {user?.lastName}
                </div>
              </div>
              <div className="flex">
                <div className="bg-grey100 px-2 py-1 rounded-md">
                  {category}
                </div>
              </div>
              <div className="flex flex-col">
                {/* <section className="font-bold text-xl">{title}</section> */}
                <div className="font-bold text-xl">
                  <Highlight text={title} highlight={inputSearch} />
                </div>
                {/* <p className="break-words font-light">{body}</p> */}
                <div className="font-light">
                  <Highlight text={body} highlight={inputSearch} />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircle />
                <div>{comment.Comment} comments</div>
              </div>
            </div>
          </div>
        </div>
        {authUser && authUser.id === user.id && (
          <div className="absolute right-0 top-4">
            <button className="px-2" onClick={() => handleEditPost(postId)}>
              <Pencil />
            </button>
            <button
              className="px-2 mr-2"
              onClick={() => handleDeletePost(postId)}
            >
              <Trash2 />
            </button>
          </div>
        )}
      </div>
      <EditModal
        handleSaveForm={() => handleSaveForm(editPostId)}
        community={editCommunity}
        title={editTitle}
        content={editContent}
      />
      <DeleteModal />
    </>
  );
}
