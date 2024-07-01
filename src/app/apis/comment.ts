import axiosInstance from "../config/axiosInstance";
import { Comment } from "../types/type";

export const createCommentApi = (comment: Comment) =>
  axiosInstance.post("/comments", comment);

export const updateCommentApi = (id: number, comment: Comment) =>
  axiosInstance.patch(`/comments/${id}`, comment);

export const deleteCommentApi = (id: number) =>
  axiosInstance.delete(`/comments/${id}`);

export const findCommentWithPostIdApi = (postId: number) =>
  axiosInstance.get(`/comment/${postId}`);
