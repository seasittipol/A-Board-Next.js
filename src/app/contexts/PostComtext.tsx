"use client";
import React, { ChangeEvent, createContext, ReactNode, useState } from "react";
import {
  createPostApi,
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
  const [postWithUserId, setPostWithUserId] = useState([]);
  const [community, setCommunity] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editPostId, setEditPostId] = useState<number>(0);
  const [editCommunity, setEditCommunity] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

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

  const fetchPostWithUserId = async () => {
    try {
      const response = await findPostsWithUserIdApi(authUser.id);
      setPostWithUserId(response.data);
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    }
  };

  const openModalEdit = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (!authUser) {
      window.location.replace("/auth/login");
    } else if (modal) {
      modal.showModal();
    }
  };

  const openModalCreate = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (!authUser) {
      window.location.replace("/auth/login");
    } else if (modal) {
      setCommunity("");
      setTitle("");
      setContent("");
      modal.showModal();
    }
  };

  const closeModalEdit = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const closeModalCreate = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleCreatePost = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      const data: Post = {
        category: community,
        title: title,
        body: content,
        userId: authUser.id,
      };
      await createPostApi(data);
      if (true) {
        console.log("setsetsetset");
        setCommunity("");
        setTitle("");
        setContent("");
      }
      closeModalCreate();
      findAllPosts();
      fetchPostWithUserId();
      toast.success("Create success");
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCommunity(e.target.value);
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
    openModalEdit();
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
      closeModalEdit();
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
    community,
    title,
    content,
    setCommunity,
    setTitle,
    setContent,
    handleCreatePost,
    handleSelectChange,
    openModalCreate,
    closeModalCreate,
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
    closeModalEdit,
  };
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
