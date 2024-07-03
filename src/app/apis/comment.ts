import axiosInstance from "../config/axiosInstance";
import { Comment } from "../types/type";

export const createCommentApi = (comment: Comment) =>
  axiosInstance.post("/comment", comment);

export const updateCommentApi = (id: number, comment: Comment) =>
  axiosInstance.patch(`/comment/${id}`, comment);

export const deleteCommentApi = (id: number) =>
  axiosInstance.delete(`/comment/${id}`);

export const findCommentWithPostIdApi = (postId: number) =>
  axiosInstance.get(`/comment/${postId}`);
