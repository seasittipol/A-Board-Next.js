import axiosInstance from "../config/axiosInstance";
import { Post } from "../types/type";

export const findAllPostsApi = () => axiosInstance.get("/post");

export const findOnePostWithIdApi = (id: number) =>
  axiosInstance.get(`/post/${id}`);

export const findPostsWithUserIdApi = (userId: number) =>
  axiosInstance.get(`/post/user/${userId}`);

export const createPostApi = (content: Post) =>
  axiosInstance.post("/post", content);

export const updatePostWithIdApi = (id: number, content: Post) =>
  axiosInstance.patch(`/post/${id}`, content);

export const deletePostWithIdApi = (id: number) =>
  axiosInstance.delete(`/post/${id}`);
