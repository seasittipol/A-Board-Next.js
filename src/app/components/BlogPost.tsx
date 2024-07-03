import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import usePost from "../hooks/usePost";
import EditModal from "./EditModal";

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
            <div className="flex flex-col w-full">
              <div>
                {user?.firstName} {user?.lastName}
              </div>
              <div>{category}</div>
              <section>{title}</section>
              <p className="break-words">{body}</p>
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
    </>
  );
}
