"use client";
import React, { createContext, ReactNode, useState } from "react";
import {
  deletePostWithIdApi,
  findAllPostsApi,
  findPostsWithUserIdApi,
  updatePostWithIdApi,
} from "../apis/post";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Post } from "../types/type";

interface PostContextProviderProps {
  children: ReactNode;
}

interface PostContextType {}
const defaultValue: PostContextType = {};

export const PostContext = createContext<PostContextType>(defaultValue);

export default function PostContextProvider({
  children,
}: PostContextProviderProps) {
  const { authUser }: any = useAuth();
  const [posts, setPosts] = useState([]);
  const findAllPosts = async () => {
    try {
      const response = await findAllPostsApi();
      if (response) {
        setPosts(response.data);
      }
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };

  const [postWithUserId, setPostWithUserId] = useState([]);

  const fetchPostWithUserId = async () => {
    try {
      const response = await findPostsWithUserIdApi(authUser.id);
      setPostWithUserId(response.data);
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };

  const [editPostId, setEditPostId] = useState<number>(0);
  const [editCommunity, setEditCommunity] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const openModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (!authUser) {
      window.location.replace("/auth/login");
    } else if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    // e.preventDefault();
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleEditPost = (postId: number) => {
    console.log("edit", postId);
    const editPost: any = (posts.length > 0 ? posts : postWithUserId).find(
      (post: Post) => post.id === postId
    );
    setEditPostId(editPost.id);
    setEditCommunity(editPost.category);
    setEditTitle(editPost.title);
    setEditContent(editPost.body);
    openModal();
  };

  const handleSaveForm = async (postId: number) => {
    console.log("save", postId);
    try {
      const data: Post = {
        category: editCommunity,
        title: editTitle,
        body: editContent,
        userId: authUser.id,
      };
      await updatePostWithIdApi(postId, data);
      closeModal();
      findAllPosts();
      fetchPostWithUserId();
      toast.success("Save post");
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePostWithIdApi(postId);
      findAllPosts();
      fetchPostWithUserId();
      toast.success("Delete post success");
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  const contextValue = {
    posts,
    findAllPosts,
    fetchPostWithUserId,
    postWithUserId,
    editPostId,
    editCommunity,
    editTitle,
    editContent,
    setEditCommunity,
    setEditTitle,
    setEditContent,
    handleEditPost,
    handleSaveForm,
    handleDeletePost,
    closeModal,
  };
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
